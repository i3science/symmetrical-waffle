import Q from 'q';
import _ from 'lodash';
import chalk from 'chalk';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import config from '../../../config/config';
import InfluencerService from '../../../src/js/server/services/InfluencerService';
import UserService from '../../../src/js/server/services/UserService';

chai.use(chaiAsPromised);

export var fixtures = {
    organizations: {
        jones: {
            name: 'Jones Media',
            hostnames: ['jones'],
            defaultLanguage: 'en_CA',
            settings: {}
        },
        reverb: {
            name: 'Reverb Consulting',
            hostnames: ['reverb'],
            defaultLanguage: 'fr_CA',
            settings: {}
        }
    },
    organizers: {
        thamilton: {
            name: {
                first: 'Thomas',
                last: 'Hamilton'
            },
            email: 'thamilton@smp.com',
            roles: ['admin'],
            active: true,
            language: 'en_CA',
            passwordHash: '*admin123'
        },
        twilson: {
            name: {
                first: 'Thomas',
                last: 'Wilson'
            },
            email: 'thomas@thomaspwilson.com',
            roles: ['organizer'],
            active: true,
            language: 'fr_CA',
            passwordHash: '*organizer123'
        },
        dbois: {
            name: {
                first: 'Derek',
                last: 'Bois'
            },
            email: 'dbois@smp.com',
            roles: ['organizer'],
            active: false,
            language: 'en_CA',
            passwordHash: '*organizer456'
        }
    },
    influencers: {
        kwilson: {
            name: {
                first: 'Kara-Joy',
                last: 'Wilson'
            },
            email: 'kwilson@smp.com',
            roles: ['influencer'],
            active: true,
            language: 'en_CA',
            passwordHash: '*influencer123'
        },
        ohamilton: {
            name: {
                first: 'Olivia',
                last: 'Hamilton'
            },
            email: 'ohamilton@smp.com',
            roles: ['influencer'],
            active: false,
            language: 'fr_CA',
            passwordHash: '*influencer456'
        },
        sobrien: {
            name: {
                first: 'Shawna',
                last: 'O\'Brien'
            },
            email: 'sobrien@smp.com',
            roles: ['influencer'],
            active: true,
            language: 'en_CA',
            passwordHash: '*influencer789'
        }
    },
    clients: {
        mgluhorn: {
            name: {
                first: 'Michelle',
                last: 'Gluhorn'
            },
            email: 'mgluhorn@smp.com',
            roles: ['client'],
            active: true,
            language: 'en_CA'
        },
        sreese: {
            name: {
                first: 'Sarah',
                last: 'Reese'
            },
            email: 'sreese@smp.com',
            roles: ['client'],
            active: false,
            language: 'fr_CA'
        }
    },
    projects: {}
};

export function clean() {
    let waiting = [];
    let collections = _.keys(mongoose.connection.collections);
    collections.forEach(function(collectionName){
        waiting.push(Q.Promise(function(resolve, reject, notify){
            let collection = mongoose.connection.collections[collectionName];
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
            return true;
        })
        .fail(function(err){
            console.log(chalk.red('An error occurred while dropping collections'));
            throw err;
        });
}

export function setup() {
    let waiting = [];
    let oldMailDisable = config.mail.disable;
    config.mail.disable = true;

    Object.keys(fixtures.organizers).forEach(function(org){
        waiting.push(UserService
            .create(fixtures.organizers[org])
            .spread(function(o){
                fixtures.organizers[org] = o;
                return true;
            }));
    });

    Object.keys(fixtures.influencers).forEach(function(inf){
        waiting.push(InfluencerService
            .create(fixtures.influencers[inf])
            .spread(function(i){
                fixtures.influencers[inf] = i;
            }));
    });

    return Q.all(waiting)
        .then(function(){
            config.mail.disable = oldMailDisable;
            return true;
        });
};

export function doAs(agent, user, done, next) {
    if (typeof user === 'string') {
        user = _.find(_.extend({}, fixtures.organizers, fixtures.influencers), {roles:user});
    } else if (typeof user !== 'object') {
        console.log(chalk.red('User of type '+(typeof user)+' not supported. Supply a string or object'));
    }

    agent.post('/auth/signin')
        .type('form')
        .send({ email: user.email, password: user.passwordHash })
        .expect(200)
        .end(function(err, res){
            if (err) {
                return doneWithErrors(done, err, res);
            }

            next();
        });
};

export function doneWithErrors(done, err, res) {
    console.log(err, (res && res.body) ? res.body : '');

    var response = err;
    if (err instanceof Error) {
        response = err;
    } else if (err && res && res.body) {
        response = err + ' ' + JSON.stringify(res.body, null, 2);
    } else if (err && err.message) {
        response = JSON.stringify(err, null, 2);
    }

    return done(response);
};