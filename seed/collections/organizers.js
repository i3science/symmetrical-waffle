var populateFixtures = require('../utils').populateFixtures,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    organizerService = require('../../src/js/server/services/OrganizerService').default;

module.exports = function(fixtures) {
    fixtures.organizers = {
        laelius: {
            name: {
                first: 'Lucius',
                last: 'Aelius'
            },
            email: 'lucius@smp.com',
            active: true,
            language: 'en_CA',
            password: 'luc1usis4w3s0m3'
        },
        talbucius: {
            name: {
                first: 'Titus',
                last: 'Albucius'
            },
            email: 'titus@smp.com',
            active: true,
            language: 'fr_CA',
            password: 't1tusrul3s'
        },
        faetius: {
            name: {
                first: 'Flavius',
                last: 'Aetius'
            },
            email: 'flavius@smp.com',
            active: false,
            language: 'en_CA',
            password: 'flav1ussucks'
        }
    };

    return function() {
        return populateFixtures(fixtures.organizers, organizerService);
    };
};