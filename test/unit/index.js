'use strict';

var assert = require('assert');

describe('Simple test', function() {

    it('should fail', function() {
        assert.equal('foo', 'bar', '`foo` equal `bar`');
    });

    it('should ok', function() {
        assert.equal('foo', 'foo', '`foo` equal `foo`');
    });

    it('should ok', function() {
        assert.notEqual('foo', 'bar', '`foo` not equal `bar`');
    });
});
