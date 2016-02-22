var mongoose = require('mongoose'),
    Representative = mongoose.model('Representative'),
    representativeService = require('./../../src/js/server/services/RepresentativeService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.representatives = {
        mgluhorn: new Representative({
            client: fixtures.clients.ford,
            name: {
                first: 'Michelle',
                last: 'Gluhorn'
            },
            email: 'mgluhorn@smp.com',
            password: 'mgluhorn123',
            active: true,
            language: 'en_CA'
        }),
        sreese: new Representative({
            client: fixtures.clients.crest,
            name: {
                first: 'Sarah',
                last: 'Reese'
            },
            email: 'sreese@smp.com',
            password: 'sreese123',
            active: false,
            language: 'fr_CA'
        })
    };

    return function() {
        return populateFixtures(fixtures.representatives, representativeService);
    }
};