import asyncio
import logging

import zigpy.zdo.types as zdo_t
import zigpy.types as t
import zigpy.device
import zigpy.zdo

from . import utils as u
from .params import CODE

LOGGER = logging.getLogger(__name__)


async def leave(app, listener, ieee, cmd, data, service, event_data, params):
    if ieee is None or not data:
        LOGGER.warning(
            "Incorrect parameters for 'zdo.leave' command: %s", service
        )
        return
    LOGGER.debug(
        "running 'leave' command. Telling 0x%s to remove %s: %s",
        data,
        ieee,
        service,
    )

    parent = await u.get_device(app, listener, data)

    res = await parent.zdo.request(zdo_t.ZDOCmd.Mgmt_Leave_req, ieee, 0x02)
    event_data["result_leave"] = res
    LOGGER.debug("0x%04x: Mgmt_Leave_req: %s", parent.nwk, res)


async def ieee_ping(
    app, listener, ieee, cmd, data, service, event_data, params
):
    if ieee is None:
        LOGGER.warning(
            "Incorrect parameters for 'ieee_ping' command: %s", service
        )
        return

    # The device is the parent device
    dev = app.get_device(ieee)

    LOGGER.debug("running 'ieee_ping' command to 0x%s", dev.nwk)

    res = await dev.zdo.request(
        zdo_t.ZDOCmd.IEEE_addr_req, dev.nwk, 0x00, 0x00
    )
    event_data["result_ping"] = res
    LOGGER.debug("0x%04x: IEEE_addr_req: %s", dev.nwk, res)


async def join_with_code(
    app, listener, ieee, cmd, data, service, event_data, params
):
    import bellows.types as bt

    node = ieee  # Was: t.EUI64.convert("04:cf:8c:df:3c:75:e1:e7")

    # Original code:
    #
    # code = (
    #   b"\xA8\x16\x92\x7F\xB1\x9B\x78\x55\xC1"
    #    + b"\xD7\x76\x0D\x5C\xAD\x63\x7F\x69\xCC"
    # )
    code = params[CODE]
    res = await app.permit_with_key(node, code, 60)
    link_key = bt.EmberKeyData(b"ZigBeeAlliance09")
    res = await app._ezsp.addTransientLinkKey(node, link_key)
    LOGGER.debug("permit with key: %s", res)
    res = await app.permit(60)


async def update_nwk_id(
    app, listener, ieee, cmd, data, service, event_data, params
):
    """Update NWK id. data contains new NWK id."""
    if data is None:
        LOGGER.error("Need NWK update id in the data")
        return

    nwk_upd_id = t.uint8_t(data)

    await zigpy.device.broadcast(
        app,
        0,
        zdo_t.ZDOCmd.Mgmt_NWK_Update_req,
        0,
        0,
        0x0000,
        0x00,
        0xEE,
        b"\xee"
        + t.Channels.ALL_CHANNELS.serialize()
        + b"\xFF"
        + nwk_upd_id.serialize()
        + b"\x00\x00",
    )

    res = await app._ezsp.getNetworkParameters()
    event_data["result_update"] = res
    LOGGER.debug("Network params: %s", res)


async def topo_scan_now(
    app, listener, ieee, cmd, data, service, event_data, params
):

    LOGGER.debug("Scanning topology")
    task = asyncio.create_task(app.topology.scan())
    event_data["task"] = task


async def flood_parent_annce(
    app, listener, ieee, cmd, data, service, event_data, params
):

    LOGGER.debug("flooding network with parent annce")

    flooder_task = getattr(app, "flooder_task", None)
    if flooder_task and not flooder_task.done():
        flooder_task.cancel()
        LOGGER.debug("Stop flooding network with parent annce messages")
        app.flooder_task = None
        event_data["task"] = None
        return

    flooder_task = asyncio.create_task(_flood_with_parent_annce(app))
    event_data["task"] = flooder_task
    app.flooder_task = flooder_task


async def _flood_with_parent_annce(app):

    coord = app.get_device(app.ieee)

    while True:
        children = [
            nei.device.ieee
            for nei in coord.neighbors
            if nei.device.node_desc.is_end_device
        ]
        coord.debug("Have the following children: %s", children)
        await zigpy.zdo.broadcast(
            app,
            zigpy.zdo.types.ZDOCmd.Parent_annce,
            0x0000,
            0x00,
            children,
            broadcast_address=t.BroadcastAddress.ALL_ROUTERS_AND_COORDINATOR,
        )
        await asyncio.sleep(0.1)
