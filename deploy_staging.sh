#!/bin/bash

TARGET=54.173.3.126

tar -czf dist.tgz config/ dist/ seed/ src/mail src/public gulpfile.js server.js \
 && rsync -avz -e "ssh -p 9731" dist.tgz circleci@${TARGET}:/home/circleci \
 && ssh circleci@${TARGET} -p 9731 "sudo /home/circleci/deploy.sh"
