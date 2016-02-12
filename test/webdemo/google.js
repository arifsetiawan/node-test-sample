const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');

test.describe('Google Search', function() {
    this.timeout(20000);

    test.it('should work chrome', function() {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.phantomjs()).
            build();

        driver.get('http://www.google.com');
        const searchBox = driver.findElement(webdriver.By.name('q'));

        searchBox.sendKeys('dycode');
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'dycode');
        });

        driver.quit();
    });

    test.it('should work firefox', function() {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).
            build();

        driver.get('http://www.google.com');
        const searchBox = driver.findElement(webdriver.By.name('q'));

        searchBox.sendKeys('dycode');
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'dycode');
        });

        driver.quit();
    });

    test.it('should work phantomjs', function() {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.phantomjs()).
            build();

        driver.get('http://www.google.com');
        const searchBox = driver.findElement(webdriver.By.name('q'));

        searchBox.sendKeys('dycode');
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'dycode');
        });

        driver.quit();
    });
});
