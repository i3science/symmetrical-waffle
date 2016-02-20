var mongoose = require('mongoose'),
    moment = require('moment'),
    Project = mongoose.model('Project'),
    projectService = require('./../../src/js/server/services/ProjectService.js').default,
    populateFixtures = require('../utils').populateFixtures;

module.exports = function(fixtures) {
    fixtures.projects = {
        // Pending
        ford_christmas: new Project({
            organization: fixtures.organizations.jones,
            client: fixtures.clients.ford,
            name: 'Ford Christmas Special',
            brief: 'Ford is looking for 8 bloggers to create content to promote their Christmas special.',
            projectType: 'blogger',
            goals: {
                engagement: false,
                reach: true,
                general: false
            },
            required_influencers: {
                bloggers: 2
            },
            required_impressions: 2000000,
            budget: 10000,
            project_start: moment().add(1, 'days'),
            project_live: moment().add(7, 'days'),
            project_end: moment().add(21, 'days'),
            checkpoints_start: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_live: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_end: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            influencers: [{
                influencer: fixtures.influencers.shawna,
                client_approved: null,
                influencer_approved: true
            }],
            lists: [],
            approved: false,
            approved_date: moment().add(5, 'days'),
            active: true
        }),
        // Active
        pepsi_thanksgiving: new Project({
            organization: fixtures.organizations.jones,
            client: fixtures.clients.ford,
            name: 'Pepsi Thanksgiving',
            brief: 'Ford is looking for 27 bloggers to create content to promote their Thanksgiving special.',
            projectType: 'blogger',
            goals: {
                engagement: false,
                reach: true,
                general: true
            },
            required_influencers: {
                bloggers: 7
            },
            required_impressions: 14000000,
            budget: 70000,
            project_start: moment().add(2, 'days'),
            project_live: moment().add(5, 'days'),
            project_end: moment().add(19, 'days'),
            checkpoints_start: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_live: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_end: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            influencers: [{
                influencer: fixtures.influencers.derek,
                client_approved: true,
                influencer_approved: true
            }],
            lists: [],
            approved: true,
            approved_date: moment().subtract(3, 'days'),
            active: true
        }),
        // In-market
        crest_easter: new Project({
            organization: fixtures.organizations.jones,
            client: fixtures.clients.crest,
            name: 'Crest Easter Campaign',
            brief: 'Crest is looking for 5 bloggers to promote their brand around Easter',
            projectType: 'vlogger',
            goals: {
                engagement: true,
                reach: true,
                general: true
            },
            required_influencers: {
                vloggers: 1
            },
            required_impressions: 1250000,
            budget: 7500,
            project_start: moment().subtract(2, 'days'),
            project_live: moment().subtract(1, 'day'),
            project_end: moment().add(13, 'days'),
            checkpoints_start: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_live: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_end: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            influencers: [{
                influencer: fixtures.influencers.derek,
                client_approved: true,
                influencer_approved: true
            }],
            lists: [],
            approved: true,
            approved_date: moment().subtract(14, 'days'),
            active: true
        }),
        // Closed
        green_giant: new Project({
            organization: fixtures.organizations.jones,
            client: fixtures.clients.green_giant,
            name: 'Green Giant Beans',
            brief: 'Green Giant is looking for 182 individuals to engage the public with an uplifting message about beans.',
            projectType: 'photo_blogger',
            goals: {
                engagement: true,
                reach: true,
                general: true
            },
            required_influencers: {
                photo_bloggers: 70
            },
            required_impressions: 50000000,
            budget: 500000,
            project_start: moment().subtract(100, 'days'),
            project_live: moment().subtract(42, 'days'),
            project_end: moment().subtract(11, 'days'),
            checkpoints_start: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_live: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            checkpoints_end: [
                {
                    name: 'Checkpoint #1',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #2',
                    date: '11/11/1111'
                },
                {
                    name: 'Checkpoint #3',
                    date: '11/11/1111'
                }
            ],
            influencers: [{
                influencer: fixtures.influencers.derek,
                client_approved: true,
                influencer_approved: false
            }],
            lists: [],
            approved: true,
            approved_date: moment().subtract(53, 'days'),
            active: true
        })
    };

    return function() {
        return populateFixtures(fixtures.projects, projectService);
    }
};