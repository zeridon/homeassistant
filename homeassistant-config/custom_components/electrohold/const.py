# Copyright (c) 2026 @Zeridon
# SPDX-License-Identifier: MIT

"""Constants for the Electrohold integration."""

from datetime import timedelta

DOMAIN = "electrohold"

NAME = "Electrohold Bulgaria (Regulated Prices)"

SOURCE_URL = (
    "https://electrohold.bg/bg/sales/domakinstva/snabdyavane-po-regulirani-ceni/"
)
CONF_SOURCE_URL = "source_url"

UPDATE_INTERVAL = timedelta(hours=24)

VAT_RATE = 20.0
CONF_VAT_RATE = "vat_rate"

ATTR_SOURCE = "source"
ATTR_LAST_UPDATE = "last_update"
ATTR_VAT_RATE = "vat_rate"
ATTR_DAY_PRICE = "day_price"
ATTR_NIGHT_PRICE = "night_price"
ATTR_EXCL_VAT = "price_excl_vat"
ATTR_INCL_VAT = "price_incl_vat"

TARIFF_DAY = "Дневна"
TARIFF_NIGHT = "Нощна"

SUMMER_DAY_START_HOUR = 7
SUMMER_DAY_END_HOUR = 23
SUMMER_MONTH_START = 4
SUMMER_MONTH_END = 10
WINTER_DAY_START_HOUR = 6
WINTER_DAY_END_HOUR = 22
