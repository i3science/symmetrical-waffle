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