import mongoose from 'mongoose';
import base_service from './base_service';
import mailService from './MailService';
import context from 'request-context';
let Representative = mongoose.model('Representative');

/**
 * The RepresentativeService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default base_service(Representative, {
    list(opts) {
        opts = opts || {};
        return Representative
            .find(opts)
            .populate('client', 'name')
            .exec();
    },
    send(representative) {
        return mailService
            .send('account-created', {
                to: representative.email,
                subject: 'Social Marketplace Account Created'
            }, {
                sitelink: context.get('request:basePath'),
                resetlink: context.get('request:basePath') + '/auth/reset-password'
            })
            .fail((err) => {
                console.log(err); // eslint-disable-line no-console
                throw err;
            });
    }
});