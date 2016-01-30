import fs from 'fs';
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
            fs.writeFile('tmp/out.png', data, 'base64', (err) => {
                if (err) {
                    console.log(err);
                }
            });
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