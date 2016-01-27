var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization');

module.exports = function(fixtures) {
    fixtures.organizations = {
        jones: new Organization({
            name: 'Jones Media',
            hostnames: 'jones',
            defaultLanguage: 'en'
        })
    };
};