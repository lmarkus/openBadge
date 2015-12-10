/**
 * Created by lmarkus on 12/10/15.
 */
var fs = require('fs'),
    _ = require('lodash');

module.exports.dualBadge = {
    render: _.template(fs.readFileSync(__dirname + '/../templates/baseBadge.svg'))
};

