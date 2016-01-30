var 
    config = require('./../config/config'),
    db = require('./../config/mongoose'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    organizationService = require('./../src/js/server/services/OrganizationService.js').default,
    userService = require('./../src/js/server/services/UserService.js').default,
    influencerService = require('./../src/js/server/services/InfluencerService.js').default,
    projectService = require('./../src/js/server/services/ProjectService.js').default,
    async = require('async'),
    chalk = require('chalk'),
    glob = require('glob'),
    Q = require('q'),
    _ = require('lodash');

let log = console.log;
if (process.env.NODE_ENV === 'test') {
    log = () => {};
}

class Seeder {

    static drop() {
        let waiting = [];
        let collections = _.keys(mongoose.connection.collections);
        collections.forEach((collectionName) => {
            waiting.push(Q.Promise((resolve, reject, notify) => {
                let collection = mongoose.connection.collections[collectionName];
                log('Dropping ' + collectionName);
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
                log('Dropped all collections');
                return true;
            })
            .fail((err) => {
                console.log(chalk.red('An error occurred while dropping collections'));
                throw err;
            });
    }

    static populate(fixtures) {
        log('Begin population');
        let waiting = [];
        let oldMailDisable = config.mail.disable;
        config.mail.disable = true;

        if (typeof fixtures === 'undefined') {
            fixtures = {};
            require('./collections/organizations')(fixtures);
            require('./collections/users')(fixtures);
            require('./collections/influencers')(fixtures);
            require('./collections/projects')(fixtures);
            log('Fixtures loaded');
        } else {
            log('Fixtures supplied');
        }

        let populateCollection = (fixtures, service) => {
            let waiting = [];
            Object.keys(fixtures || []).forEach((key) => {
                waiting.push(service
                    .create(fixtures[key])
                    .spread((result) => {
                        fixtures[key] = result;
                        return result;
                    })
                    .fail((err) => {
                        console.log(chalk.red('An error occurred during seeding'));
                        throw err;
                    }));
            });
            return Q
                .all(waiting)
                .fail((err) => {
                    console.log(chalk.red('An error occurred during seeding'));
                    throw err;
                });
        }

        return populateCollection(fixtures.organizations, organizationService)
            .then(() => {
                return populateCollection(fixtures.users, userService);
            })
            .then(() => {
                return populateCollection(fixtures.influencers, influencerService);
            })
            .then(() => {
                return populateCollection(fixtures.projects, projectService);
            })
            .then(() => {
                config.mail.disable = oldMailDisable;
                log('Population completed');
                return fixtures;
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