#!/bin/bash
set -e

npm install

if [[ "$1" != "gulp" ]]
then
  echo "Running $@"
  exec "$@"
fi

exec "$@"
