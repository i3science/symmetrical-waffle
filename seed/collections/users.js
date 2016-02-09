var mongoose = require('mongoose'),
    Q = require('q'),
    User = mongoose.model('User'),
    context = require('request-context');

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

    return function() {
        // Population of the initial user requires that we bypass Mongoose's
        // validation procedures
        var deferred = Q.defer();
        User.collection.insert(fixtures.users.admin.toObject(), function(err, doc){
            if (err) {
                deferred.reject(err);
            } else {
                User
                    .findOne({ _id: doc.insertedIds.shift() }, function(err, user){
                        context.set('request:currentUser', user);
                        deferred.resolve(user);
                    })
            }
        });
        return deferred.promise;
    };
};