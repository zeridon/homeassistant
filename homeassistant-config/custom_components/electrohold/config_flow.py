# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""Config flow for Electrohold Bulgaria."""

from __future__ import annotations

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import CONF_SOURCE_URL, CONF_VAT_RATE, DOMAIN, SOURCE_URL, VAT_RATE


class ElectroholdConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the Electrohold config flow."""

    VERSION = 1

    async def async_step_user(
        self,
        user_input: dict | None = None,
    ) -> ConfigFlowResult:
        """Handle the setup flow."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            source_url = user_input.get(CONF_SOURCE_URL) or SOURCE_URL
            vat_rate = user_input.get(CONF_VAT_RATE) or VAT_RATE

            return self.async_create_entry(
                title="Electrohold Bulgaria",
                data={
                    CONF_SOURCE_URL: source_url,
                    CONF_VAT_RATE: vat_rate,
                },
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_SOURCE_URL,
                        default=SOURCE_URL,
                    ): str,
                    vol.Optional(
                        CONF_VAT_RATE,
                        default=VAT_RATE,
                    ): vol.All(
                        vol.Coerce(float),
                        vol.Range(min=0, max=100),
                    ),
                }
            ),
        )
