var mongoose = require('mongoose'),
    moment = require('moment'),
    List = mongoose.model('List');

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
    }
};