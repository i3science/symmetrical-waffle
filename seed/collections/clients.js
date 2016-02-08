var mongoose = require('mongoose'),
    Client = mongoose.model('Client');

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
};