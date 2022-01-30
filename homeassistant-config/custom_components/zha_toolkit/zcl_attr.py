import asyncio
import logging

from zigpy import types as t
from zigpy.zcl import foundation as f
from zigpy.exceptions import DeliveryError

# import zigpy.zcl as zcl
from . import utils as u


LOGGER = logging.getLogger(__name__)


async def conf_report(
    app, listener, ieee, cmd, data, service, event_data, params
):
    dev = app.get_device(ieee=ieee)

    LOGGER.debug(params)
    # Get best endpoint
    if params["endpoint_id"] is None or params["endpoint_id"] == "":
        params["endpoint_id"] = u.find_endpoint(dev, params["cluster_id"])

    if params["endpoint_id"] not in dev.endpoints:
        LOGGER.error(
            "Endpoint %s not found for '%s'", params["endpoint_id"], repr(ieee)
        )

    if (
        params["cluster_id"]
        not in dev.endpoints[params["endpoint_id"]].in_clusters
    ):
        LOGGER.error(
            "Cluster 0x%04X not found for '%s', endpoint %s",
            params["cluster_id"],
            repr(ieee),
            params["endpoint_id"],
        )

    cluster = dev.endpoints[params["endpoint_id"]].in_clusters[
        params["cluster_id"]
    ]

    # await cluster.bind()  -> commented, not performing bind to coordinator

    triesToGo = params["tries"]
    event_data["success"] = False
    result_conf = None

    while triesToGo >= 1:
        triesToGo = triesToGo - 1
        try:
            LOGGER.debug(
                "Try configure report(%s,%s,%s,%s,%s) Try %s/%s",
                params["attr_id"],
                params["min_interval"],
                params["max_interval"],
                params["reportable_change"],
                params["manf"],
                params["tries"] - triesToGo,
                params["tries"],
            )
            result_conf = await cluster.configure_reporting(
                params["attr_id"],
                params["min_interval"],
                params["max_interval"],
                params["reportable_change"],
                manufacturer=params["manf"],
            )
            event_data["params"] = params
            event_data["result_conf"] = result_conf
            triesToGo = 0  # Stop loop
            LOGGER.info("Configure report result: %s", result_conf)
            event_data["success"] = (
                result_conf[0][0].status == f.Status.SUCCESS
            )
        except (DeliveryError, asyncio.TimeoutError):
            continue
        except Exception as e:
            triesToGo = 0  # Stop loop
            LOGGER.debug(
                "Configure report exception %s,%s,%s,%s,%s,%s",
                e,
                params["attr_id"],
                params["min_interval"],
                params["max_interval"],
                params["reportable_change"],
                params["manf"],
            )


async def attr_read(*args, **kwargs):
    await attr_write(*args, **kwargs)


