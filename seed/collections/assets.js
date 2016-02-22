var mongoose = require('mongoose'),
    moment = require('moment'),
    Asset = mongoose.model('Asset'),
    assetService = require('./../../src/js/server/services/AssetService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.assets = {};

    return function() {
        return populateFixtures(fixtures.assets, assetService);
    }
};