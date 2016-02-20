var 
    config = require('./../config/config'),
    db = require('./../config/mongoose'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    domain = require('domain'),
    context = require('request-context'),
    async = require('async'),
    chalk = require('chalk'),
    glob = require('glob'),
    Q = require('q'),
    _ = require('lodash');

let log = console.log;
if (process.env.NODE_ENV === 'test') {
    log = () => {};
}

export function drop() {
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

let _populate = () => {
    log('Begin population');
    let waiting = [];
    let fixtures = {};
    let oldMailDisable = config.mail.disable;
    config.mail.disable = true;

    let promise = Q(true);
    [
        'users',
        'organizations',
        'organizers',
        'influencers',
        'clients',
        'projects',
        'campaign-elements',
        'lists',
        'assets',
        'reviews'
    ]
        .forEach((type) => {
            promise = promise
                .then(() => {
                    log('Populating '+type);
                    return require('./collections/'+type)(fixtures)();
                })
                .then((result) => {
                    log(' - success');
                    return true;
                });
        });

    return promise.then(() => {
            config.mail.disable = oldMailDisable;
            log('Population completed');
            return fixtures;
        })
        .fail((err) => {
            console.log(chalk.red('An error occurred during seeding'));
            log(err);
            throw err;
        });

}

export function populate() {
    function handleError(err) {
        console.log(err);
        console.error(err);
    }

    var d = domain.create();
    d.on('error', handleError);
    context.setContext('request', Object.create(null), d);
    return d.run(_populate);
}

export function seed() {
    return drop()
        .then(populate)
        .then(() => {
            log('Seeding completed');
        })
}