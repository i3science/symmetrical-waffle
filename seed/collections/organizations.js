var populateFixtures = require('../utils').populateFixtures,
    mongoose = require('mongoose'),
    context = require('request-local'),
    Organization = mongoose.model('Organization'),
    organizationService = require('../../src/js/server/services/OrganizationService').default;

module.exports = function(fixtures) {
    fixtures.organizations = {
        jones: new Organization({
            name: 'Jones Media',
            hostnames: [{
                development: 'localhost',
                test: 'localhost',
                staging: 'staging.socialmarketplace.io',
                production: 'jones.socialmarketplace.io'
            }[process.env.NODE_ENV]],
            defaultLanguage: 'en'
        }),
        reverb: new Organization({
            name: 'Reverb Consulting',
            hostnames: [{
                development: '127.0.0.1',
                test: '127.0.0.1',
                staging: 'reverb.socialmarketplace.io',
                production: 'reverb.socialmarketplace.io'
            }[process.env.NODE_ENV]],
            defaultLanguage: 'fr_CA'
        })
    };

    return function() {
        return populateFixtures(fixtures.organizations, organizationService)
            .then(() => {
                context.currentOrganization = fixtures.organizations.jones;
                return true;
            });
    };
};