var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = [
    //
    // Admin user
    //
    new User({
        name: {
            first: 'Thomas',
            last: 'Wilson'
        },
        email: 'admin@smp.com',
        password: 'admin123',
        roles: ['admin']
    })
];