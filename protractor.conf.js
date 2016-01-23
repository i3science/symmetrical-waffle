// Set up ES6/JSX support server-side
require('babel-register');

exports.config = {
    specs: ['test/js/client/components/*.ee.js'],

    seleniumPort: 4444,

    chromeOnly: false,
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }
};