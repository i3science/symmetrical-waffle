# Node/Express/React Skeleton #

## Quick Start ##

```
npm install
grunt
```

Then head to `http://localhost:3000`

## Running With Docker ##

Assuming you don't already have MongoDB installed and running, you can use docker-compose to bring up the everything needed to run:

```
docker-compose up
```

If you already have mongo dockerized, you can run something like:

```
docker build -t marketplace .
docker run -v $PWD:/srv/node/app -p 3000:3000 -p 35729:35729 --link mongo:mongo --name marketplace marketplace

```