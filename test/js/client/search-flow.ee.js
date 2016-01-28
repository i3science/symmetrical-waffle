let { until, By } = protractor;
let { $, baseUrl, driver, getCurrentUrl, wait } = browser;
let fixtures = null;

import '../../../init';
import { repopulate } from '../server/common.js';
import { login, screenshot } from './utils'

describe('search flow', () => {
    beforeEach(() => {
        return repopulate()
            .then((_fixtures) => {
                fixtures = _fixtures;
                return fixtures;
            });
    });

    it('attempting unauthenticated search should push to login page', () => {
        return driver.get(browser.baseUrl+'/auth/signout')
            .then(() => {
                return driver.get(browser.baseUrl+'/search');
            })
            .then(() => {
                return wait(until.uriEquals('/login'), 10000);
            });
    });
    it('typing a search query updates the result count in real time', () => {
        return login('admin@smp.com', 'admin123')
            .then(() => {
                return driver.get(browser.baseUrl+'/search');
            })
            .then(() => {
                return wait(until.elementLocated(By.id('something')), 10000);
            })
            .then(() => {
                return $('#something').sendKeys('d');
            })
            .then(() => {
                return wait(until.elementLocated(By.id('result-count')), 10000);
            })
            .then(() => {
                screenshot();
                return wait(until.elementTextIs($('#result-count'), '2 results'), 10000);
            });
    });
});