import mongoose from 'mongoose';
import base_service from './base_service';
import mailService from './MailService';
import context from 'request-context';
let User = mongoose.model('User');

/**
 * The UserService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default base_service(User, {
    sendAccountCreatedNotification(user) {
        user.createPasswordResetToken();
        return user
            .savePromise()
            .spread((user) => {
                return mailService
                    .send('account-created', {
                        to: user.email,
                        subject: 'Social Marketplace Account Created'
                    }, {
                        sitelink: context.get('request:basePath'),
                        resetlink: context.get('request:basePath') + '/security/reset-password?token='+user.passwordResetToken.id
                    });
            })
            .fail((err) => {
                console.log(err); // eslint-disable-line no-console
                throw err;
            });
    }
});