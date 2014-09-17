# PyClass - Write Python Class in JS

Write Python style class in JS, compatible for Nodejs and Browsers.

## Install

`npm install pyclass`

`bower install pyclass`

## Features

- `new Class(Parent, function(){})` Simple Class definition
- `self` Auto-binded, avoid `this`
- `__init__` Clear initializer
- `__static__` Add static member for Class in a simple way.
- `parent()` Call parent method as you wish

## Usage & Demo

```javascript

var Class = require('pyclass')

// Person as a Class
var Person = new Class(function() {
    // __init__ is initializer
    this.__init__ = function(self, name, age) {
        self._name = name
        self._age = age
    }

    // self is not this, so is not a keyword.
    this.sayHi = function(self) {
        setTimeout(function() {
            console.log('\n\nHi, I am ' + self._name + ', I am ' + self._age + ' years old.')
        }, 100);
    }

    // add static members for Class
    this.__static__ = {
        sleep: function() {
            console.log('Haha, I am going to sleep now')
        }
    }
})

// extend from Person
var Student = new Class(Person, function() {
    this.__init__ = function(self, name, age, school) {
        // call parent init method
        self.parent(name, age)
        self._school = school
    }

    this.sayHi = function(self) {
        // call parent sayHi
        self.parent();
        setTimeout(function() {
            console.log('And now, I am a student in ' + self._school)
        }, 100);
    }
})


var james = new Person('James', 2);
james.sayHi()    // ==> Hi, I am James, I am 2 years old.

Person.sleep()   // ==> Haha, I am going to sleep now


var lily = new Student('Lily', 12, 'Some Nice High School')
lily.sayHi();    // ==> Hi, I am Lily, I am 12 years old.
                 // ==> And now, I am a student in Some Nice High School
Student.sleep()  // ==> Haha, I am going to sleep now

```

## License

`pyclass` is available under the terms of the [MIT License](https://github.com/wangjeaf/pyclass/blob/master/LICENSE.md).
