var populateFixtures = require('../utils').populateFixtures,
    mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    organizationService = require('../../src/js/server/services/OrganizationService').default;

module.exports = function(fixtures) {
    fixtures.organizations = {
        jones: new Organization({
            name: 'Jones Media',
            hostnames: [{
                development: 'localhost',
                test: 'localhost',
                staging: '54.173.3.126'
            }[process.env.NODE_ENV]],
            defaultLanguage: 'en'
        }),
        reverb: new Organization({
            name: 'Reverb Consulting',
            hostnames: ['smp.reverbconsulting.com', '127.0.0.1'],
            defaultLanguage: 'fr_CA'
        })
    };

    return function() {
        return populateFixtures(fixtures.organizations, organizationService);
    };
};