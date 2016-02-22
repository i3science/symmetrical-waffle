import mongoose from 'mongoose';
import base_service from './base_service';
import mailService from './MailService';
let Influencer = mongoose.model('Influencer');

export default base_service(Influencer, {
    create(influencer, basePath) {
        let _influencer = null;
        let _affected = null;

        influencer = new Influencer(influencer);
        return influencer
            .savePromise()
            .spread(function(influencer, affected){
                _influencer = influencer;
                _affected = affected;
                return mailService.send('reset-password', {
                    from: 'no-reply@smp.com',
                    to: influencer.email,
                    subject: 'Hello'
                }, {
                    link: basePath + '/auth/reset-password'
                });
            })
            .then(function(info){
                if (info && info.messageId) {
                    let messageId = info.messageId;
                    console.log('Sent message: ', messageId); // eslint-disable-line no-console
                }
                return [_influencer, _affected];
            })
            .fail(function(err){
                console.log(err); // eslint-disable-line no-console
                throw err;
            });
    }
});