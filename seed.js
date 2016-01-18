'use strict';

// Set up ES6/JSX support server-side
require('babel-register');

var init = require('./config/init')(),
    config = require('./config/config'),
    db = require('./config/mongoose'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    influencerService = require('./src/js/server/services/InfluencerService.js').default,
    userService = require('./src/js/server/services/UserService.js').default,
    async = require('async'),
    chalk = require('chalk'),
    Q = require('q'),
    _ = require('lodash'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2));

// Do not allow seeding of production unless in interactive mode
if (process.env.NODE_ENV === 'production' && !interactive) {
	console.log('Error: Seeding production non-interactively not allowed.');
	process.exit(-1);
}

config.mail.disable = true;

var dropCollections = function(callback) {
	var collections = _.keys(mongoose.connection.collections);
	async.forEach(collections, function(collectionName, done) {
		var collection = mongoose.connection.collections[collectionName];
		console.log('Dropping ' + collectionName);
		collection.drop(function(err){
			if (err && err.message != 'ns not found') {
				done(err);
			}
			done(null);
		});
	}, function(){
        console.log('Dropped all collections');
        callback();
    });
};

var databaseName = config.db.uri.match(/[^\/]*$/)[0];
dropCollections(function(){
	var waiting = [];

	require('./seed/influencers.js').forEach(function(influencer){
		waiting.push(influencerService.create(influencer));
	});
    require('./seed/users.js').forEach(function(user){
        waiting.push(userService.create(user));
    });

	Q
		.all(waiting)
		.then(function(){
			console.log('Seeding completed');
			process.exit(0);
		})
		.fail(function(){
			console.log(chalk.red('An error occurred during seeding'));
			process.exit(-1);
		});

});