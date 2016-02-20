let { until, By } = protractor;
let { $, baseUrl, driver, element, getCurrentUrl, wait } = browser;
let fixtures = null;

import '../../../init';
import { repopulate } from '../server/common.js';
import { login, screenshot } from './utils'

let waitForStart = () => {
    return login('admin@smp.com', 'admin123')
        .then(() => {
            return driver.get(browser.baseUrl+'/projects');
        })
        .then(() => {
            return wait(until.elementLocated(By.className('card')), 10000);
        })
        .then(() => {
            return element.all(By.className('card')).count();
        })
        .then((count) => {
            expect(count).toEqual(2);
            return true;
        })
}

describe('project list', () => {
    beforeEach(() => {
        return repopulate()
            .then((_fixtures) => {
                fixtures = _fixtures;
                return fixtures;
            });
    });

    it('shows all projects when unfiltered', () => {
        return waitForStart();
    });

    // Searching for client 'f' should display 2 results
    it('client search should limit results', () => {
        return waitForStart()
            .then(() => {
                return $('#client').clear();
            })
            .then(() => {
                return $('#client').sendKeys('f')
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(1);
            });
    });

    // Searching for keyword 'b' should display 1 result
    it('keyword search should limit results', () => {
        return waitForStart()
            .then(() => {
                return $('#keyword').clear();
            })
            .then(() => {
                return $('#keyword').sendKeys('d')
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(1);
            });
    });

    // Hiding pending should display 3 reuslts
    it('should show pending campaigns', () => {
        return waitForStart()
            .then(() => {
                return $('#pending').element(By.xpath('following-sibling::label')).click();
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(3);
            });
    });

    // Hiding active should display 3 results
    it('should hide active campaigns', () => {
        return waitForStart()
            .then(() => {
                return $('#active').element(By.xpath('following-sibling::label')).click();
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(1);
            });
    });

    // Hiding in-market should display 3 results
    it('should hide in-market campaigns', () => {
        return waitForStart()
            .then(() => {
                return $('#inmarket').element(By.xpath('following-sibling::label')).click();
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(1);
            });
    });

    // Hiding closed should display 3 results
    it('should show closed campaigns', () => {
        return waitForStart()
            .then(() => {
                return $('#closed').element(By.xpath('following-sibling::label')).click();
            })
            .then(() => {
                return element.all(By.className('card')).count();
            })
            .then((count) => {
                expect(count).toEqual(3);
            });
    });
});