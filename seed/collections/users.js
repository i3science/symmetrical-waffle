var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(fixtures) {
    fixtures.users = {
        admin: new User({
            name: {
                first: 'Administrative',
                last: 'User'
            },
            email: 'admin@smp.com',
            password: 'admin123',
            roles: ['admin']
        })
    };


    
    // organizers: {
    //     thamilton: {
    //         name: {
    //             first: 'Thomas',
    //             last: 'Hamilton'
    //         },
    //         email: 'thamilton@smp.com',
    //         roles: ['admin'],
    //         active: true,
    //         language: 'en_CA',
    //         passwordHash: '*admin123'
    //     },
    //     twilson: {
    //         name: {
    //             first: 'Thomas',
    //             last: 'Wilson'
    //         },
    //         email: 'thomas@thomaspwilson.com',
    //         roles: ['organizer'],
    //         active: true,
    //         language: 'fr_CA',
    //         passwordHash: '*organizer123'
    //     },
    //     dbois: {
    //         name: {
    //             first: 'Derek',
    //             last: 'Bois'
    //         },
    //         email: 'dbois@smp.com',
    //         roles: ['organizer'],
    //         active: false,
    //         language: 'en_CA',
    //         passwordHash: '*organizer456'
    //     }
    // },
};