import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { MailParser } from 'mailparser';
import Q from 'q';
let { until, By } = protractor;
let { $, baseUrl, driver, getCurrentUrl, wait } = browser;

until.urlEquals = (desired) => {
    return new until.Condition(
        'url equals ' + desired,
        (driver) => {
            return getCurrentUrl().then((actual) => {
                return actual === desired;
            });
        });
}
until.uriEquals = (desired) => {
    return until.urlEquals(baseUrl+desired);
}

export function screenshot() {
    return browser.takeScreenshot()
        .then((data) => {
            data = data.replace(/^data:image\/png;base64,/,'');
            let time = moment().format('YYYY-MM-DD_HH-mm-ss-SSSSSS');
            fs.writeFile('tmp/'+time+'.png', data, 'base64', (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
}

export function logs() {
    return browser.manage().logs().get('browser')
        .then((logs) => {
            console.log('Browser console errors:');
            logs.forEach((log) => {
                console.log(log.message);
            });
            return true;
        });
}

export function login(email, password) {
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

export function countEmails() {
    return getEmails().length;
};

export function getEmail(name) {
    return fs.readFileSync(path.resolve(__dirname, '../../../tmp/mail/'+name));
}

export function parseEmail(name) {
    let text = getEmail(name);
    let mailparser = new MailParser();

    let deferred = Q.defer();
    mailparser.on('end', (obj) => {
        deferred.resolve(obj);
    });
    mailparser.write(text);
    mailparser.end();
    return deferred.promise;
}

export function getEmails() {
    return fs.readdirSync(path.resolve(__dirname, '../../../tmp/mail'));
}

export function clearEmails() {
    getEmails().forEach((obj) => {
        fs.unlinkSync(path.resolve(__dirname, '../../../tmp/mail/'+obj));
    });
};