#!/bin/bash

cd $(xcrun simctl get_app_container booted app.ninno.dev)
cd ../../../../Data
find . -name 'ninno-baby-tracker-app.db' -exec open {} \;