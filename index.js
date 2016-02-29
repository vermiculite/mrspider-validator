"use strict";
let through2 = require('through2');

var schema = require('validate');

module.exports = function(options) {
    options = options || {};
    var data = schema(options, {typecast: true});
    return through2(function(page, enc, next) {
        var valid = data.validate(page.data);
        console.log(valid);
        page.valid = valid.length ? false : true;
        setImmediate(next);
    });
};
