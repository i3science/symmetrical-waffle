let { until, By } = protractor;
let { $, baseUrl, driver, getCurrentUrl, sleep, wait } = browser;
let fixtures = null;

import '../../../init';
import { repopulate } from '../server/common.js';
import { clearEmails, countEmails, getEmail, getEmails, login, parseEmail, screenshot } from './utils'

describe('search flow', () => {
    beforeEach(() => {
        return repopulate()
            .then((_fixtures) => {
                fixtures = _fixtures;
                return fixtures;
            });
    });

    it('requesting reset for non-existing email should show success', () => {
        return driver.get(browser.baseUrl+'/auth/signout')
            .then(() => {
                return wait(until.uriEquals('/login'), 1000);
            })
            .then(() => {
                clearEmails();
                return driver.get(browser.baseUrl+'/security/forgot-password');
            })
            .then(() => {
                return wait(until.elementLocated(By.id('email')), 1000);
            })
            .then(() => {
                return $('#email').sendKeys('invalid@invalid.com');
            })
            .then(() => {
                return screenshot();
            })
            .then(() => {
                return $('#forgot-password-submit').click();
            })
            .then(() => {
                return wait(until.elementLocated(By.className('toast')), 4000);
            })
            .then(() => {
                expect($('.toast:last-child').getText()).toBe('An email has been sent.');
                expect(countEmails()).toEqual(0);
            });
    });
    it('requesting reset for existing email should actually be successful', () => {
        // Derek starts off with no password, thus no login is possible.
        // Resetting password should allow login
        return driver.get(browser.baseUrl+'/auth/signout')
            .then(() => {
                return driver.get(browser.baseUrl+'/security/forgot-password');
            })
            .then(() => {
                return wait(until.elementLocated(By.id('email')), 1000);
            })
            .then(() => {
                clearEmails();
                expect(countEmails()).toEqual(0);
                return true;
            })
            .then(() => {
                return $('#email').sendKeys('derekb@awesome.com');
            })
            .then(() => {
                return $('#forgot-password-submit').click();
            })
            .then(() => {
                return wait(until.elementLocated(By.className('toast')), 4000);
            })
            .then(() => {
                expect($('.toast:last-child').getText()).toBe('An email has been sent.');
            })
            .then(() => {
                expect(countEmails()).toEqual(1);
                return parseEmail(getEmails()[0]);
            })
            .then((email) => {
                expect(email.to[0].address).toEqual('derekb@awesome.com');
                let token = email.text.match(/token=([a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12})/)
                return driver.get(browser.baseUrl+'/security/reset-password?token='+token[1]);
            })
            .then(() => {
                return wait(until.elementLocated(By.id('pass')), 1000);
            })
            .then(() => {
                return $('#pass').sendKeys('abc123');
            })
            .then(() => {
                return $('#confirmpass').sendKeys('abc123');
            })
            .then(() => {
                return $('#reset-password-submit').click();
            })
            .then(() => {
                login('derekb@awesome.com', 'abc123');
            })
    });
});