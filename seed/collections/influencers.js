var populateFixtures = require('../utils').populateFixtures,
    mongoose = require('mongoose'),
    Influencer = mongoose.model('Influencer'),
    influencerService = require('../../src/js/server/services/InfluencerService').default;

module.exports = function(fixtures) {
    fixtures.influencers = {
        //
        // Shawna O'Brien
        //
        shawna: new Influencer({
            _id: '567442a2fb6e1490001fbe5f',
            amplifier: true,
            hasImage: true,
            name: {
                first: 'Shawna',
                last: 'O\'Brien'
            },
            email: 'sob@something.com',
            reach: [{
                medium: 'facebook',
                value: 673875
            }, {
                medium: 'twitter',
                value: 234765
            }, {
                medium: 'pinterest',
                value: 123500
            }, {
                medium: 'instagram',
                value: 35480
            }, {
                medium: 'youtube',
                value: 4563345
            }, {
                medium: 'blog',
                value: 13215321
            }, {
                medium: 'googleplus',
                value: 7960
            }],
            mediaKit: [{
                name: 'Creator - Vlog',
                price: 20000
            }, {
                name: 'Creator - Blog',
                price: 5000
            }, {
                name: 'Blog Post',
                price: 2000
            }, {
                name: 'Instagram Post',
                price: 500
            }, {
                name: 'Twitter Post',
                price: 500
            }, {
                name: 'Facebook Post',
                price: 500
            }, {
                name: 'Pinterest Post',
                price: 500
            }, {
                name: 'Social Amplification Post',
                price: 500
            }, {
                name: 'Something with no value',
                price: ''
            }],
            verticals: ['Beauty', 'Fashion', 'Parenting', 'Fitness'],
            audience: {
                male: 60,
                female: 40,
                language: 'English',
                ageFrom: 10,
                ageTo: 40,
                married: true,
                kids: [ 'Toddlers', 'Teens' ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Hamilton',
                residence: 'House',
                householdIncome: 80000,
                pets: [ 'Dog' ],
                ethnicity: 'Caucasion'
            },
            personal: {
                sex: 'Female',
                language: 'English',
                age: 30,
                married: 'Yes',
                kids: [ 8, 10, 13 ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'Condo',
                householdIncome: 100000,
                pets: [ 'Dog' ],
                ethnicity: 'Caucasion'
            },
            mediums: ['Blogger', 'Vlogger', 'Amplifier']
        }),

        //
        // Derek Bois
        //
        derek: new Influencer({
            _id: '567442a2fb6e1490001fbe70',
            amplifier: false,
            hasImage: true,
            name: {
                first: 'Derek',
                last: 'Bois'
            },
            email: 'derekb@awesome.com',
            reach: [{
                medium: 'facebook',
                value: 12673875
            }, {
                medium: 'twitter',
                value: 1234765
            }, {
                medium: 'pinterest',
                value: 123500
            }, {
                medium: 'instagram',
                value: 315480
            }, {
                medium: 'youtube',
                value: 4563345
            }, {
                medium: 'blog',
                value: 13215321
            }, {
                medium: 'googleplus',
                value: 7960
            }],
            mediaKit: [{
                name: 'Creator - Vlog',
                price: 20000
            }, {
                name: 'Creator - Blog',
                price: 5000
            }, {
                name: 'Blog Post',
                price: 2000
            }, {
                name: 'Instagram Post',
                price: 500
            }, {
                name: 'Twitter Post',
                price: 500
            }, {
                name: 'Facebook Post',
                price: 500
            }, {
                name: 'Pinterest Post',
                price: 500
            }, {
                name: 'Social Amplification Post',
                price: 500
            }],
            verticals: ['Beauty', 'Fashion', 'Parenting', 'Art & Culture'],
            audience: {
                male: 60,
                female: 40,
                language: 'English',
                ageFrom: 10,
                ageTo: 40,
                married: false,
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'House',
                householdIncome: 90000,
                ethnicity: 'Caucasion'
            },
            personal: {
                sex: 'Male',
                language: 'English',
                age: 20,
                married: 'Common Law',
                kids: [ 10 ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'House',
                householdIncome: 90000,
                ethnicity: 'Caucasion'
            },
            mediums: ['Blogger', 'Vlogger', 'Amplifier']
        }),

        //
        // Ava Greene
        //
        ava: new Influencer({
            _id: '567442a2fb6e1490001fbe80',
            amplifier: true,
            hasImage: true,
            name: {
                first: 'Ava',
                last: 'Greene'
            },
            email: 'ava@example.com',
            reach: [{
                medium: 'facebook',
                value: 654635
            }, {
                medium: 'twitter',
                value: 76545
            }, {
                medium: 'pinterest',
                value: 9888
            }, {
                medium: 'instagram',
                value: 76856
            }, {
                medium: 'youtube',
                value: 987788
            }, {
                medium: 'blog',
                value: 13276321
            }, {
                medium: 'googleplus',
                value: 8888
            }],
            mediaKit: [{
                name: 'Creator - Vlog',
                price: 20000
            }, {
                name: 'Creator - Blog',
                price: 5000
            }, {
                name: 'Blog Post',
                price: 2000
            }, {
                name: 'Instagram Post',
                price: 500
            }, {
                name: 'Twitter Post',
                price: 500
            }, {
                name: 'Facebook Post',
                price: 500
            }, {
                name: 'Pinterest Post',
                price: 500
            }, {
                name: 'Social Amplification Post',
                price: 500
            }, {
                name: 'Something with no value',
                price: ''
            }],
            verticals: ['Beauty', 'Fashion', 'Parenting'],
            audience: {
                male: 60,
                female: 40,
                language: 'English',
                ageFrom: 10,
                ageTo: 40,
                married: true,
                kids: [ 'Toddlers', 'Teens' ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Hamilton',
                residence: 'House',
                householdIncome: 80000,
                pets: [ 'Dog' ],
                ethnicity: 'Caucasion'
            },
            personal: {
                sex: 'Female',
                language: 'English',
                age: 60,
                married: 'Yes',
                kids: [ 8, 10, 13 ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'Condo',
                householdIncome: 100000,
                pets: [ 'Dog' ],
                ethnicity: 'Caucasion'
            },
            mediums: ['Blogger', 'Vlogger', 'Photo Blogger']
        }),

        //
        // Jordan Stone
        //
        jordan: new Influencer({
            _id: '567442a2fb6e1490001fbe91',
            amplifier: false,
            hasImage: true,
            name: {
                first: 'Jordan',
                last: 'Stone'
            },
            email: 'jordan@example.com',
            reach: [{
                medium: 'facebook',
                value: 573875
            }, {
                medium: 'twitter',
                value: 534765
            }, {
                medium: 'pinterest',
                value: 23500
            }, {
                medium: 'instagram',
                value: 95480
            }, {
                medium: 'youtube',
                value: 563345
            }, {
                medium: 'blog',
                value: 3215321
            }, {
                medium: 'googleplus',
                value: 97960
            }],
            mediaKit: [{
                name: 'Creator - Vlog',
                price: 20000
            }, {
                name: 'Creator - Blog',
                price: 5000
            }, {
                name: 'Blog Post',
                price: 2000
            }, {
                name: 'Instagram Post',
                price: 500
            }, {
                name: 'Twitter Post',
                price: 500
            }, {
                name: 'Facebook Post',
                price: 500
            }, {
                name: 'Pinterest Post',
                price: 500
            }, {
                name: 'Social Amplification Post',
                price: 500
            }],
            verticals: ['Beauty', 'Fashion', 'Parenting', 'Art & Culture'],
            audience: {
                male: 60,
                female: 40,
                language: 'English',
                ageFrom: 10,
                ageTo: 40,
                married: true,
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'House',
                householdIncome: 90000,
                ethnicity: 'Caucasion'
            },
            personal: {
                sex: 'Male',
                language: 'English',
                age: 80,
                married: 'No',
                kids: [ 10 ],
                country: 'Canada',
                state: 'Ontario',
                city: 'Toronto',
                residence: 'House',
                householdIncome: 90000,
                ethnicity: 'Caucasion'
            },
            mediums: ['Blogger', 'Photo Blogger', 'Amplifier']
        })
    };

    return function() {
        return populateFixtures(fixtures.influencers, influencerService);
    }
};