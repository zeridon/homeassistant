import logging
import os
from enum import Enum
from zigpy import types as t
from homeassistant.util.json import save_json


LOGGER = logging.getLogger(__name__)


# Convert string to int if possible or return original string
#  (Returning the original string is useful for named attributes)
def str2int(s):
    if not type(s) == str:
        return s
    elif s.lower() == "false":
        return 0
    elif s.lower() == "true":
        return 1
    elif s.startswith("0x") or s.startswith("0X"):
        return int(s, 16)
    elif s.startswith("0") and s.isnumeric():
        return int(s, 8)
    elif s.startswith("b") and s[1:].isnumeric():
        return int(s[1:], 2)
    elif s.isnumeric():
        return int(s)
    else:
        return s


# Convert string to best boolean representation
def str2bool(s):
    if s is None or s == "":
        return False
    if s is True or s is False:
        return s
    return str2int(s) != 0


class RadioType(Enum):
    UNKNOWN = 0
    ZNP = 1
    EZSP = 2
    BELLOWS = 2


def get_radiotype(app):
    if hasattr(app, "_znp"):
        return RadioType.ZNP
    if hasattr(app, "_ezsp"):
        return RadioType.EZSP
    LOGGER.debug("Type recognition for '%s' not implemented", type(app))
    return RadioType.UNKNOWN


def get_radio(app):
    if hasattr(app, "_znp"):
        return app._znp
    if hasattr(app, "_ezsp"):
        return app._ezsp
    LOGGER.debug("Type recognition for '%s' not implemented", type(app))
    return RadioType.UNKNOWN


# Get zigbee IEEE address (EUI64) for the reference.
#  Reference can be entity, device, or IEEE address
async def get_ieee(app, listener, ref):
    # LOGGER.debug("Type IEEE: %s", type(ref))
    if type(ref) == str:
        # Check if valid ref address
        if ref.count(":") == 7:
            return t.EUI64.convert(ref)

        # Check if network address
        nwk = str2int(ref)
        if (type(nwk) == int) and nwk >= 0x0000 and nwk <= 0xFFF7:
            device = app.get_device(nwk=nwk)
            if device is None:
                return None
            else:
                LOGGER.debug("NWK addr 0x04x -> %s", nwk, device.ieee)
                return device.ieee

        # Todo: check if NWK address
        entity_registry = (
            await listener._hass.helpers.entity_registry.async_get_registry()
        )
        # LOGGER.debug("registry %s",entity_registry)
        registry_entity = entity_registry.async_get(ref)
        LOGGER.debug("registry_entity %s", registry_entity)
        if registry_entity is None:
            return None
        if registry_entity.platform != "zha":
            LOGGER.error("Not a ZHA device : '%s'", ref)
            return None

        device_registry = (
            await listener._hass.helpers.device_registry.async_get_registry()
        )
        registry_device = device_registry.async_get(registry_entity.device_id)
        LOGGER.debug("registry_device %s", registry_device)
        for identifier in registry_device.identifiers:
            if identifier[0] == "zha":
                return t.EUI64.convert(identifier[1])
        return None

    # Other type, suppose it's already an EUI64
    return ref


# Get a zigbee device instance for the reference.
#  Reference can be entity, device, or IEEE address
async def get_device(app, listener, reference):
    # Method is called get
    ieee = await get_ieee(app, listener, reference)
    LOGGER.debug("IEEE for get_device: %s", ieee)
    return app.get_device(ieee)


# Save state to db
def set_state(
    hass, entity_id, value, key=None, allow_create=False, force_update=False
):
    stateObj = hass.states.get(entity_id)
    if stateObj is None and allow_create is not True:
        LOGGER.warning("Entity_id '%s' not found", entity_id)
        return

    if stateObj is not None:
        # Copy existing attributes, to update selected item
        stateAttrs = stateObj.attributes.copy()
    else:
        stateAttrs = {}

    # LOGGER.debug("Before: entity:%s key:%s value:%s attrs:%s",
    #              entity_id, key, value, stateAttrs)
    if key is not None:
        stateAttrs[key] = value
        value = None

    # LOGGER.debug("entity:%s key:%s value:%s attrs:%s",
    #              entity_id, key, value, stateAttrs)

    # Store to DB_state
    hass.states.async_set(
        entity_id=entity_id,
        new_state=value,
        attributes=stateAttrs,
        force_update=force_update,
        context=None,
    )


# Find endpoint matching in_cluster
def find_endpoint(dev, cluster_id):
    cnt = 0
    endpoint_id = None

    for key, value in dev.endpoints.items():
        if key == 0:
            continue
        if cluster_id in value.in_clusters:
            endpoint_id = key
            cnt = cnt + 1

    if cnt == 0:
        LOGGER.error("No Endpoint found for cluster '%s'", cluster_id)
    if cnt > 1:
        endpoint_id = None
        LOGGER.error(
            "More than one Endpoint found for cluster '%s'", cluster_id
        )
    if cnt == 1:
        LOGGER.debug(
            "Endpoint %s found for cluster '%s'", endpoint_id, cluster_id
        )

    return endpoint_id


