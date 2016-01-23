import request from 'supertest';

import init from '../../../../../init';
import { fixtures, clean, setup, doAs, doneWithErrors } from '../../common.js';
let { app } = init;

require('chai').should();

let agent, influencer;

describe('Influencer Routes - ', () => {
    beforeEach(() => {
        agent = request.agent(app);

        influencer = {
            name: {
                first: 'Alexandra',
                last: 'Gronfors'
            },
            email: 'agronfors@smp.com',
            roles: ['influencer'],
            active: true,
            language: 'en_CA'
        };

        return clean()
          .then(setup);
    });

    it('Can save if authenticated', (done) => {
        doAs(agent, fixtures.organizers.thamilton, done, () => {
            agent
                .post('/api/influencers')
                .send(influencer)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        return doneWithErrors(done, err, res);
                    }
                    done();
                });
        });
    });

    it('Cannot save if unauthenticated', (done) => {
        agent
            .post('/api/influencers')
            .send(influencer)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    console.log('Error: ', err);
                    return doneWithErrors(done, err, res);
                }

                (res.body.message).should.equal('User is not logged in');
                done();
            });
    });

    it('Cannot save if unauthorized', (done) => {
        doAs(agent, fixtures.influencers.kwilson, done, () => {
            agent
                .post('/api/influencers')
                .send(influencer)
                .expect(403)
                .end((err, res) => {
                    if (err) {
                        return doneWithErrors(done, err, res);
                    }

                    (res.body.message).should.equal('User is not authorized');
                    done(err);
                });
        });
    });
});