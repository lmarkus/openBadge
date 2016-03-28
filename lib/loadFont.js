/**
 * Created by lmarkus on 12/10/15.
 */
var fontCache = {},
    path = require('path'),
    opentype = require('opentype.js/dist/opentype.js');

module.exports = function loadFont(fontPath, callback) {
    // Optimize for cached fonts
    if (fontCache[fontPath]) {
        return process.nextTick(function () {
            callback(null, fontCache[fontPath]);
        })
    }

    return opentype.load(path.join(__dirname, '..', fontPath), function (err, font) {
        if (err) {
            return callback(err);
        }
        fontCache[fontPath] = font;
        callback(null, font);
    });
};
