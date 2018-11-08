#!/bin/sh

set -e

# waiting for all dbs is up
while true; do
  nc -z postgres 5432 && break
  sleep 1
done

# apply migrations
npm run migrate

# create user for site owner
node --harmony --experimental-modules ./src/commands/index.mjs -s \
  user create -r admin -u "$ADMIN_USERNAME" -p "$ADMIN_PASSWORD" || true

# run passed command
exec "$@"
