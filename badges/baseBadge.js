/**
 * Created by lmarkus on 12/10/15.
 */
var box = require('../lib/box'),
    template = require('../lib/loadTemplates').dualBadge;

module.exports = function dualBadge(text, options) {

    var box1, box2,
        width, height;

    box1 = box(text[0], {
        font: options.font
    });

    //The second box
    box2 = box(text[1], {
        font: options.font,
        offsetX: box1.width
    });

    width = box1.width + box2.width;
    height = box1.height;

    return template.render({
        width: width,
        height: height,
        w1: box1.width,
        w2: box2.width,
        text1: box1.textPath,
        text2: box2.textPath
    });
};