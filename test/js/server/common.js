import Q from 'q';
import _ from 'lodash';
import chalk from 'chalk';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import config from '../../../config/config';
import Seeder from '../../../seed/Seeder';
import InfluencerService from '../../../src/js/server/services/InfluencerService';
import UserService from '../../../src/js/server/services/UserService';

chai.use(chaiAsPromised);

export function repopulate() {
    let oldMailDisable = config.mail.disable;
    config.mail.disable = true;
    return Seeder
        .seed()
        .then((fixtures) => {
            config.mail.disable = oldMailDisable;
            // console.log('Fixtures: ', fixtures);
            return fixtures;
        });
};