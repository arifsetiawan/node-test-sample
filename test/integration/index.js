'use strict';

var request = require('supertest');
var app = require('../../app');

describe('GET /api/v1', function(){
    it('should return 200 OK with content-type json', function(done) {
        request(app)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
});
