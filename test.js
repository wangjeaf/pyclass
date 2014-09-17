var Class = require('./index.js')

var A = new Class(function() {
    this.a = function(self) {
        console.log(self._a);
    }

    this.b = function(self, b) {
        console.log(self._b)
        self._b = b;
    }

    this.__init__ = function(self, a, b) {
        self._a = a;
        self._b = b;
    }

    this.__static__ = {
        methodA: function(a) {
            console.log('a ' + a)
        },
        methodB: function(b) {
            console.log('b ' + b)
        }
    }
})

var B = new Class(A, function() {
    this.__init__ = function(self, a, b) {
        this.parent(a, b);
    }
    
    this.a = function(self) {
        this.parent()
    }
})

var a = new A(1,2);
a.a()
a.b(1);
A.methodA(1);
A.methodB(2)

var b = new B(3, 4);
b.a()
b.b()
