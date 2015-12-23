var schema = require('validate');

module.exports = function(options) {
    options = options || {};
    var data = schema(options, {typecast: true});
    return function(page, spider, next) {
        var valid = data.validate(page.data);
        console.log(valid);
        page.valid = valid.length ? false : true;
        setImmediate(next);
    }
};
