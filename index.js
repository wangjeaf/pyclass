var Class = function(upper, init) {

    var toString = Object.prototype.toString
    var slice = [].slice

    function isFunction(f) {
        return toString.call(f) == '[object Function]'
    }

    function inherit(cls, upper) {
        function F(){}
        F.prototype = upper.prototype
        cls.prototype = new F()
        cls.prototype.constructor = cls
        cls.__parent__ = cls.prototype.__parent__ = upper

        // copy static members
        for (var prop in upper) {
            if (upper.hasOwnProperty(prop)) {
                cls[prop] = upper[prop]
            }
        }
    }

    if (arguments.length == 1) {
        init = upper
        upper = Object
    }

    var cls = function() {
        // __init__ as initializer
        this.__init__ && this.__init__.apply(this, arguments)
    }

    upper && inherit(cls, upper)

    var obj = {}

    isFunction(init) && init.call(obj)

    function wrap(name, func) {
        if (!isFunction(func)) {
            return func
        }
        var wrapped = function() {
            var args = slice.call(arguments)
            // set "this" as the first param
            args.unshift(this)
            return func.apply(this, args)
        }
        // remember func name, for finding
        func.__name__ = wrapped.__name__ = name
        return wrapped
    }

    // static members in __static__
    var statics = obj['__static__']
    if (statics) {
        for(var prop in statics) {
            cls[prop] = statics[prop]
        }
        delete obj['__static__']
    }

    for (var prop in obj) {
        if (prop == 'parent') {
            console.error('[pyclass error] parent is preserved word for pyclass');
            continue;
        }
        if (obj.hasOwnProperty(prop)) {
            // wrap function, add self as the first param
            cls.prototype[prop] = wrap(prop, obj[prop])
        }
    }

    // make self.parent() available
    cls.prototype.parent = function() {
        var name = arguments.callee.caller.__name__
        if (!name) {
            return console.error('[pyclass error] parent() should not be called in nested function')
        }
        this.__parent__.prototype[name].apply(this, arguments)
    }

    return cls
}

if (typeof module != 'undefined') {
    module.exports = Class
}