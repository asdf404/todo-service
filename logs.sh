#!/bin/bash

set -e

./app.sh logs --tail 100 -f $@
