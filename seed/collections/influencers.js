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
            password: 'shawna123',
            score: 95,
            bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
            work: [
                {
                    name: 'Blog 1',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 2',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 3',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 4',
                    path: 'whoknows'
                }
            ],
            channels: {
                facebook: {
                    impressions: 673875,
                    link: 'http://facebook.com/'
                },
                twitter: {
                    impressions: 234765,
                    link: 'http://twitter.com/'
                },
                pinterest: {
                    impressions: 123500,
                    link: 'http://pinterest.com/'
                },
                instagram: {
                    impressions: 35480,
                    link: 'http://instagram.com/'
                },
                youtube: {
                    impressions: 4563345,
                    link: 'http://youtube.com/'
                },
                blog: {
                    impressions: 13215321,
                    link: 'http://blogger.com/'
                },
                googleplus: {
                    impressions: 7960,
                    link: 'http://google.com/'
                },
                snapchat: {
                    impressions: 0,
                    link: 'http://snapchat.com/'
                }
            },
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
                ethnicity: 'Caucasion',
                pets: 'Dog'
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
            vehicle: {
                year: '1999',
                make: 'Mazda',
                model: 'Miata'
            },
            mediums: ['Blogger', 'Vlogger', 'Amplifier'],
            availability: []
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
            password: 'derek123',
            score: 92,
            bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
            work: [
                {
                    name: 'Blog 1',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 2',
                    path: 'whoknows'
                }
            ],
            channels: {
                facebook: {
                    impressions: 673875,
                    link: 'http://facebook.com/'
                },
                twitter: {
                    impressions: 234765,
                    link: 'http://twitter.com/'
                },
                pinterest: {
                    impressions: 123500,
                    link: 'http://pinterest.com/'
                },
                instagram: {
                    impressions: 35480,
                    link: 'http://instagram.com/'
                },
                youtube: {
                    impressions: 4563345,
                    link: 'http://youtube.com/'
                },
                blog: {
                    impressions: 13215321,
                    link: 'http://blogger.com/'
                },
                googleplus: {
                    impressions: 7960,
                    link: 'http://google.com/'
                },
                snapchat: {
                    impressions: 0,
                    link: 'http://snapchat.com/'
                }
            },
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
                ethnicity: 'Caucasion',
                pets: ''
            },
            vehicle: {
                year: '2005',
                make: 'Chrysler',
                model: '300'
            },
            mediums: ['Blogger', 'Vlogger', 'Amplifier'],
            availability: [
                "02/10/2016",
                "02/11/2016",
                "02/12/2016",
                "02/18/2016",
                "02/19/2016"
            ]
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
            score: 94,
            bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
            work: [
                {
                    name: 'Blog 1',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 2',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 3',
                    path: 'whoknows'
                }
            ],
            channels: {
                facebook: {
                    impressions: 673875,
                    link: 'http://facebook.com/'
                },
                twitter: {
                    impressions: 234765,
                    link: 'http://twitter.com/'
                },
                pinterest: {
                    impressions: 123500,
                    link: 'http://pinterest.com/'
                },
                instagram: {
                    impressions: 35480,
                    link: 'http://instagram.com/'
                },
                youtube: {
                    impressions: 4563345,
                    link: 'http://youtube.com/'
                },
                blog: {
                    impressions: 13215321,
                    link: 'http://blogger.com/'
                },
                googleplus: {
                    impressions: 7960,
                    link: 'http://google.com/'
                },
                snapchat: {
                    impressions: 0,
                    link: 'http://snapchat.com/'
                }
            },
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
                ethnicity: 'Caucasion',
                pets: ''
            },
            vehicle: {
                year: '1998',
                make: 'Ferrari',
                model: 'Testarossa'
            },
            mediums: ['Blogger', 'Vlogger', 'Photo Blogger'],
            availability: [
                "02/10/2016",
                "02/11/2016",
                "02/12/2016",
                "02/18/2016",
                "02/19/2016",
                "02/22/2016",
                "02/23/2016",
                "02/24/2016"
            ]
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
            score: 29,
            bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
            work: [
                {
                    name: 'Blog 1',
                    path: 'whoknows'
                }
            ],
            channels: {
                facebook: {
                    impressions: 673875,
                    link: 'http://facebook.com/'
                },
                twitter: {
                    impressions: 234765,
                    link: 'http://twitter.com/'
                },
                pinterest: {
                    impressions: 123500,
                    link: 'http://pinterest.com/'
                },
                instagram: {
                    impressions: 35480,
                    link: 'http://instagram.com/'
                },
                youtube: {
                    impressions: 4563345,
                    link: 'http://youtube.com/'
                },
                blog: {
                    impressions: 13215321,
                    link: 'http://blogger.com/'
                },
                googleplus: {
                    impressions: 7960,
                    link: 'http://google.com/'
                },
                snapchat: {
                    impressions: 0,
                    link: 'http://snapchat.com/'
                }
            },
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
                ethnicity: 'Caucasion',
                pets: 'Alligator, Rat, Opossum'
            },
            vehicle: {
                year: '2016',
                make: 'Toyota',
                model: 'Tercel'
            },
            mediums: ['Blogger', 'Photo Blogger', 'Amplifier'],
            availability: [
                "02/10/2016",
                "02/11/2016",
                "02/12/2016",
                "02/18/2016",
                "02/19/2016"
            ]
        }),

        //
        // Cornelius Elias
        //
        cornelius: new Influencer({
            amplifier: false,
            hasImage: false,
            name: {
                first: 'Cornelius',
                last: 'Elias'
            },
            email: 'celias@example.com',
            score: 100,
            bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
            work: [
                {
                    name: 'Blog 1',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 2',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 3',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 4',
                    path: 'whoknows'
                },
                {
                    name: 'Blog 5',
                    path: 'whoknows'
                }
            ],
            channels: {
                facebook: {
                    impressions: 673875,
                    link: 'http://facebook.com/'
                },
                twitter: {
                    impressions: 234765,
                    link: 'http://twitter.com/'
                },
                pinterest: {
                    impressions: 123500,
                    link: 'http://pinterest.com/'
                },
                instagram: {
                    impressions: 35480,
                    link: 'http://instagram.com/'
                },
                youtube: {
                    impressions: 4563345,
                    link: 'http://youtube.com/'
                },
                blog: {
                    impressions: 13215321,
                    link: 'http://blogger.com/'
                },
                googleplus: {
                    impressions: 7960,
                    link: 'http://google.com/'
                },
                snapchat: {
                    impressions: 0,
                    link: 'http://snapchat.com/'
                }
            },
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
            verticals: ['Art & Culture', 'Fitness'],
            audience: {
                male: 90,
                female: 10,
                language: 'Norwegian',
                ageFrom: 18,
                ageTo: 35,
                married: true,
                country: 'Norway',
                state: 'Svalbard',
                city: 'Longyearbyen',
                residence: 'House',
                householdIncome: 50000,
                ethnicity: 'Caucasian'
            },
            personal: {
                sex: 'Male',
                language: 'Norwegian',
                age: 28,
                married: 'Yes',
                kids: [],
                country: 'Norway',
                state: 'Svalbard',
                city: 'Longyearbyen',
                residence: 'House',
                householdIncome: 50000,
                ethnicity: 'Caucasian',
                pets: 'Dog, Cat, Fish'
            },
            vehicle: {
                year: '1972',
                make: 'Monte Carlo',
                model: 'SS'
            },
            mediums: ['Blogger', 'Photo Blogger', 'Amplifier'],
            availability: [
                "02/10/2016",
                "02/11/2016",
                "02/12/2016",
                "02/18/2016",
                "02/19/2016",
                "02/22/2016",
                "02/23/2016",
                "02/24/2016"
            ]
        })
    };

    return function() {
        return populateFixtures(fixtures.influencers, influencerService);
    }
};