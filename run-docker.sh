#!/bin/bash
docker run -v $PWD:/srv/node/app -p 3000:3000 -p 35729:35729 --link mongo:mongo -it --name marketplace thomaspwilson/nodejs /bin/bash