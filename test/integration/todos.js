'use strict';

const debug = require('debug')('test');
const assert = require('assert');

const request = require('supertest');
const app = require('../../app');

describe('/api/v1/todos', function() {

    it('POST /api/v1/todos should return 201 Created with response contain original data', function(done) {
        request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/json')
        .send({task: 'Read The Art of Unit Testing'})
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function(res) {
            debug(res.body);
            assert(res.body.data, 'Response body has data');
            assert(res.body.data.task, 'Data has task field');
            assert.equal(res.body.data.task, 'Read The Art of Unit Testing', 'Task content is equal to sent content');
        })
        .end(done);
    });

    it('GET /api/v1/todos should return 200 OK with todo list as array', function(done) {
        request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
            assert(res.body.data, 'Response body has data');
            assert.equal(res.body.data.constructor, Array, 'Data is an array');
            assert.equal(res.body.data.length, 1, 'Data should contain 1 item');
            assert.equal(res.body.data[0].task, 'Read The Art of Unit Testing', 'Task content is equal to sent content');
        })
        .end(done);
    });

});

