'use strict';

const assert = require('assert');

describe('Simple test', function() {

    it('bar equal bar', function() {
        assert.equal('bar', 'bar', '`bar` equal `bar`');
    });

    it('foo equal foo', function() {
        assert.equal('foo', 'foo', '`foo` equal `foo`');
    });

    it('foo not equal bar', function() {
        assert.notEqual('foo', 'bar', '`foo` not equal `bar`');
    });
});
