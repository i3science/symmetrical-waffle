var 
    config = require('./../config/config'),
    db = require('./../config/mongoose'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    influencerService = require('./../src/js/server/services/InfluencerService.js').default,
    userService = require('./../src/js/server/services/UserService.js').default,
    organizationService = require('./../src/js/server/services/OrganizationService.js').default,
    async = require('async'),
    chalk = require('chalk'),
    glob = require('glob'),
    Q = require('q'),
    _ = require('lodash');

class Seeder {

    static drop(next) {
        let waiting = [];
        let collections = _.keys(mongoose.connection.collections);
        collections.forEach((collectionName) => {
            waiting.push(Q.Promise((resolve, reject, notify) => {
                let collection = mongoose.connection.collections[collectionName];
                console.log('Dropping ' + collectionName);
                collection.drop((err) => {
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
            .then(() => {
                console.log('Dropped all collections');
                return true;
            })
            .fail((err) => {
                console.log(chalk.red('An error occurred while dropping collections'));
                throw err;
            });
    }

    static populate() {
        console.log('Begin population');
        let waiting = [];
        let oldMailDisable = config.mail.disable;
        config.mail.disable = true;

        let fixtures = {};
        require('./collections/organizations')(fixtures);
        require('./collections/users')(fixtures);
        require('./collections/influencers')(fixtures);

        let populateCollection = (fixtures, service) => {
            let waiting = [];
            Object.keys(fixtures).forEach((key) => {
                waiting.push(service
                    .create(fixtures[key])
                    .then((result) => {
                        fixtures[key] = result;
                        return result;
                    }));
            });
            return Q
                .all(waiting);
        }

        return populateCollection(fixtures.organizations, organizationService)
            .then(() => {
                return populateCollection(fixtures.users, userService);
            })
            .then(() => {
                return populateCollection(fixtures.influencers, influencerService);
            })
            .then(() => {
                config.mail.disable = oldMailDisable;
                console.log('Population completed');
                return true;
            })
            .fail((err) => {
                console.log(chalk.red('An error occurred during seeding'));
                throw err;
            });

    }

    static seed() {
        return Seeder
            .drop()
            .then(() => {
                return Seeder.populate();
            });
    }
};

export default Seeder;