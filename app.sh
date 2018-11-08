#!/bin/bash

set -e

for env in `cat .env | grep -v '#'`; do
  export "$env"
done

docker-compose -f docker-compose.yml -f "config-$NODE_ENV.yml" $@
