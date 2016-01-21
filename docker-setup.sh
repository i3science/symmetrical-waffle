#!/bin/bash

packages=(
    "git"
    "bzip2"
    "libkrb5-dev"
    "build-essential"
    "python2.7"
)

INSTALLED=$(dpkg-query -l ${packages[@]})
if [ "$?" == "1" ]
then
    apt-get update
    apt-get install -y --no-install-recommends ${packages[@]}
fi