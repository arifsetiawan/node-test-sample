
# Setup selenium environment

## 1. Standalone selenium server

http://docs.seleniumhq.org/download/

```
wget http://selenium-release.storage.googleapis.com/2.51/selenium-server-standalone-2.51.0.jar
java -jar selenium-server-standalone-2.51.0.jar
```

Selenium server comes with some integrated drivers (for Firefox, Opera and Safari).

## 2. Standalone browser driver

* Chrome: http://chromedriver.storage.googleapis.com/index.html
* Firefox: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver
* Headless with Phantomjs: http://phantomjs.org/download.html

```
wget http://chromedriver.storage.googleapis.com/2.21/chromedriver_mac32.zip
wget https://github.com/jgraham/wires/releases/download/v0.6.2/wires-0.6.2-OSX.gz
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-macosx.zip
```

Extract both and make sure both are in PATH. For Firefox, rename the binary file to 'wires' and ensure it is executable.

## 3. Selenium helper 

https://github.com/vvo/selenium-standalone

# Run and write tests!

## Install selenium-webdriver

```
npm install selenium-webdriver --save-dev
```

## Start application

```
npm start
```

## Run demo test

```
npm run web -loglevel silent
npm run webdemo -loglevel silent
```