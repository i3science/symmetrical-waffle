'use strict';

// Set up ES6/JSX support server-side
require('babel-register');

var init = require('./config/init')(),
    config = require('./config/config'),
    chalk = require('chalk'),
    Seeder = require('./seed/Seeder.js').default;

// Do not allow seeding of production unless in interactive mode
if (process.env.NODE_ENV === 'production' && !interactive) {
	console.log(chalk.red('Error: Seeding production non-interactively not allowed.'));
	process.exit(-1);
}

Seeder
    .seed()
    .then(function(){
        console.log('Seeding successful');
        process.exit(0);
    });