def write_json_to_file(data, subdir, fname, desc, listener=None):
    if listener is None or subdir == "local":
        base_dir = os.path.dirname(__file__)
    else:
        base_dir = listener._hass.config.config_dir

    out_dir = os.path.join(base_dir, subdir)
    if not os.path.isdir(out_dir):
        os.mkdir(out_dir)

    file_name = os.path.join(out_dir, fname)
    save_json(file_name, data)
    LOGGER.debug(f"Finished writing {desc} in '{file_name}'")


# Common method to extract and convert parameters.
#
# Most parameters are similar, this avoids repeating
# code.
#
def extractParams(service):

    # Get best parameter set, 'extra' is legacy.
    rawParams = service.data.get("extra")

    if not isinstance(rawParams, dict):
        # Fall back to parameters in 'data:' key
        rawParams = service.data

    LOGGER.debug("Parameters '%s'", rawParams)

    # Potential parameters, initialized to None
    # TODO: Not all parameters are decoded in this function yet
    params = {
        "cmd_id": None,
        "endpoint_id": None,
        "cluster_id": None,
        "attr_id": None,
        "attr_type": None,
        "attr_val": None,
        "code": None,  # Install code (join with code)
        "min_interval": None,
        "max_interval": None,
        "reportable_change": None,
        "dir": 0,
        "manf": None,
        "tries": 1,
        "expect_reply": True,
        "args": [],
        "state_id": None,
        "state_attr": None,
        "allow_create": False,
        "event_success": None,
        "event_fail": None,
        "event_done": None,
        "read_before_write": True,
        "read_after_write": True,
        "write_if_equal": False,
    }

    # Extract parameters

    # Endpoint to send command to
    if "endpoint" in rawParams:
        params["endpoint_id"] = str2int(rawParams["endpoint"])

    # Cluster to send command to
    if "cluster" in rawParams:
        params["cluster_id"] = str2int(rawParams["cluster"])

    # Attribute to send command to
    if "attribute" in rawParams:
        params["attr_id"] = str2int(rawParams["attribute"])

    # Attribute to send command to
    if "attr_type" in rawParams:
        params["attr_type"] = str2int(rawParams["attr_type"])

    # Attribute to send command to
    if "attr_val" in rawParams:
        params["attr_val"] = str2int(rawParams["attr_val"])

    # Install code
    if "code" in rawParams:
        params["code"] = str2int(rawParams["code"])

    # The command to send
    if "cmd" in rawParams:
        params["cmd_id"] = str2int(rawParams["cmd"])

    # The direction (to in or out cluster)
    if "dir" in rawParams:
        params["dir"] = str2int(rawParams["dir"])

    # Get manufacturer
    if "manf" in rawParams:
        params["manf"] = str2int(rawParams["manf"])

    # Get tries
    if "tries" in rawParams:
        params["tries"] = str2int(rawParams["tries"])

    # Get expect_reply
    if "expect_reply" in rawParams:
        params["expect_reply"] = str2int(rawParams["expect_reply"]) == 0

    if "args" in rawParams:
        cmd_args = []
        for val in rawParams["args"]:
            LOGGER.debug("cmd arg %s", val)
            lval = str2int(val)
            if isinstance(lval, list):
                # Convert list to List of uint8_t
                lval = t.List[t.uint8_t]([t.uint8_t(i) for i in lval])
                # Convert list to LVList structure
                # lval = t.LVList(lval)
            cmd_args.append(lval)
            LOGGER.debug("cmd converted arg %s", lval)
        params["args"] = cmd_args

    if "min_interval" in rawParams:
        params["min_interval"] = str2int(rawParams["min_interval"])
    if "max_interval" in rawParams:
        params["max_interval"] = str2int(rawParams["max_interval"])
    if "reportable_change" in rawParams:
        params["reportable_change"] = str2int(rawParams["reportable_change"])

    if "state_id" in rawParams:
        params["state_id"] = rawParams["state_id"]

    if "state_attr" in rawParams:
        params["state_attr"] = rawParams["state_attr"]

    if "read_before_write" in rawParams:
        params["read_before_write"] = str2bool(rawParams["read_before_write"])

    if "read_after_write" in rawParams:
        params["read_after_write"] = str2bool(rawParams["read_after_write"])

    if "write_if_equal" in rawParams:
        params["write_if_equal"] = str2bool(rawParams["write_if_equal"])

    if "state_attr" in rawParams:
        params["state_attr"] = rawParams["state_attr"]

    if "allow_create" in rawParams:
        allow = str2int(rawParams["allow_create"])
        params["allow_create"] = (allow is not None) and (
            (allow is True) or (allow == 1)
        )

    if "event_done" in rawParams:
        params["event_done"] = rawParams["event_done"]

    if "event_fail" in rawParams:
        params["event_fail"] = rawParams["event_fail"]

    if "event_success" in rawParams:
        params["event_success"] = rawParams["event_success"]

    return params
