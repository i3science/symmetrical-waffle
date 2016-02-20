var mongoose = require('mongoose'),
    moment = require('moment'),
    Review = mongoose.model('Review'),
    reviewService = require('./../../src/js/server/services/ReviewService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.reviews = {
        derek1: new Review({
            organization: fixtures.organizations.jones,
            influencer: fixtures.influencers.derek,
            rating: 4,
            review: 'Derek doesn\'t suck as much as he initially led on. We were quite impressed with his ability to un-suck, especially since we only gave him three months to get his work done from start to finish!',
            project: fixtures.projects.green_giant
        })
    };

    return function() {
        return populateFixtures(fixtures.reviews, reviewService);
    }
};