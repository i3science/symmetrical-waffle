var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(fixtures) {
    fixtures.organizers = {
        laelius: {
            name: {
                first: 'Lucius',
                last: 'Aelius'
            },
            email: 'lucius@smp.com',
            roles: ['organizer'],
            active: true,
            language: 'en_CA',
            password: 'luc1usis4w3s0m3'
        },
        talbucius: {
            name: {
                first: 'Titus',
                last: 'Albucius'
            },
            email: 'titus@smp.com',
            roles: ['organizer'],
            active: true,
            language: 'fr_CA',
            passwordHash: 't1tusrul3s'
        },
        faetius: {
            name: {
                first: 'Flavius',
                last: 'Aetius'
            },
            email: 'flavius@smp.com',
            roles: ['organizer'],
            active: false,
            language: 'en_CA',
            passwordHash: 'flav1ussucks'
        }
    };
};