# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""Sensors for Electrohold Bulgaria."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from homeassistant.components.sensor import (
    SensorEntity,
    SensorStateClass,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    ATTR_LAST_UPDATE,
    ATTR_SOURCE,
    ATTR_VAT_RATE,
    DOMAIN,
    SUMMER_DAY_END_HOUR,
    SUMMER_DAY_START_HOUR,
    SUMMER_MONTH_END,
    SUMMER_MONTH_START,
    TARIFF_DAY,
    TARIFF_NIGHT,
    WINTER_DAY_END_HOUR,
    WINTER_DAY_START_HOUR,
)
from .coordinator import ElectroholdCoordinator

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.helpers.entity_platform import AddEntitiesCallback


async def async_setup_entry(
    _hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Electrohold sensors."""
    coordinator: ElectroholdCoordinator = entry.runtime_data

    async_add_entities(
        [
            ElectroholdDayPriceSensor(coordinator),
            ElectroholdDayPriceVatSensor(coordinator),
            ElectroholdNightPriceSensor(coordinator),
            ElectroholdNightPriceVatSensor(coordinator),
            ElectroholdCurrentPriceSensor(coordinator),
            ElectroholdCurrentPriceVatSensor(coordinator),
            ElectroholdCurrentTariffSensor(coordinator),
        ]
    )


class ElectroholdBaseSensor(
    CoordinatorEntity[ElectroholdCoordinator],
    SensorEntity,
):
    """Base class for Electrohold sensors."""

    _attr_has_entity_name = True
    _attr_native_unit_of_measurement = "€/kWh"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(
        self,
        coordinator: ElectroholdCoordinator,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator)

        self._attr_device_info = {
            "identifiers": {(DOMAIN, "electrohold")},
            "name": "Electrohold Bulgaria",
            "manufacturer": "Electrohold",
        }

    @property
    def extra_state_attributes(self) -> dict:
        """Return common attributes."""
        data = self.coordinator.data

        return {
            ATTR_SOURCE: self.coordinator.source_url,
            ATTR_LAST_UPDATE: data.last_update.isoformat(),
            ATTR_VAT_RATE: self.coordinator.vat_rate,
        }


class ElectroholdDayPriceSensor(ElectroholdBaseSensor):
    """Day price excluding VAT."""

    _attr_name = "Day Price"
    _attr_unique_id = "electrohold_day_price"
    _attr_icon = "mdi:weather-sunny"

    @property
    def native_value(self) -> float:
        """Return Day price."""
        return self.coordinator.data.day_price


class ElectroholdDayPriceVatSensor(ElectroholdBaseSensor):
    """Day price including VAT."""

    _attr_name = "Day Price incl VAT"
    _attr_unique_id = "electrohold_day_price_incl_vat"
    _attr_icon = "mdi:weather-sunny"

    @property
    def native_value(self) -> float:
        """Return Day price including VAT."""
        return self.coordinator.data.day_price * (1 + self.coordinator.vat_rate / 100)


class ElectroholdNightPriceSensor(ElectroholdBaseSensor):
    """Night price excluding VAT."""

    _attr_name = "Night Price"
    _attr_unique_id = "electrohold_night_price"
    _attr_icon = "mdi:weather-night"

    @property
    def native_value(self) -> float:
        """Return Night price."""
        return self.coordinator.data.night_price


class ElectroholdNightPriceVatSensor(ElectroholdBaseSensor):
    """Night price including VAT."""

    _attr_name = "Night Price incl VAT"
    _attr_unique_id = "electrohold_night_price_incl_vat"
    _attr_icon = "mdi:weather-night"

    @property
    def native_value(self) -> float:
        """Return Night price including VAT."""
        return self.coordinator.data.night_price * (1 + self.coordinator.vat_rate / 100)


class ElectroholdCurrentTariffSensor(ElectroholdBaseSensor):
    """Current tariff."""

    _attr_name = "Current Tariff"
    _attr_unique_id = "electrohold_current_tariff"
    _attr_native_unit_of_measurement = None
    _attr_state_class = None
    _attr_icon = "mdi:clock-time-four-outline"

    async def async_added_to_hass(self) -> None:
        """Subscribe to clock changes."""
        await super().async_added_to_hass()

        self.async_on_remove(
            async_track_time_change(
                self.hass,
                self._handle_time_change,
                hour="*",
                minute="*",
                second=0,
            )
        )

    @callback
    def _handle_time_change(self, _now: datetime) -> None:
        """Update when the clock changes."""
        self.async_write_ha_state()

    @property
    def native_value(self) -> str:
        """Return current tariff."""
        return get_current_tariff(datetime.now().astimezone())


class ElectroholdCurrentPriceSensor(ElectroholdBaseSensor):
    """Current price excluding VAT."""

    _attr_name = "Current Price"
    _attr_unique_id = "electrohold_current_price"
    _attr_icon = "mdi:flash"

    async def async_added_to_hass(self) -> None:
        """Subscribe to clock changes."""
        await super().async_added_to_hass()

        self.async_on_remove(
            async_track_time_change(
                self.hass,
                self._handle_time_change,
                hour="*",
                minute="*",
                second=0,
            )
        )

    @callback
    def _handle_time_change(self, _now: datetime) -> None:
        """Update when the tariff changes."""
        self.async_write_ha_state()

    @property
    def native_value(self) -> float:
        """Return current price."""
        if get_current_tariff(datetime.now().astimezone()) == TARIFF_DAY:
            return self.coordinator.data.day_price

        return self.coordinator.data.night_price


class ElectroholdCurrentPriceVatSensor(ElectroholdBaseSensor):
    """Current price including VAT."""

    _attr_name = "Current Price incl VAT"
    _attr_unique_id = "electrohold_current_price_incl_vat"
    _attr_icon = "mdi:flash-outline"

    async def async_added_to_hass(self) -> None:
        """Subscribe to clock changes."""
        await super().async_added_to_hass()

        self.async_on_remove(
            async_track_time_change(
                self.hass,
                self._handle_time_change,
                hour="*",
                minute="*",
                second=0,
            )
        )

    @callback
    def _handle_time_change(self, _now: datetime) -> None:
        """Update when the tariff changes."""
        self.async_write_ha_state()

    @property
    def native_value(self) -> float:
        """Return current price including VAT."""
        if get_current_tariff(datetime.now().astimezone()) == TARIFF_DAY:
            price = self.coordinator.data.day_price
        else:
            price = self.coordinator.data.night_price

        return price * (1 + self.coordinator.vat_rate / 100)


def get_current_tariff(now: datetime) -> str:
    """Return the current Electrohold tariff."""
    month = now.month
    hour = now.hour

    # April 1 through October 31:
    # Day:   07:00 - 23:00
    # Night: 23:00 - 07:00
    if SUMMER_MONTH_START <= month <= SUMMER_MONTH_END:
        if SUMMER_DAY_START_HOUR <= hour < SUMMER_DAY_END_HOUR:
            return TARIFF_DAY

        return TARIFF_NIGHT

    # November 1 through March 31:
    # Day:   06:00 - 22:00
    # Night: 22:00 - 06:00
    if WINTER_DAY_START_HOUR <= hour < WINTER_DAY_END_HOUR:
        return TARIFF_DAY

    return TARIFF_NIGHT
