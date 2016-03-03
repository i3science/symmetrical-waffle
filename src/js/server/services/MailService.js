import Q from 'q';
import _ from 'lodash';
import consolidate from 'consolidate';
import fs from 'fs';
import path from 'path';
import config from '../../../../config/config';
import transporter from '../../../../config/mail';

/**
 * The MailService is responsible for sending mail to users and handling any
 * errors encountered during that process.
 */
class MailService {

    /**
     * Sends an email using the configured underlying transport.
     *
     * Options:
     * - from: The email address the email is being sent from
     * - to: The email address to send to
     * - subject: The textual subject of the email
     * - text: The plain-text version of the email contents
     * - html: The html version of the email contents
     *
     * @param template String The name of the template to use when generating
     *     the outgoing email.
     * @param opts Object A map of options, most of which affect the envelope
     *     of the email. 
     * @param data Object A map of parameters and information to be substituted
     *     in the template.
     * @return A Q promise that is fulfilled or rejected based on return status
     *     of the transport request.
     */
    send(template, opts, data) {
        if (!opts.from) {
            opts.from = 'no-reply@socialmarketplace.io';
        }

        if (config.mail.disable) {
            return Q.fcall(() => { return true; });
        }
        return this.render(template, opts, data)
            .spread(function(text, html){
                opts.text = text;
                opts.html = html;

                let deferred = Q.defer();
                transporter.sendMail(opts, function(error, info){
                    if (error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(info);
                    }
                });
                return deferred.promise;
            });
    }

    /**
     * Renders the requested template, substituting options and data where
     * need.
     * @param template String The name of the template to use when generating
     *     the outgoing email.
     * @param opts Object A map of options, most of which affect the envelope
     *     of the email. 
     * @param data Object A map of parameters and information to be substituted
     *     in the template.
     * @return An array of promises, the first being the text rendering,
     *     followed by the html rendering.
     */
    render(template, opts, data) {
        if (!opts.from) {
            opts.from = 'no-reply@socialmarketplace.io';
        }
        
        var deferred = Q.defer();
        var render = consolidate[config.templateEngine];
        var templatePath = path.resolve(__dirname, '../../../mail/'+template);
        function exists(path) {
            try {
                fs.accessSync(path, fs.F_OK);
                return true;
            } catch(err) {
                return false;
            }
        }

        if (!exists(templatePath)) {
            deferred.reject(new Error('Email template '+template+' not found'));
            return deferred.promise;
        }

        var promises = [];

        // Render text
        var text = _.filter([
            templatePath+'/text.'+config.templateEngine,
            templatePath+'/text.txt',
            templatePath+'/text'
        ], exists);
        if (text.length > 0) {
            promises.push(render(text[0], _.extend({}, opts, data)));
        }

        // Render html
        var html = _.filter([
            templatePath+'/html.'+config.templateEngine,
            templatePath+'/html.html',
            templatePath+'/html'
        ], exists);
        if (html.length > 0) {
            promises.push(render(html[0], _.extend({}, opts, data)));
        }
        return Q.all(promises);
    }
}

export default new MailService();