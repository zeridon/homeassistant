# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""Buttons for the Electrohold Bulgaria integration."""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.components.button import ButtonEntity
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import ElectroholdCoordinator

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddEntitiesCallback



class ElectroholdRefreshButton(
    CoordinatorEntity[ElectroholdCoordinator],
    ButtonEntity,
):
    """Button to manually refresh Electrohold prices."""

    _attr_has_entity_name = True
    _attr_name = "Refresh prices"
    _attr_icon = "mdi:refresh"
    _attr_entity_category = EntityCategory.CONFIG
    _attr_unique_id = "electrohold_refresh_prices"

    def __init__(self, coordinator: ElectroholdCoordinator) -> None:
        """Initialize the refresh button."""
        super().__init__(coordinator)

        self._attr_device_info = {
            "identifiers": {(DOMAIN, "electrohold")},
            "name": "Electrohold Bulgaria",
            "manufacturer": "Electrohold",
        }

    async def async_press(self) -> None:
        """Refresh Electrohold prices."""
        await self.coordinator.async_request_refresh()


async def async_setup_entry(
    _hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Electrohold buttons."""
    coordinator: ElectroholdCoordinator = entry.runtime_data

    async_add_entities(
        [
            ElectroholdRefreshButton(coordinator),
        ]
    )
