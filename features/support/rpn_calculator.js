// The MIT License
//
// Copyright (c) 2011-2013 Julien Biezemans and contributors
//
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

var RpnCalculator = function RpnCalculator() {
    var stack = [];

    function x() { return stack.splice(-2, 1)[0]; }
    function y() { return stack.pop(); }

    var self = {
        push: function push(arg) {
            if (arg == '+')
                self.push(x() + y());
            else if (arg == '-')
                self.push(x() - y());
            else if (arg == '*')
                self.push(x() * y());
            else if (arg == '/')
                self.push(x() / y());
            else
                stack.push(parseFloat(arg));
        },

        pi: function pi() {
            self.push(Math.PI);
        },

        value: function value() {
            return stack[stack.length-1];
        }
    };
    return self;
};
module.exports = RpnCalculator;
