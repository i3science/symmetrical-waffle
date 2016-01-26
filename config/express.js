import React from 'react';
import { renderToString } from 'react-dom/server';
import { createRoutes, match, RoutingContext, RouterContext } from 'react-router';
import Routes from '../src/js/client/components/routes';
import a from '../src/js/client/components/app';
import createLocation from 'history/lib/createLocation';


'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    compression = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    config = require('./config'),
    consolidate = require('consolidate'),
    path = require('path'),
    mongoose = require('mongoose'),
    i18next = require('i18next'),
    backend = require('i18next-sync-fs-backend'),
    middleware = require('i18next-express-middleware'),
    _ = require('lodash');

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init(config.i18n);

module.exports = function(db) {
    // Initialize express app
    var app = express();

    // Setting the app router and static folder
    app.use('/assets', express.static(path.resolve('./src/public')));
    app.use('/assets', express.static(path.resolve('./dist')));

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.facebookAppId = config.facebook && config.facebook.clientID;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        req.basePath = req.protocol + '://' + req.headers.host;
        next();
    });

    // Set up i18n
    app.use(middleware.handle(i18next));
    app.use(function(req, res, next){
        req.translations = {};

        // Add translation resources when they're loaded, for isomorphic render
        i18next.on('loaded', function(loaded){
            // The key given is the language that is loaded, but doesn't always
            // correspond with the name of the file that was loaded
            Object.keys(loaded).forEach(function(key){
                // One or more namespaces may be loaded
                loaded[key].forEach(function(ns){
                    // As the language that is loaded doesn't necessarily
                    // correspond with the filename, we'll just troll through
                    // all possible file names
                    req.languages.forEach(function(lang){
                        var translation = i18next.getResourceBundle(lang, ns);
                        if (typeof translation !== 'undefined') {
                            var tmp = {};
                            tmp[lang] = {};
                            tmp[lang][ns] = translation;
                            req.translations = _.extend(
                                req.translations,
                                tmp
                            );
                        }
                    })
                });
            });
        });
        next();
    });

    // Should be placed before express.static
    app.use(compression({
        // only compress files for the following content types
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // zlib option for compression level
        level: 3
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // Set the template engine
    app.engine('swig', consolidate[config.templateEngine]);
    app.set('view engine', 'swig');
    app.set('views', './src/public');

    // Enable logger (morgan)
    app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(methodOverride());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // CookieParser should be above session
    app.use(cookieParser());

    // Express MongoDB session storage
    app.use(session({
        name: config.session.name,
        saveUninitialized: false,
        resave: false,
        secret: config.session.secret,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: config.session.collection
        }),
        cookie: config.session.cookie
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Globbing routing files
    config.getGlobbedFiles('./src/js/server/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Set up React-Router
    app.use(function(req, res, next){
        if (req.url.indexOf('/assets') > -1) {
            next();
        }

        let r = createRoutes(Routes);
        let location = createLocation(req.url);

        match({ routes: r, location: location }, function(error, redirectLocation, renderProps){
            if (error) {
                return res.status(500).send(error.message);
            } else if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                // return res.status(200).sendFile(path.resolve(__dirname, '../src/public/index.swig'));

                // var App = require('../src/js/client/components/app').default;
                // console.log('App: ', App);
                // var ReactApp = React.createFactory(App);
                // var content = ReactDOMServer.renderToString(ReactApp({}));
                var content = renderToString(<RoutingContext {...renderProps} />);
                return res.render('index', {content: content, translations: JSON.stringify(req.translations)});
            }
        });
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).sendFile(path.resolve(__dirname, '../src/public/500.html'));
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).sendFile(path.resolve(__dirname, '../src/public/404.html'));
    });

    if (config.ssl && config.ssl.enabled) {
        // Log SSL usage
        console.log('Securely using https protocol');

        // Load SSL key and certificate
        var privateKey = fs.readFileSync(config.ssl.keyPath, 'utf8');
        var certificate = fs.readFileSync(config.ssl.crtPath, 'utf8');

        // Create HTTPS Server
        var httpsServer = https.createServer({
            key: privateKey,
            cert: certificate
        }, app);

        // Return HTTPS server instance
        return httpsServer;
    }

    // Return Express server instance
    return app;
};
