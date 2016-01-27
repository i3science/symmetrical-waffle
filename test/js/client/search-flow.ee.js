let { until, By } = protractor;
let { $, baseUrl, driver, getCurrentUrl, wait } = browser;

import '../../../init';
import { fixtures, clean, setup } from '../server/common.js';
import { screenshot } from './utils'

let login = (email, password) => {
    return driver.get(browser.baseUrl+'/auth/signout')
        .then(() => {
            return driver.get(browser.baseUrl+'/login');
        })
        .then(() => {
            return wait(until.elementLocated(By.id('email')), 10000);
        })
        .then(() => {
            return $('#email').clear();
        })
        .then(() => {
            return $('#email').sendKeys(email)
        })
        .then(() => {
            return $('#pass').sendKeys(password);
        })
        .then(() => {
            return $('#login-form').submit();
        })
        .then(() => {
            return wait(until.uriEquals('/'), 10000);
        });
};

describe('search flow', () => {
    beforeEach(() => {
        return clean()
          .then(setup);
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
        return login('thamilton@smp.com', '*admin123')
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
                return wait(until.elementTextIs($('#result-count'), '1 result'), 10000);
            });
    });
});