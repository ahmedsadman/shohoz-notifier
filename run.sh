#!/bin/bash

export DBUS_SESSION_BUS_ADDRESS=autolaunch:

google-chrome-stable &
node script.js "$@"
