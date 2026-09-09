# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""The Electrohold Bulgaria integration."""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.const import Platform

from .coordinator import ElectroholdCoordinator

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

PLATFORMS = [
    Platform.BUTTON,
    Platform.SENSOR,
]


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Set up Electrohold from a config entry."""
    coordinator = ElectroholdCoordinator(hass, entry)

    await coordinator.async_config_entry_first_refresh()

    entry.runtime_data = coordinator

    await hass.config_entries.async_forward_entry_setups(
        entry,
        PLATFORMS,
    )

    return True


async def async_unload_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Unload Electrohold."""
    return await hass.config_entries.async_unload_platforms(
        entry,
        PLATFORMS,
    )
