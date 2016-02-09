var mongoose = require('mongoose'),
    Client = mongoose.model('Client'),
    clientService = require('./../../src/js/server/services/ClientService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.clients = {
        ford: new Client({
            organization: fixtures.organizations.jones,
            name: 'Ford Motors Inc'
        }),
        crest: new Client({
            organization: fixtures.organizations.jones,
            name: 'Crest Inc'
        }),
        green_giant: new Client({
            organization: fixtures.organizations.jones,
            name: 'Green Giant'
        })
    };

    return function() {
        return populateFixtures(fixtures.clients, clientService);
    }
};