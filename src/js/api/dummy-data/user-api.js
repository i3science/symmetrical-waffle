var influencers = require('./user-data').influencers;
var _ = require('lodash');

var _generateId = function(influencer) {
    return (influencer.name.first + '-' + influencer.name.last).toLowerCase();
};

var _clone = function(item) {
    return JSON.parse(JSON.stringify(item));
};

var InfluencerApi = {
    getAllInfluencers: function() {
        return _clone(influencers);
    },

    getInfluencerById: function(id) {
        var influencer = _.find(influencers, {id: id});
        return _clone(influencer);
    },

    saveInfluencer: function(influencer) {
        console.log('Imagine saving influencer via AJAX call...');

        if (influencer.id) {
            var existingInfluencerIndex = _.indexOf(influencers, _.find(influencers, {id: influencer.id}));
            influencers.splice(existingInfluencerIndex, 1, influencer);
        } else {
            influencer.id = _generateId(influencer);
            influencers.push(_clone(influencer));
        }
        return influencer;
    },

    deleteInfluencer: function(id) {
        console.log('Imagine deleting influencer with id of ' + id + ' via AJAX call...');
        _.remove(influencers, { id: id});
    }
};

module.exports = InfluencerApi;