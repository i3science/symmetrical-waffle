var mongoose = require('mongoose'),
    Influencer = mongoose.model('Influencer');

module.exports = [
    //
    // Shawna O'Brien
    //
    new Influencer({
        _id: '567442a2fb6e1490001fbe5f',
        amplifier: true,
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
        verticals: [ 'beauty', 'fashion', 'parenting' ],
        audience: {
            sex: 'Female',
            language: 'English',
            age: {
            	start: 20,
            	end: 35
            },
            married: true,
            kids: [ 'Toddlers', 'Teens' ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Hamilton',
            residence: 'House',
            householdIncome: 80000,
            pets: [ 'Dog' ],
            ethnicity: 'Caucasion'
        },
        personal: {
            sex: 'Female',
            language: 'English',
            age: {
            	start: 20,
            	end: 35
            },
            married: true,
            kids: [ 8, 10, 13 ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'Condo',
            householdIncome: 100000,
            pets: [ 'Dog' ],
            ethnicity: 'Caucasion'
        }
	}),
    
    //
    // Derek Bois
    //
    new Influencer({
        _id: '567442a2fb6e1490001fbe70',
        amplifier: false,
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
        verticals: [ 'beauty', 'fashion', 'parenting', 'mechanics' ],
        audience: {
            sex: 'Male',
            language: 'English',
            age: {
                start: 20,
                end: 35
            },
            married: false,
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'House',
            householdIncome: 90000,
            ethnicity: 'Caucasion'
        },
        personal: {
            sex: 'Male',
            language: 'English',
            age: {
                start: 20,
                end: 35
            },
            married: false,
            kids: [ 10 ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'House',
            householdIncome: 90000,
            ethnicity: 'Caucasion'
        }
    }),

    //
    // Ava Greene
    //
    new Influencer({
        _id: '567442a2fb6e1490001fbe80',
        amplifier: true,
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
        verticals: [ 'beauty', 'fashion', 'parenting' ],
        audience: {
            sex: 'Female',
            language: 'English',
            age: {
                start: 20,
                end: 35
            },
            married: true,
            kids: [ 'Toddlers', 'Teens' ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Hamilton',
            residence: 'House',
            householdIncome: 80000,
            pets: [ 'Dog' ],
            ethnicity: 'Caucasion'
        },
        personal: {
            sex: 'Female',
            language: 'English',
            age: {
                start: 20,
                end: 35
            },
            married: true,
            kids: [ 8, 10, 13 ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'Condo',
            householdIncome: 100000,
            pets: [ 'Dog' ],
            ethnicity: 'Caucasion'
        }
    }),

    //
    // Jordan Stone
    //
    new Influencer({
        _id: '567442a2fb6e1490001fbe91',
        amplifier: false,
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
        verticals: [ 'beauty', 'fashion', 'parenting', 'mechanics' ],
        audience: {
            sex: 'Male',
            language: 'English',
            age: {
                start: 20,
                end: 25
            },
            married: true,
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'House',
            householdIncome: 90000,
            ethnicity: 'Caucasion'
        },
        personal: {
            sex: 'Male',
            language: 'English',
            age: {
                start: 20,
                end: 35
            },
            married: false,
            kids: [ 10 ],
            country: 'Canada',
            region: 'Ontario',
            city: 'Toronto',
            residence: 'House',
            householdIncome: 90000,
            ethnicity: 'Caucasion'
        }
    })
];