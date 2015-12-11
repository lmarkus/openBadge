/**
 * Created by lmarkus on 12/9/15.
 */
var _ = require('lodash'),
    box = require('./lib/box'),
    badges = require('./badges'),
    loadFont = require('./lib/loadFont');

module.exports = function getBadge(options, callback) {

    // Boilerplate option management code.
    var badge,
        defaultOptions = {
            badge: 'baseBadge',
            text: ['Hello', 'World'],
            font: {
                fontFace: 'fonts/Open_Sans/OpenSans-Bold.ttf',
                fontSize: '11'
            },
            color: {
                left: '#555',
                right: '#4c1',
                font: '#fff',
                shadow: '#010101'
            },
            paddingX: 6,
            paddingY: 6,
            offsetX: 0
        };
    defaultOptions = _.merge(defaultOptions, options);

    // Load badge module.
    badge = badges[defaultOptions.badge];

    loadFont(defaultOptions.font.fontFace, function (err, loadedFont) {
            var res;
            if (err) {
                console.error('Font could not be loaded: ', err);
                return callback(err);
            } else {
                defaultOptions.font.loadedFont = loadedFont;
                res = badge(defaultOptions.text, defaultOptions);
                return callback(null, res);
            }
        }
    );
};
