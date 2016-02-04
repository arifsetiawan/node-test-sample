
# NOTE

* Update `package.json` to remove unused modules in this base
* Update README for other developers to read and jump into the project

# Nodejs web app

A [https://nodejs.org/](https://nodejs.org/) web app base template

* [Express 4.x](http://expressjs.com/)
* [Mongoose](https://github.com/Automattic/mongoose) for working with MongoDB database
* [Swig](http://paularmstrong.github.io/swig/). Its not maintained now, [see here](https://github.com/paularmstrong/swig/issues/628)
* [Bluebird](bluebirdjs.com). ES2015 Promises and Generator for async executions

## Promises

Strive to use promises everywhere, mostly for function that will be called in controllers.

Mixing promises and callbacks is a big anti-pattern, just think in promises and use [.asCallback](http://bluebirdjs.com/docs/api/ascallback.html) handle the mapping to callback equivalent at the end. Some libraries like Passport is not using Promises yet, so we will need to use callback to return. 

See [Thinking in promises](docs/thinking-in-promises.md)

# How to use

* Fork or/and clone
* `$ npm install`
* `$ bower install`
* `$ npm start`
* See **NOTE** above

# Testing

See [Notes from The Art of Unit Testing](docs/aout-notes.md) for unit testing, stub and mock explanation.

We use [mocha](https://github.com/mochajs/mocha) for unit test with [Node.js assert](https://nodejs.org/api/assert.html) for assertion and [supertest](https://github.com/visionmedia/supertest) for API integration test.

Why not [tape](https://github.com/substack/tape)? Currently, it doesn't play nice with supertest. see [here](https://github.com/substack/tape/issues/216). 

Run test with 

```
npm run unit -loglevel silent
npm run integration -loglevel silent
```

`-loglevel silent` is to suppress `npm-debug.log` in case tests failed.

## Pre commit hook

Install git pre commit hook with

```
node bin/hook
```

Changes with failed test will not be committed.

## Skip test

* Skip pre commit hook with `git commit --no-verify`
* Skip Gitlab CI with `[ci skip]` word in commit message

# TODO

* Security
* Build tools (grunt or gulp or use npm script)
* Change swig or not

# Style Guide

Use [jscs](http://jscs.info/) with [Airbnb](https://github.com/airbnb/javascript) preset as base. See [.jscsrc](.jscsrc). 

Follow guides on jscs on how to setup jscs. Optionally you might want to install jscs plugin on your favorite text editor.

# Contributions

Contributions are welcome
