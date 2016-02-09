var mongoose = require('mongoose'),
    moment = require('moment'),
    List = mongoose.model('List'),
    listService = require('./../../src/js/server/services/ListService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.lists = {
        mommies: new List({
            organization: fixtures.organizations.jones,
            name: 'Mommies',
            influencers: [
                fixtures.influencers.ava,
                fixtures.influencers.shawna
            ]
        }),
        seniors: new List({
            organization: fixtures.organizations.jones,
            name: 'Seniors',
            influencers: [
                fixtures.influencers.ava,
                fixtures.influencers.jordan
            ]
        })
    };

    return function() {
        return populateFixtures(fixtures.lists, listService);
    }
};