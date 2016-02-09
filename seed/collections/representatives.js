var mongoose = require('mongoose'),
    Representative = mongoose.model('Representative');

module.exports = function(fixtures) {
    fixtures.representatives = {
        mgluhorn: new Representative({
            name: {
                first: 'Michelle',
                last: 'Gluhorn'
            },
            email: 'mgluhorn@smp.com',
            active: true,
            language: 'en_CA'
        }),
        sreese: new Representative({
            name: {
                first: 'Sarah',
                last: 'Reese'
            },
            email: 'sreese@smp.com',
            active: false,
            language: 'fr_CA'
        })
    };
};