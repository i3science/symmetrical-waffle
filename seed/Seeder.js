var 
    config = require('./../config/config'),
    db = require('./../config/mongoose'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    influencerService = require('./../src/js/server/services/InfluencerService.js').default,
    userService = require('./../src/js/server/services/UserService.js').default,
    async = require('async'),
    chalk = require('chalk'),
    Q = require('q'),
    _ = require('lodash');

class Seeder {

    static drop(next) {
        let waiting = [];
        let collections = _.keys(mongoose.connection.collections);
        collections.forEach(function(collectionName){
            waiting.push(Q.Promise(function(resolve, reject, notify){
                let collection = mongoose.connection.collections[collectionName];
                console.log('Dropping ' + collectionName);
                collection.drop(function(err){
                    if (err && err.message != 'ns not found') {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            }));
        });
        return Q
            .all(waiting)
            .then(function(){
                console.log('Dropped all collections');
                return true;
            })
            .fail(function(err){
                console.log(chalk.red('An error occurred while dropping collections'));
                throw err;
            });
    }

    static populate() {
        let waiting = [];
        let oldMailDisable = config.mail.disable;
        config.mail.disable = true;

        require('./collections/influencers.js').forEach(function(influencer){
            waiting.push(influencerService.create(influencer));
        });
        require('./collections/users.js').forEach(function(user){
            waiting.push(userService.create(user));
        });

        return Q
            .all(waiting)
            .then(function(){
                config.mail.disable = oldMailDisable;
                console.log('Population completed');
                return true;
            })
            .fail(function(err){
                console.log(chalk.red('An error occurred during seeding'));
                throw err;
            });

    }

    static seed() {
        return Seeder
            .drop()
            .then(function(){
                return Seeder.populate();
            });
    }
};

export default Seeder;