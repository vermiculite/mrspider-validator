var chai = require('chai');
var should = chai.should();
var mrspiderValidator = require('..');

describe('mrspider validator', function () {

    var validPage;
    var validSpider;
    var validRules;

    beforeEach(function () {
        validPage = {
            data: {
                name: 'sean',
                age: '42',
                dob: new Date()
            }
        };
        validSpider = {};
        validRules = {
            name: {
                type: 'string',
                required: true,
                message: 'name is required'
            },
            age: {
                type: 'number',
                required: true,
                message: 'supposed to be a number'
            }
        };
    });

    it('should call the callback', function (done) {
        var validator = mrspiderValidator(validRules);
        validator(validPage, validSpider, done);
    });

    it('should remove data fields not specified in the validation', function (done) {
        var validator = mrspiderValidator(validRules);
        validator(validPage, validSpider, function () {
            var data = validPage.data;
            data.age.should.equal(42);
            data.name.should.equal('sean');
            should.not.exist(data.dob);
            validPage.valid.should.equal(true);
            done();
        });
    });

    it('should remove data fields not specified in the validation', function (done) {
        var validator = mrspiderValidator(validRules);
        delete validPage.data.name;
        validator(validPage, validSpider, function () {
            var data = validPage.data;
            data.age.should.equal(42);
            should.not.exist(data.dob);
            validPage.valid.should.equal(false);
            done();
        });
    });

});
