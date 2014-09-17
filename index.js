var toString = Object.prototype.toString
var slice = [].slice

function isFunction(f) {
    return toString.call(f) == '[object Function]'
}

function inherit(cls, upper) {
    function F(){}
    F.prototype = upper.prototype
    cls.prototype = new F()
    cls.prototype.constructor = cls.prototype.me = cls
    cls.__parent = cls.prototype.__parent = upper
}

var Class = function(upper, init) {
    if (arguments.length == 1) {
        init = upper
        upper = Object
    }

    cls = function() {
        if (this.__init__) {
            this.__init__.apply(this, arguments)
        }
    }

    if (upper) {
        inherit(cls, upper)
    }

    var obj = {}
    init.call(obj)

    function wrap(name, func) {
        if (!isFunction(func)) {
            return func
        }
        var wrapped = function() {
            var args = slice.call(arguments)
            // set "this" as first param
            args.unshift(this)
            return func.apply(this, args)
        }
        func.__name__ = wrapped.__name__ = name
        return wrapped
    }

    var statics = obj['__static__']
    if (statics) {
        for(var prop in statics) {
            cls[prop] = statics[prop]
        }
        delete obj['__static__']
    }

    for(var prop in obj) {
        if (prop == 'parent') {
            console.error('parent is preserved word for pyclass');
            continue;
        }
        if (!obj.hasOwnProperty(prop)) {
            continue
        }
        cls.prototype[prop] = wrap(prop, obj[prop])
    }

    cls.prototype.parent = function() {
        var name = arguments.callee.caller.__name__;
        this.__parent.prototype[name].apply(this, arguments)
    }

    return cls
}

module.exports = Class