# This code is shared with attr_read.
# Can read and write 1 attribute
async def attr_write(
    app, listener, ieee, cmd, data, service, params, event_data
):
    success = True

    dev = app.get_device(ieee=ieee)

    # Decode endpoint
    if params["endpoint_id"] is None or params["endpoint_id"] == "":
        params["endpoint_id"] = u.find_endpoint(dev, params["cluster_id"])

    if params["endpoint_id"] not in dev.endpoints:
        LOGGER.error(
            "Endpoint %s not found for '%s'", params["endpoint_id"], repr(ieee)
        )

    if (
        params["cluster_id"]
        not in dev.endpoints[params["endpoint_id"]].in_clusters
    ):
        LOGGER.error(
            "Cluster 0x%04X not found for '%s', endpoint %s",
            params["cluster_id"],
            repr(ieee),
            params["endpoint_id"],
        )

    cluster = dev.endpoints[params["endpoint_id"]].in_clusters[
        params["cluster_id"]
    ]

    # Prepare read and write lists
    attr_write_list = []
    attr_read_list = []

    # Decode attribute(s)
    #  Currently only one attribute is possible, but the parameter
    #  format could allow for multiple attributes for instance by
    #  adding a split character such as ':' for attr_id, attr_type
    #  and attr_value
    # Then the match should be in a loop

    # Decode attribute id
    # Could accept name for attribute, but extra code to check
    attr_id = params["attr_id"]

    attr_read_list.append(attr_id)  # Read before write list

    compare_val = None

    if cmd == "attr_write":
        attr_type = params["attr_type"]
        attr_val_str = params["attr_val"]

        # Type only needed for write
        if attr_type is None or attr_val_str is None:
            event_data["errors"].append(
                "attr_type and attr_val must be set for attr_write"
            )
        else:
            # Convert attribute value (provided as a string)
            # to appropriate attribute value.
            # If the attr_type is not set, only read the attribute.
            attr_val = None
            if attr_type == 0x10:
                compare_val = u.str2int(attr_val_str)
                attr_val = f.TypeValue(attr_type, t.Bool(compare_val))
            elif attr_type == 0x20:
                compare_val = u.str2int(attr_val_str)
                attr_val = f.TypeValue(attr_type, t.uint8_t(compare_val))
            elif attr_type <= 0x31 and attr_type >= 0x08:
                compare_val = u.str2int(attr_val_str)
                # uint, int, bool, bitmap and enum
                attr_val = f.TypeValue(attr_type, t.FixedIntType(compare_val))
            elif attr_type in [0x41, 0x42]:  # Octet string
                # Octet string requires length -> LVBytes
                compare_val = attr_val_str

                event_data["str"] = attr_val_str

                if type(attr_val_str) == str:
                    attr_val_str = bytes(attr_val_str, "utf-8")

                if isinstance(attr_val_str, list):
                    # Convert list to List of uint8_t
                    attr_val_str = t.List[t.uint8_t](
                        [t.uint8_t(i) for i in attr_val_str]
                    )

                attr_val = f.TypeValue(attr_type, t.LVBytes(attr_val_str))

            if attr_val is not None:
                attr = f.Attribute(attr_id, value=attr_val)
                attr_write_list.append(attr)  # Write list
            else:
                msg = (
                    "attr_type {} not supported, "
                    + "or incorrect parameters (attr_val={})"
                ).format(params["attr_type"], params["attr_val"])
            event_data["errors"] = msg
            LOGGER.debug(
                "ATTR TYPE %s, attr_val %s",
                params["attr_type"],
                params["attr_val"],
            )

    result_read = None
    if (
        params["read_before_write"]
        or (len(attr_write_list) == 0)
        or (cmd != "attr_write")
    ):
        LOGGER.debug("Request attr read %s", attr_read_list)
        result_read = await cluster.read_attributes(
            attr_read_list, manufacturer=params["manf"]
        )
        LOGGER.debug("Reading attr result (attrs, status): %s", result_read)
        success = (len(result_read[1]) == 0) and (len(result_read[0]) == 1)

    # True if value that should be written is the equal to the read one
    write_is_equal = len(attr_write_list) != 0 and (
        attr_id in result_read[0] and result_read[0][attr_id] == compare_val
    )

    event_data["write_is_equal"] = write_is_equal
    if write_is_equal and (cmd == "attr_write"):
        event_data["info"] = "Data read is equal to data to write"

    if (
        len(attr_write_list) != 0
        and (
            not (params["read_before_write"])
            or params["write_if_equal"]
            or not (write_is_equal)
        )
        and cmd == "attr_write"
    ):

        if result_read is not None:
            event_data["read_before"] = result_read
            result_read = None

        LOGGER.debug("Request attr write %s", attr_write_list)
        result_write = await cluster._write_attributes(
            attr_write_list, manufacturer=params["manf"]
        )
        LOGGER.debug("Write attr status: %s", result_write)
        event_data["result_write"] = result_write
        success = False
        try:
            # LOGGER.debug("Write attr status: %s", result_write[0][0].status)
            success = result_write[0][0].status == f.Status.SUCCESS
            LOGGER.debug("Write success: %s", success)
        except Exception as e:
            event_data["errors"].append(repr(e))
            success = False

        # success = (len(result_write[1])==0)

        if params["read_after_write"]:
            LOGGER.debug("Request attr read %s", attr_read_list)
            result_read = await cluster.read_attributes(
                attr_read_list, manufacturer=params["manf"]
            )
            LOGGER.debug(
                "Reading attr result (attrs, status): %s", result_read
            )
            # read_is_equal = (result_read[0][attr_id] == compare_val)
            success = (
                success
                and (len(result_read[1]) == 0 and len(result_read[0]) == 1)
                and (result_read[0][attr_id] == compare_val)
            )

    if result_read is not None:
        event_data["result_read"] = result_read

    event_data["success"] = success

    # Write value to provided state or state attribute
    if params["state_id"] is not None:
        if len(result_read[1]) == 0 and len(result_read[0]) == 1:
            # No error and one result
            for id, val in result_read[0].items():
                if params["state_attr"] is not None:
                    LOGGER.debug(
                        "Set state %s[%s] -> %s from attr_id %s",
                        params["state_id"],
                        params["state_attr"],
                        val,
                        id,
                    )
                else:
                    LOGGER.debug(
                        "Set state %s -> %s from attr_id %s",
                        params["state_id"],
                        val,
                        id,
                    )
                u.set_state(
                    listener._hass,
                    params["state_id"],
                    val,
                    key=params["state_attr"],
                    allow_create=params["allow_create"],
                )
                LOGGER.debug("STATE is set")

    # For internal use
    return result_read

    # Example where attributes are not types
    # (supposed typed by the internals):
    #   attrs = {0x0009: 0b00001000, 0x0012: 1400, 0x001C: 0xFF}
    #   result = await cluster'.write_attributes(attrs)
