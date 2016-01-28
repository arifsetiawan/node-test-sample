
'use strict';

require('./database');

const Promise = require('bluebird');
const buildDictionary = Promise.promisifyAll(require('sails-build-dictionary'));

const options = [
    {
        dirname: config.appDir + '/app/services',
        global: true,
    },
    {
        dirname: config.appDir + '/app/strategies',
        global: false,
    },
    {
        dirname: config.appDir + '/app/controllers',
        global: true,
    },
];

function requireDir(options) {
    var baseOptions = {
        filter: /^([^.]+)\.(js)$/,
        replaceExpr: /^.*\//,
        flattenDirectories: true,
    };

    return new Promise(function(resolve, reject) {
        buildDictionary.optionalAsync(_.assign(baseOptions, options)).then(function(result) {
            if (options.global) {
                _.each(result, (controllerDef, controllerId) => {
                    global[controllerDef.globalId] = controllerDef;
                });
            };

            resolve(result);
        }).catch(reject);
    });
}

exports.requireAll = function() {
    return Promise.mapSeries(options, function(option) {
        return requireDir(option);
    });
};
