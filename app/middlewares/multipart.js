'use strict';

/*
  Multipart request handling with formidable
  uploaded files will be stored in config.uploadDir
  By default, files are kept
  By setting req.removeFile somewhere in request handler,
  file will be removed when request end
*/

const fs = require('fs-extra');

if (!fs.existsSync(config.uploadDir))
  fs.mkdirsSync(config.uploadDir);

const formidable = require('formidable');

function hasBody(req) {
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};

function mime(req) {
    const str = req.headers['content-type'] || '';
    return str.split(';')[0];
};

exports.do = (req, res, next) => {

    if (req._body) return next();
    req.body = req.body || {};
    req.files = req.files || {};

    if (!hasBody(req)) return next();
    if (req.method === 'GET' || req.method === 'HEAD') return next();
    if (mime(req) !== 'multipart/form-data') return next();

    req._body = true;

    const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: config.uploadDir,
        multiples: true,
        maxFieldsSize: 10 * 1024 * 1024,
    });

    form.parse(req, (err, fields, files) => {
        if (err) return next(err);

        req.body = fields;
        req.files = files;
        next();
    });

    const end = res.end;
    res.end = (chunk, encoding) => {
        res.end = end;
        res.end(chunk, encoding);

        // if we want it, delete it
        if (req.removeFile && req.removeFile === true) {
            if (req.files) {
                for (file in req.files) {
                    const fileData = req.files[file];
                    if (fs.existsSync(fileData.path))
                      fs.unlinkSync(fileData.path);
                }
            }
        }
    };
};
