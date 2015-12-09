#!/bin/bash
set -e

if [[ "$1" != "gulp" ]]
then
  echo "Running $@"
  exec "$@"
fi

mkdir -p /srv/node/app
cd /srv/node/app
npm install

exec "$@"
