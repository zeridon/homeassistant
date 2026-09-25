# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""Data coordinator for the Electrohold Bulgaria integration."""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass
from datetime import datetime
from typing import TYPE_CHECKING

from bs4 import BeautifulSoup
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
    UpdateFailed,
)

from .const import (
    CONF_SOURCE_URL,
    CONF_VAT_RATE,
    DOMAIN,
    SOURCE_URL,
    UPDATE_INTERVAL,
    VAT_RATE,
)

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

PRICE_PATTERN = re.compile(
    r"(\d+(?:[.,]\d+)?)\s*(?:€|EUR)\s*/\s*(?:kWh|кВтч)",
    re.IGNORECASE,
)


@dataclass(frozen=True)
class ElectroholdData:
    """Electrohold electricity prices."""

    day_price: float
    night_price: float
    last_update: datetime


class ElectroholdCoordinator(DataUpdateCoordinator[ElectroholdData]):
    """Coordinator for Electrohold electricity prices."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the coordinator."""
        self.session = async_get_clientsession(hass)
        self.source_url = entry.data.get(CONF_SOURCE_URL, SOURCE_URL)
        self.vat_rate = entry.data.get(CONF_VAT_RATE, VAT_RATE)

        super().__init__(
            hass,
            logger=_LOGGER,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
            always_update=False,
        )

    @callback
    def async_recalculate_tariff(self) -> None:
        """Recalculate time-dependent tariff entities."""
        self.async_update_listeners()

    async def _async_update_data(self) -> ElectroholdData:
        """Fetch and parse Electrohold prices."""
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/131.0 Safari/537.36"
            ),
            "Accept": (
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            ),
            "Accept-Language": "bg-BG,bg;q=0.9,en;q=0.8",
        }

        try:
            async with self.session.get(
                self.source_url,
                headers=headers,
                timeout=30,
            ) as response:
                if response.status != 200:  # noqa: PLR2004
                    msg = f"Electrohold returned HTTP {response.status}"
                    raise UpdateFailed(msg)

                html = await response.text()

        except Exception as err:
            msg = f"Unable to retrieve Electrohold page: {err}"
            raise UpdateFailed(msg) from err

        try:
            day_price, night_price = parse_prices(html)
        except ValueError as err:
            raise UpdateFailed(str(err)) from err

        now = datetime.now().astimezone()

        _LOGGER.info(
            "Electrohold prices: day=%0.5f €/kWh, night=%0.5f €/kWh",
            day_price,
            night_price,
        )

        return ElectroholdData(
            day_price=day_price,
            night_price=night_price,
            last_update=now,
        )


def parse_prices(html: str) -> tuple[float, float]:
    """Parse Day and Night prices from Electrohold HTML."""
    soup = BeautifulSoup(html, "html.parser")

    for element in soup(["script", "style", "noscript"]):
        element.decompose()

    day_price: float | None = None
    night_price: float | None = None

    # Prefer table rows because Electrohold publishes the tariffs in tables.
    for row in soup.find_all("tr"):
        text = " ".join(row.stripped_strings)

        if not PRICE_PATTERN.search(text):
            continue

        prices = [
            float(value.replace(",", ".")) for value in PRICE_PATTERN.findall(text)
        ]

        if not prices:
            continue

        # Electrohold publishes the electricity-only price followed by
        # the final price including network services.
        final_price = prices[-1]

        if "Дневна" in text and day_price is None:
            day_price = final_price

        if "Нощна" in text and night_price is None:
            night_price = final_price

    if day_price is not None and night_price is not None:
        validate_prices(day_price, night_price)
        return day_price, night_price

    # Fallback for a future page redesign where the tariff data isn't
    # contained in <tr> elements.
    visible_text = " ".join(soup.stripped_strings)

    day_price = find_price_near_label(visible_text, "Дневна")
    night_price = find_price_near_label(visible_text, "Нощна")

    if day_price is None:
        msg = "Unable to find Electrohold Day price"
        raise ValueError(msg)

    if night_price is None:
        msg = "Unable to find Electrohold Night price"
        raise ValueError(msg)

    validate_prices(day_price, night_price)

    return day_price, night_price


def find_price_near_label(text: str, label: str) -> float | None:
    """Find the final price following a tariff label."""
    position = text.find(label)

    if position == -1:
        return None

    section = text[position : position + 500]

    prices = [
        float(value.replace(",", ".")) for value in PRICE_PATTERN.findall(section)
    ]

    if not prices:
        return None

    return prices[-1]


def validate_prices(day_price: float, night_price: float) -> None:
    """Validate parsed prices."""
    if day_price <= 0:
        msg = f"Invalid Day price: {day_price}"
        raise ValueError(msg)

    if night_price <= 0:
        msg = f"Invalid Night price: {night_price}"
        raise ValueError(msg)

    if day_price >= 10:  # noqa: PLR2004
        msg = f"Day price is suspiciously high: {day_price}"
        raise ValueError(msg)

    if night_price >= 10:  # noqa: PLR2004
        msg = f"Night price is suspiciously high: {night_price}"
        raise ValueError(msg)
