'use strict';

const request = require('supertest');
const app = require('../../app');

describe('/api/v1', function() {
    it('GET /api/v1 should return 200 OK with content-type json', function(done) {
        request(app)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
});

