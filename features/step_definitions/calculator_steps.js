var assert = require('assert');

var fs = require('fs');
var Yadda = require('../../../lib/index.js');
var Calculator = require('../support/rpn_calculator.js')

module.exports = (function() {
    var calc;

    function isNumberWithinRangeOfValue(number, range, value) {
        var lowerBound = value - range;
        var upperBound = value + range;
        var withinLowerBound = number > lowerBound;
        var withinUpperBound = number < upperBound;
        return (withinLowerBound && withinUpperBound);
    }

    var library = Yadda.localisation.English.library()
        .given('a calculator', function(next) {
            calc = Calculator();
            next();
        })
        .when('the calculator computes PI', function(next) {
            calc.pi();
            next();
        })
        .when(/^the calculator adds up ([\d\.]+) and ([\d\.]+)$/, function (n1, n2, next) {
            calc.push(n1);
            calc.push(n2);
            calc.push('+');
            next();
        })
        .when(/^the calculator adds up "([^"]*)" and "([^"]*)"$/, function (n1, n2, next) {
            calc.push(parseInt(n1));
            calc.push(parseInt(n2));
            calc.push('+');
            next();
        })
        .when('the calculator adds up "$N1", "$N2" and "$N3"', function(n1, n2, n3, next) {
            calc.push(parseInt(n1));
            calc.push(parseInt(n2));
            calc.push(parseInt(n3));
            calc.push('+');
            calc.push('+');
            next();
        })
        .when('the calculator adds up the following numbers:', function(numbers, next) {
            numbers     = numbers.split('\n');
            var len     = numbers.length;
            var operate = false;
            for(var i = 0; i < len; i++) {
                var number = numbers[i];
                calc.push(number);
                operate ? calc.push('+') : operate = true;
            }
            next();
        })
        .then('the calculator returns PI', function(next) {
            var value = calc.value();
            if (!isNumberWithinRangeOfValue(value, 0.00001, Math.PI))
                throw(new Error('Expected ' + Math.PI + ' (PI), got ' + value));
                next();
        })
        .then('the calculator returns "$NUM"', function(expected_number, next) {
            var value = calc.value();
            if (!isNumberWithinRangeOfValue(value, 0.00001, parseFloat(expected_number)))
                throw(new Error('Expected calculator to return a value within 0.00001 of ' + expected_number + ', got ' + value));
                next();
        })
        .then(/^the calculator does not return ([\d\.]+)$/, function(unexpected_number, next) {
            var value = calc.value();
            if (isNumberWithinRangeOfValue(value, 0.00001, parseFloat(unexpected_number)))
                throw(new Error('Expected calculator to not return a value within 0.00001 of ' + unexpected_number + ', got ' + value));
                next();
        });

    return library;

})();


