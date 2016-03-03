import mongoose from 'mongoose';
import base_service from './base_service';
import mailService from './MailService';
import context from 'request-context';
let Influencer = mongoose.model('Influencer');

export default base_service(Influencer, {
    send(influencer) {
        return mailService
            .send('account-created', {
                to: influencer.email,
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