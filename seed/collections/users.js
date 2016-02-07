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
};