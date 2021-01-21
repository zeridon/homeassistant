# Home Assistant stuff

Here's my [Home Assistant](https://home-assistant.io/) configuration. I have installed HA on an [x240 laptop](x). I am currently running Ubuntu 20.04 LTS on the Laptop and used the [Docker](https://home-assistant.io/docs/installation/docker/) approach to install HA. Everything is managed with docker-compose.

I regularly update my configuration files. If you like anything here, Be sure to :star2: my repo!

## What things that I run
* [Home Assistant](https://home-assistant.io/)
* [Eclipse Mosquitto](https://mosquitto.org/)
* [Traefik](https://traefik.io/) for reverse proxy, ssl certs and so on
* [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy) for higher docker security
* [docker-gc-cron](https://github.com/clockworksoul/docker-gc-cron) for cleanup of forgoten stuff

## Some of the devices and services that I use with HA
* [Shelly1](https://shelly.cloud/products/shelly-1-smart-home-automation-relay/) Smart Relay in MQTT mode
* [Shelly1PM](https://shelly.cloud/products/shelly-1pm-smart-home-automation-relay/) Smart Relay with Power metering in MQTT mode
* [ShellyRGBW2](https://shelly.cloud/products/shelly-rgbw2-smart-home-automation-led-controller/) RGBW led controller in MQTT mode
* [Shelly H&T](https://shelly.cloud/products/shelly-humidity-temperature-smart-home-automation-sensor/) Humidity and Temperature sensor in MQTT mode
* [Shelly D/W2](https://shelly.cloud/products/shelly-door-window-2-smart-home-automation-sensor/) Door sensor in MQTT mode
* [Daikin Airconditioning](https://daikin.com)

## Usefull scripts
* `generate-ci-secrets.sh` - looks trough config and generates dummy secrets file for CI. Also usefull if you don't have mine to be able to start quickly.
