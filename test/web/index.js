const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');

test.describe('Nodejs app website', function() {
    this.timeout(20000);
    var driver;

    test.before(function() {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    });

    test.it('Shoule have text: Nodejs App', function() {

        driver.get('http://localhost:8000');
        const helloText = driver.findElement(webdriver.By.id('hello'));

        helloText.getText().then(function(value) {
            assert.equal(value, 'Nodejs App');
        });

    });

    test.after(function() {
        driver.quit();
    });

});
