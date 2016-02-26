var mongoose = require('mongoose'),
    moment = require('moment'),
    CampaignElement = mongoose.model('CampaignElement'),
    campaignElementService = require('./../../src/js/server/services/CampaignElementService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.campaign_elements = {
        pepsi_thanksgiving_derek_blog: new CampaignElement({
            project: fixtures.projects.pepsi_thanksgiving,
            assignee: fixtures.influencers.derek,
            reports: {
                half: [],
                end: []
            },
            approved: false,
            name: 'Derek\'s Blog',
            type: 'blog'
        }),
        crest_easter_derek_vlog: new CampaignElement({
            project: fixtures.projects.crest_easter,
            assignee: fixtures.influencers.derek,
            reports: {
                half: [],
                end: []
            },
            approved: false,
            name: 'Derek\'s Vlog',
            type: 'vlog'
        }),
        green_giant_derek_photo_blog: new CampaignElement({
            project: fixtures.projects.green_giant,
            assignee: fixtures.influencers.derek,
            reports: {
                half: [],
                end: []
            },
            approved: false,
            name: 'Derek\'s Photo Blog',
            type: 'photo'
        })
    };

    return function() {
        return populateFixtures(fixtures.campaign_elements, campaignElementService);
    }
};