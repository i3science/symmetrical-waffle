#!/bin/bash

# Install required packages
packages=(
    "build-essential"
    "bzip2"
    "git"
    "libkrb5-dev"
    "openjdk-8-jdk"
    "python2.7"
)

INSTALLED=$(dpkg-query -l ${packages[@]})
if [ "$?" == "1" ]
then
    apt-get update
    apt-get install -y --no-install-recommends ${packages[@]}
fi

if ! grep -Fxq "export PYTHON" ~/.bashrc
then
    echo "export PYTHON=$(which python2.7)" >> ~/.bashrc
    export PYTHON=$(which python2.7)
fi


npm install

# If we're running in development mode, install headless chrome
if [[ -z "$NODE_ENV" || "$NODE_ENV" == "development" ]];
then
    dev_packages=(
        "curl"
        "gdebi"
        "xvfb"
        "google-chrome-stable"
    )
    INSTALLED=$(dpkg-query -l ${dev_packages[@]})
    if [ "$?" == "1" ];
    then
      apt-get install -y --no-install-recommends curl gdebi xvfb
      curl -s -o tmp.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
      gdebi --n tmp.deb
      rm tmp.deb
      mv /usr/bin/google-chrome /usr/bin/google-chrome-orig
      curl -s https://gist.githubusercontent.com/thomas-p-wilson/86efe87c387ed7f2a81f/raw/21137c16878aac9835e445622279f1c096fbc424/google-chrome-xvfb > /usr/bin/google-chrome
      sed -i 's/google-chrome/google-chrome-orig/g' /usr/bin/google-chrome
      chmod +x /usr/bin/google-chrome
      echo "export CHROME_BIN=/usr/bin/google-chrome" >> ~/.bashrc
      export CHROME_BIN=/usr/bin/google-chrome
    fi

    # if ! grep -Fxq "export DISPLAY=:1" ~/.bashrc
    # then
    #   echo "export DISPLAY=:1" >> ~/.bashrc
    #   export DISPLAY=:1
    #   echo "XVFB_WHD=${XVFB_WHD:-1280x720x16}" >> ~/.bashrc
    #   XVFB_WHD=${XVFB_WHD:-1280x720x16}
    #   echo "Xvfb $DISPLAY -ac -screen 0 $XVFB_WHD -nolisten tcp &" >> ~/.bashrc
    #   Xvfb $DISPLAY -ac -screen 0 $XVFB_WHD -nolisten tcp &
    # fi

    npm install -g gulp
    ./node_modules/protractor/bin/webdriver-manager update
fi
