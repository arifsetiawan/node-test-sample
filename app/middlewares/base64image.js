'use strict';

const config = require('../../config/' + (process.env.NODE_ENV || ''));

const path = require('path');
const fs = require('fs');

function checkBase64(raw) {
    return raw && typeof (raw) == 'string' && raw.match(/^data:image\/png;base64,/);
};

exports.get = (req, res, next) => {

    if (req.body.hasOwnProperty('base64image')) {
        const raw = req.body.base64image;
        if (!checkBase64(raw))
          return next();

        const base64 = raw.replace(/^data:image\/png;base64,/, '');
        const filename = Utils.uid(64) + '.png';
        const filepath = path.join(config.photoDir, filename);
        fs.writeFile(filepath, base64, 'base64', err => {
            if (err) return next(err);

            fs.stat(filepath, (err, stat) => {
                req.files.image = {
                    name: filename,
                    path: filepath,
                    type: 'image/png',
                    size: stat ? stat.size : base64.length / 1.37,
                };
                delete req.body.base64image;
                return next();
            });

        });
    } else {
        next();
    }

};
