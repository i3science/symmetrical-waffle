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


let screenshot = () => {
    return browser.takeScreenshot()
        .then((data) => {
            data = data.replace(/^data:image\/png;base64,/,'');
            fs.writeFile('out.png', data, 'base64', (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
}

export { screenshot }