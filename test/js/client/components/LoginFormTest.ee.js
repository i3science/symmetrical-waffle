// let {  ActionSequence ,
//    Builder ,
//    By ,
//    Capabilities ,
//    Command ,
//    EventEmitter ,
//    FileDetector ,
//    Serializable ,
//    Session ,
//    WebDriver ,
//    WebElement ,
//    WebElementPromise ,
//    Browser ,
//    Button ,
//    Capability ,
//    CommandName ,
//    Key ,
//    error ,
//    logging ,
//    promise ,
//    stacktrace ,
//    until ,
//    ElementFinder ,
//    ElementArrayFinder ,
//    ExpectedConditions ,
//    wrapDriver } = protractor;
// let {  controlFlow ,
//    schedule ,
//    setFileDetector ,
//    getSession ,
//    getCapabilities ,
//    quit ,
//    actions ,
//    touchActions ,
//    executeScript ,
//    executeAsyncScript ,
//    call ,
//    wait ,
//    sleep ,
//    getWindowHandle ,
//    getAllWindowHandles ,
//    getPageSource ,
//    close ,
//    getCurrentUrl ,
//    getTitle ,
//    findElementInternal_ ,
//    findDomElement_ ,
//    findElementsInternal_ ,
//    takeScreenshot ,
//    manage ,
//    switchTo ,
//    driver ,
//    element ,
//    $ ,
//    $$ ,
//    baseUrl ,
//    rootEl ,
//    ignoreSynchronization ,
//    getPageTimeout ,
//    params ,
//    ready ,
//    plugins_ ,
//    resetUrl ,
//    trackOutstandingTimeouts_ ,
//    mockModules_ ,
//    allScriptsTimeout ,
//    getProcessedConfig ,
//    forkNewDriverInstance ,
//    restart  } = browser;
var fs = require('fs');

let { until, By } = protractor;
let { $, baseUrl, driver, getCurrentUrl, wait } = browser;

import '../../../../init';
import { fixtures, clean, setup } from '../../server/common.js';
import './utils'

let expectNoErrors = () => {
    
}

describe('login flow', () => {
    beforeEach(() => {
        return clean()
          .then(setup);
    });

    it('can log in successfully', () => {
        driver.get(browser.baseUrl+'/login')
            .then(() => {
                return wait(until.elementLocated(By.id('email')), 10000);
            })
            .then(() => {
                return $('#email').clear();
            })
            .then(() => {
                return $('#email').sendKeys('thamilton@smp.com')
            })
            .then(() => {
                return $('#pass').sendKeys('*admin123');
            })
            .then(() => {
                return $('#login-form').submit();
            })
            .then(() => {
                return wait(until.uriEquals('/'), 10000);
            });
    });

    it('login with bad credentials fails', () => {
        driver.get(browser.baseUrl+'/login')
            .then(() => {
                return wait(until.elementLocated(By.id('email')), 10000);
            })
            .then(() => {
                return $('#email').clear();
            })
            .then(() => {
                return $('#email').sendKeys('invalid@smp.com')
            })
            .then(() => {
                return $('#pass').sendKeys('invalid');
            })
            .then(() => {
                return $('#login-form').submit();
            })
            .then(() => {
                return wait(until.elementLocated(By.className('toast')), 4000);
            })
            .then(() => {
                expect($('.toast').getText()).toBe('Unknown user or invalid password');
            });
    });
});