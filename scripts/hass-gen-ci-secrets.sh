#!/usr/bin/env bash
set -e

if [ -f homeassistant-config/ci-secrets.yaml ]; then
  echo "Clearing previous secrets test file..."
  echo "---" > homeassistant-config/ci-secrets.yaml
fi

# Mapfile is prefered but adds an extra space
# mapfile -t secrets < <(grep -r '!secret' . --exclude-dir=.vscode --exclude=generate_secrets.sh | sed -ne 's/^.*!secret//p' | sort | uniq)

# shellcheck disable=SC2207
secrets=($(grep -r '!secret' homeassistant-config --exclude=secrets.yaml --exclude=ci-secrets.yaml| awk '{print $NF}' | sort | uniq))

function getValue() {
	if echo "$1" | grep -q "_port"; then
		echo "8080"
		return
	elif echo "$1" | grep -q "_email"; then
		echo "user@mail.com"
		return
	elif echo "$1" | grep -q "_host"; then
		echo "0.0.0.0"
		return
	elif echo "$1" | grep -q "localhost"; then
		echo "0.0.0.0"
		return
	elif echo "$1" | grep -q "_url"; then
		echo "http://endpoint.com"
		return
	elif echo "$1" | grep -q "s5_vacuum_token"; then
		echo "00000000000000000000000000000000"
	elif echo "$1" | grep -q "_token"; then
		echo "00000000-0000-0000-0000-000000000000"
		return
	elif echo "$1" | grep -q "_api_key"; then
		echo "00000000-0000-0000-0000-000000000000"
		return
	elif echo "$1" | grep -q "_secret"; then
		echo "00000000-0000-0000-0000-000000000000"
		return
	elif echo "$1" | grep -q "_latitude"; then
		echo "0.000000"
		return
	elif echo "$1" | grep -q "_longitude"; then
		echo "0.000000"
		return
	elif echo "$1" | grep -q "_elevation"; then
		echo "0"
		return
	elif echo "$1" | grep -q "_mac"; then
		echo "12:34:56:78:9a:bc"
		return
	else
		echo "somevalue"
		return
	fi
}

for secret in "${secrets[@]}"; do
  echo "Found secret: $secret"
  echo "$secret: \"$(getValue "$secret")\"" >> homeassistant-config/ci-secrets.yaml
done
