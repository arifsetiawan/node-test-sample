'use strict';

const assert = require('assert');
const Utils = require('../../app/services/Utils');

describe('hasProperty', function() {

    it('return true if has all properties', function() {
        assert(Utils.hasProperty({one:'one', two:'two'}, ['one']), 'Object has "{\'one\':\'one\', \'two\':\'two\'}" has property with name one');
    });

    it('return false if has missing property', function() {
        assert.equal(Utils.hasProperty({one:'one', two:'two'}, ['one', 'three']), false, 'Object has "{\'one\':\'one\', \'two\':\'two\'}" don\'t have property with name three');
    });

});
