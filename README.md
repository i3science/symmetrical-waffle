# Node/Express/React Skeleton #

## Quick Start ##

```
npm install -g gulp
npm install
gulp
```

Then head to `http://localhost:3000`

## Running With Docker ##

Assuming you don't already have MongoDB installed and running, you can use
docker-compose to bring up the everything needed to run:

```
docker-compose up
```

If you already have mongo dockerized, you can run something like:

```
docker run -p 3000:3000 -p 35729:35729 -v $PWD:/srv/node/app --link mongo:mongo --name marketplace-dev thomaspwilson/nodejs

```

## Testing ##

We use end-to-end tests in order to verify that the application is in good
working order. We use [ProtractorJS](protractor) as the test framework. It's
designed primarily for testing AngularJS applications, but it works just fine 
for non-angular projects as well.

Testing will **not** work without a bit of set up first, though. 

1) Install Google Chrome
2) `npm install`
3) ./node_modules/protractor/bin/webdriver-manager update

This will ensure that the Selenium server is available, and that the Chrome
driver is prepared. Once this is done, you should be able to execute `gulp test`
without issue. You should expect one or more Chrome windows to open during
testing. This is normal.