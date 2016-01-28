
var express = require('express');
var router = express.Router();

var path = require('path');

var multipart = require('../middlewares/multipart');

router.get('/', function(req, res, next) {
    res.ok('This is just a test');
});

router.get('/ok', (req, res, next) => {
    res.ok(0, 'Somebody', 203);
});

router.get('/error', function(req, res, next) {
    var err = new Error('Hey, you requested it');
    err.status = 400;
    next(err);
});

router.get('/headers', function(req, res, next) {
    res.ok(req.headers);
});

router.post('/photo', multipart.do, function(req, res, next) {

    if (req.files) {
        req.keepFile = true;
        var key = Object.keys(req.files);
        var file = req.files[key[0]];
        var filename = path.basename(file.path);
        res.ok({
            url: 'http://' + req.headers.host + '/photos/' + filename,
        });
    } else {
        var err = new Error('You no upload file');
        err.status = 400;
        next(err);
    }

});

module.exports = router;
