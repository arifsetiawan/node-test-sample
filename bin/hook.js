#!/usr/bin/env node

var Validate = require('git-validate');

Validate.configureHook('pre-commit', ['jscs', 'unit', 'integration']);
