/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var avalon = __webpack_require__(1)
	__webpack_require__(2)
	var $ = __webpack_require__(11)
	avalon.define({
	    $id: "test",
	    aaa: "Hello Avalon!"
	})
	// 具体参考这里 https://github.com/RubyLouvre/avalon.oniui/blob/master/accordion/avalon.accordion.ex1.html
	avalon.define({
	    $id: "test",
	    aaa: "Hello Avalon!",
	    
	})
	$(function(){
	    $("<div>这是jQuery生成的</div>").appendTo("body")
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*==================================================
	 Copyright (c) 2013-2015 司徒正美 and other contributors
	 http://www.cnblogs.com/rubylouvre/
	 https://github.com/RubyLouvre
	 http://weibo.com/jslouvre/
	 
	 Released under the MIT license
	 avalon.shim.js(无加载器版本) 1.45 built in 2015.7.13
	 support IE6+ and other browsers
	 ==================================================*/
	(function(global, factory) {

	    if (typeof module === "object" && typeof module.exports === "object") {
	        // For CommonJS and CommonJS-like environments where a proper `window`
	        // is present, execute the factory and get avalon.
	        // For environments that do not have a `window` with a `document`
	        // (such as Node.js), expose a factory as module.exports.
	        // This accentuates the need for the creation of a real `window`.
	        // e.g. var avalon = require("avalon")(window);
	        module.exports = global.document ? factory(global, true) : function(w) {
	            if (!w.document) {
	                throw new Error("Avalon requires a window with a document")
	            }
	            return factory(w)
	        }
	    } else {
	        factory(global)
	    }

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function(window, noGlobal){

	/*********************************************************************
	 *                    全局变量及方法                                  *
	 **********************************************************************/
	var expose = new Date() - 0
	//http://stackoverflow.com/questions/7290086/javascript-use-strict-and-nicks-find-global-function
	var DOC = window.document
	var head = DOC.getElementsByTagName("head")[0] //HEAD元素
	var ifGroup = head.insertBefore(document.createElement("avalon"), head.firstChild) //避免IE6 base标签BUG
	ifGroup.innerHTML = "X<style id='avalonStyle'>.avalonHide{ display: none!important }</style>"
	ifGroup.setAttribute("ms-skip", "1")
	ifGroup.className = "avalonHide"
	var rnative = /\[native code\]/ //判定是否原生函数
	function log() {
	    if (window.console && avalon.config.debug) {
	        // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
	        Function.apply.call(console.log, console, arguments)
	    }
	}


	var subscribers = "$" + expose
	var otherRequire = window.require
	var otherDefine = window.define
	var innerRequire
	var stopRepeatAssign = false
	var rword = /[^, ]+/g //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
	var rcomplexType = /^(?:object|array)$/
	var rsvg = /^\[object SVG\w*Element\]$/
	var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
	var oproto = Object.prototype
	var ohasOwn = oproto.hasOwnProperty
	var serialize = oproto.toString
	var ap = Array.prototype
	var aslice = ap.slice
	var Registry = {} //将函数曝光到此对象上，方便访问器收集依赖
	var W3C = window.dispatchEvent
	var root = DOC.documentElement
	var avalonFragment = DOC.createDocumentFragment()
	var cinerator = DOC.createElement("div")
	var class2type = {}
	"Boolean Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
	    class2type["[object " + name + "]"] = name.toLowerCase()
	})


	function noop() {
	}


	function oneObject(array, val) {
	    if (typeof array === "string") {
	        array = array.match(rword) || []
	    }
	    var result = {},
	            value = val !== void 0 ? val : 1
	    for (var i = 0, n = array.length; i < n; i++) {
	        result[array[i]] = value
	    }
	    return result
	}

	//生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	var generateID = function (prefix) {
	    prefix = prefix || "avalon"
	    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
	}
	function IE() {
	    if (window.VBArray) {
	        var mode = document.documentMode
	        return mode ? mode : window.XMLHttpRequest ? 7 : 6
	    } else {
	        return NaN
	    }
	}
	var IEVersion = IE()

	avalon = function (el) { //创建jQuery式的无new 实例化结构
	    return new avalon.init(el)
	}

	avalon.profile = function () {
	    if (window.console && avalon.config.profile) {
	        Function.apply.call(console.log, console, arguments)
	    }
	}

	/*视浏览器情况采用最快的异步回调*/
	avalon.nextTick = new function () {// jshint ignore:line
	    var tickImmediate = window.setImmediate
	    var tickObserver = window.MutationObserver
	    var tickPost = W3C && window.postMessage
	    if (tickImmediate) {
	        return tickImmediate.bind(window)
	    }

	    var queue = []
	    function callback() {
	        var n = queue.length
	        for (var i = 0; i < n; i++) {
	            queue[i]()
	        }
	        queue = queue.slice(n)
	    }

	    if (tickObserver) {
	        var node = document.createTextNode("avalon")
	        new tickObserver(callback).observe(node, {characterData: true})// jshint ignore:line
	        return function (fn) {
	            queue.push(fn)
	            node.data = Math.random()
	        }
	    }

	    if (tickPost) {
	        window.addEventListener("message", function (e) {
	            var source = e.source
	            if ((source === window || source === null) && e.data === "process-tick") {
	                e.stopPropagation()
	                callback()
	            }
	        })

	        return function (fn) {
	            queue.push(fn)
	            window.postMessage('process-tick', '*')
	        }
	    }

	    return function (fn) {
	        setTimeout(fn, 0)
	    }
	}// jshint ignore:line
	/*********************************************************************
	 *                 avalon的静态方法定义区                              *
	 **********************************************************************/
	avalon.init = function (el) {
	    this[0] = this.element = el
	}
	avalon.fn = avalon.prototype = avalon.init.prototype

	avalon.type = function (obj) { //取得目标的类型
	    if (obj == null) {
	        return String(obj)
	    }
	    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	    return typeof obj === "object" || typeof obj === "function" ?
	            class2type[serialize.call(obj)] || "object" :
	            typeof obj
	}

	var isFunction = typeof alert === "object" ? function (fn) {
	    try {
	        return /^\s*\bfunction\b/.test(fn + "")
	    } catch (e) {
	        return false
	    }
	} : function (fn) {
	    return serialize.call(fn) === "[object Function]"
	}
	avalon.isFunction = isFunction

	avalon.isWindow = function (obj) {
	    if (!obj)
	        return false
	    // 利用IE678 window == document为true,document == window竟然为false的神奇特性
	    // 标准浏览器及IE9，IE10等使用 正则检测
	    return obj == obj.document && obj.document != obj //jshint ignore:line
	}

	function isWindow(obj) {
	    return rwindow.test(serialize.call(obj))
	}
	if (isWindow(window)) {
	    avalon.isWindow = isWindow
	}
	var enu
	for (enu in avalon({})) {
	    break
	}
	var enumerateBUG = enu !== "0" //IE6下为true, 其他为false
	/*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	avalon.isPlainObject = function (obj, key) {
	    if (!obj || avalon.type(obj) !== "object" || obj.nodeType || avalon.isWindow(obj)) {
	        return false;
	    }
	    try { //IE内置对象没有constructor
	        if (obj.constructor && !ohasOwn.call(obj, "constructor") && !ohasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	            return false;
	        }
	    } catch (e) { //IE8 9会在这里抛错
	        return false;
	    }
	    if (enumerateBUG) {
	        for (key in obj) {
	            return ohasOwn.call(obj, key)
	        }
	    }
	    for (key in obj) {
	    }
	    return key === void 0 || ohasOwn.call(obj, key)
	}
	if (rnative.test(Object.getPrototypeOf)) {
	    avalon.isPlainObject = function (obj) {
	        // 简单的 typeof obj === "object"检测，会致使用isPlainObject(window)在opera下通不过
	        return serialize.call(obj) === "[object Object]" && Object.getPrototypeOf(obj) === oproto
	    }
	}
	//与jQuery.extend方法，可用于浅拷贝，深拷贝
	avalon.mix = avalon.fn.mix = function () {
	    var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false

	    // 如果第一个参数为布尔,判定是否深拷贝
	    if (typeof target === "boolean") {
	        deep = target
	        target = arguments[1] || {}
	        i++
	    }

	    //确保接受方为一个复杂的数据类型
	    if (typeof target !== "object" && !isFunction(target)) {
	        target = {}
	    }

	    //如果只有一个参数，那么新成员添加于mix所在的对象上
	    if (i === length) {
	        target = this
	        i--
	    }

	    for (; i < length; i++) {
	        //只处理非空参数
	        if ((options = arguments[i]) != null) {
	            for (name in options) {
	                src = target[name]
	                try {
	                    copy = options[name] //当options为VBS对象时报错
	                } catch (e) {
	                    continue
	                }

	                // 防止环引用
	                if (target === copy) {
	                    continue
	                }
	                if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false
	                        clone = src && Array.isArray(src) ? src : []

	                    } else {
	                        clone = src && avalon.isPlainObject(src) ? src : {}
	                    }

	                    target[name] = avalon.mix(deep, clone, copy)
	                } else if (copy !== void 0) {
	                    target[name] = copy
	                }
	            }
	        }
	    }
	    return target
	}

	function _number(a, len) { //用于模拟slice, splice的效果
	    a = Math.floor(a) || 0
	    return a < 0 ? Math.max(len + a, 0) : Math.min(a, len);
	}
	avalon.mix({
	    rword: rword,
	    subscribers: subscribers,
	    version: 1.45,
	    ui: {},
	    log: log,
	    slice: W3C ? function (nodes, start, end) {
	        return aslice.call(nodes, start, end)
	    } : function (nodes, start, end) {
	        var ret = []
	        var len = nodes.length
	        if (end === void 0)
	            end = len
	        if (typeof end === "number" && isFinite(end)) {
	            start = _number(start, len)
	            end = _number(end, len)
	            for (var i = start; i < end; ++i) {
	                ret[i - start] = nodes[i]
	            }
	        }
	        return ret
	    },
	    noop: noop,
	    /*如果不用Error对象封装一下，str在控制台下可能会乱码*/
	    error: function (str, e) {
	        throw  (e || Error)(str)
	    },
	    /*将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象*/
	    oneObject: oneObject,
	    /* avalon.range(10)
	     => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	     avalon.range(1, 11)
	     => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	     avalon.range(0, 30, 5)
	     => [0, 5, 10, 15, 20, 25]
	     avalon.range(0, -10, -1)
	     => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	     avalon.range(0)
	     => []*/
	    range: function (start, end, step) { // 用于生成整数数组
	        step || (step = 1)
	        if (end == null) {
	            end = start || 0
	            start = 0
	        }
	        var index = -1,
	                length = Math.max(0, Math.ceil((end - start) / step)),
	                result = new Array(length)
	        while (++index < length) {
	            result[index] = start
	            start += step
	        }
	        return result
	    },
	    eventHooks: [],
	    /*绑定事件*/
	    bind: function(el, type, fn, phase) {
	        var hooks = avalon.eventHooks
	        var hook = hooks[type]
	        if (typeof hook === "object") {
	            type = hook.type
	            if (hook.deel) {
	                 fn = hook.deel(el, type, fn, phase)
	            }
	        }
	        var callback = W3C ? fn : function(e) {
	            fn.call(el, fixEvent(e));
	        }
	        if (W3C) {
	            el.addEventListener(type, callback, !!phase)
	        } else {
	            el.attachEvent("on" + type, callback)
	        }
	        return callback
	    },
	    /*卸载事件*/
	    unbind: function(el, type, fn, phase) {
	        var hooks = avalon.eventHooks
	        var hook = hooks[type]
	        var callback = fn || noop
	        if (typeof hook === "object") {
	            type = hook.type
	            if (hook.deel) {
	                fn = hook.deel(el, type, fn, false)
	            }
	        }
	        if (W3C) {
	            el.removeEventListener(type, callback, !!phase)
	        } else {
	            el.detachEvent("on" + type, callback)
	        }
	    },
	    /*读写删除元素节点的样式*/
	    css: function (node, name, value) {
	        if (node instanceof avalon) {
	            node = node[0]
	        }
	        var prop = /[_-]/.test(name) ? camelize(name) : name, fn
	        name = avalon.cssName(prop) || prop
	        if (value === void 0 || typeof value === "boolean") { //获取样式
	            fn = cssHooks[prop + ":get"] || cssHooks["@:get"]
	            if (name === "background") {
	                name = "backgroundColor"
	            }
	            var val = fn(node, name)
	            return value === true ? parseFloat(val) || 0 : val
	        } else if (value === "") { //请除样式
	            node.style[name] = ""
	        } else { //设置样式
	            if (value == null || value !== value) {
	                return
	            }
	            if (isFinite(value) && !avalon.cssNumber[prop]) {
	                value += "px"
	            }
	            fn = cssHooks[prop + ":set"] || cssHooks["@:set"]
	            fn(node, name, value)
	        }
	    },
	    /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
	    each: function (obj, fn) {
	        if (obj) { //排除null, undefined
	            var i = 0
	            if (isArrayLike(obj)) {
	                for (var n = obj.length; i < n; i++) {
	                    if (fn(i, obj[i]) === false)
	                        break
	                }
	            } else {
	                for (i in obj) {
	                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                        break
	                    }
	                }
	            }
	        }
	    },
	    //收集元素的data-{{prefix}}-*属性，并转换为对象
	    getWidgetData: function (elem, prefix) {
	        var raw = avalon(elem).data()
	        var result = {}
	        for (var i in raw) {
	            if (i.indexOf(prefix) === 0) {
	                result[i.replace(prefix, "").replace(/\w/, function (a) {
	                    return a.toLowerCase()
	                })] = raw[i]
	            }
	        }
	        return result
	    },
	    Array: {
	        /*只有当前数组不存在此元素时只添加它*/
	        ensure: function (target, item) {
	            if (target.indexOf(item) === -1) {
	                return target.push(item)
	            }
	        },
	        /*移除数组中指定位置的元素，返回布尔表示成功与否*/
	        removeAt: function (target, index) {
	            return !!target.splice(index, 1).length
	        },
	        /*移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否*/
	        remove: function (target, item) {
	            var index = target.indexOf(item)
	            if (~index)
	                return avalon.Array.removeAt(target, index)
	            return false
	        }
	    }
	})

	var bindingHandlers = avalon.bindingHandlers = {}
	var bindingExecutors = avalon.bindingExecutors = {}

	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	function isArrayLike(obj) {
	    if (!obj)
	        return false
	    var n = obj.length
	    if (n === (n >>> 0)) { //检测length属性是否为非负整数
	        var type = serialize.call(obj).slice(8, -1)
	        if (/(?:regexp|string|function|window|global)$/i.test(type))
	            return false
	        if (type === "Array")
	            return true
	        try {
	            if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
	                return  /^\s?function/.test(obj.item || obj.callee)
	            }
	            return true
	        } catch (e) { //IE的NodeList直接抛错
	            return !obj.window //IE6-8 window
	        }
	    }
	    return false
	}


	// https://github.com/rsms/js-lru
	var Cache = new function() {// jshint ignore:line
	    function LRU(maxLength) {
	        this.size = 0
	        this.limit = maxLength
	        this.head = this.tail = void 0
	        this._keymap = {}
	    }

	    var p = LRU.prototype

	    p.put = function(key, value) {
	        var entry = {
	            key: key,
	            value: value
	        }
	        this._keymap[key] = entry
	        if (this.tail) {
	            this.tail.newer = entry
	            entry.older = this.tail
	        } else {
	            this.head = entry
	        }
	        this.tail = entry
	        if (this.size === this.limit) {
	            this.shift()
	        } else {
	            this.size++
	        }
	        return value
	    }

	    p.shift = function() {
	        var entry = this.head
	        if (entry) {
	            this.head = this.head.newer
	            this.head.older =
	                    entry.newer =
	                    entry.older =
	                    this._keymap[entry.key] = void 0
	        }
	    }
	    p.get = function(key) {
	        var entry = this._keymap[key]
	        if (entry === void 0)
	            return
	        if (entry === this.tail) {
	            return  entry.value
	        }
	        // HEAD--------------TAIL
	        //   <.older   .newer>
	        //  <--- add direction --
	        //   A  B  C  <D>  E
	        if (entry.newer) {
	            if (entry === this.head) {
	                this.head = entry.newer
	            }
	            entry.newer.older = entry.older // C <-- E.
	        }
	        if (entry.older) {
	            entry.older.newer = entry.newer // C. --> E
	        }
	        entry.newer = void 0 // D --x
	        entry.older = this.tail // D. --> E
	        if (this.tail) {
	            this.tail.newer = entry // E. <-- D
	        }
	        this.tail = entry
	        return entry.value
	    }
	    return LRU
	}// jshint ignore:line

	/*********************************************************************
	 *                         javascript 底层补丁                       *
	 **********************************************************************/
	if (!"司徒正美".trim) {
	    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	    String.prototype.trim = function () {
	        return this.replace(rtrim, "")
	    }
	}
	var hasDontEnumBug = !({
	    'toString': null
	}).propertyIsEnumerable('toString'),
	        hasProtoEnumBug = (function () {
	        }).propertyIsEnumerable('prototype'),
	        dontEnums = [
	            "toString",
	            "toLocaleString",
	            "valueOf",
	            "hasOwnProperty",
	            "isPrototypeOf",
	            "propertyIsEnumerable",
	            "constructor"
	        ],
	        dontEnumsLength = dontEnums.length;
	if (!Object.keys) {
	    Object.keys = function (object) { //ecma262v5 15.2.3.14
	        var theKeys = []
	        var skipProto = hasProtoEnumBug && typeof object === "function"
	        if (typeof object === "string" || (object && object.callee)) {
	            for (var i = 0; i < object.length; ++i) {
	                theKeys.push(String(i))
	            }
	        } else {
	            for (var name in object) {
	                if (!(skipProto && name === "prototype") && ohasOwn.call(object, name)) {
	                    theKeys.push(String(name))
	                }
	            }
	        }

	        if (hasDontEnumBug) {
	            var ctor = object.constructor,
	                    skipConstructor = ctor && ctor.prototype === object
	            for (var j = 0; j < dontEnumsLength; j++) {
	                var dontEnum = dontEnums[j]
	                if (!(skipConstructor && dontEnum === "constructor") && ohasOwn.call(object, dontEnum)) {
	                    theKeys.push(dontEnum)
	                }
	            }
	        }
	        return theKeys
	    }
	}
	if (!Array.isArray) {
	    Array.isArray = function (a) {
	        return serialize.call(a) === "[object Array]"
	    }
	}

	if (!noop.bind) {
	    Function.prototype.bind = function (scope) {
	        if (arguments.length < 2 && scope === void 0)
	            return this
	        var fn = this,
	                argv = arguments
	        return function () {
	            var args = [],
	                    i
	            for (i = 1; i < argv.length; i++)
	                args.push(argv[i])
	            for (i = 0; i < arguments.length; i++)
	                args.push(arguments[i])
	            return fn.apply(scope, args)
	        }
	    }
	}

	function iterator(vars, body, ret) {
	    var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' + body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') + '}' + ret
	    /* jshint ignore:start */
	    return Function("fn,scope", fun)
	    /* jshint ignore:end */
	}
	if (!rnative.test([].map)) {
	    avalon.mix(ap, {
	        //定位操作，返回数组中第一个等于给定参数的元素的索引值。
	        indexOf: function (item, index) {
	            var n = this.length,
	                    i = ~~index
	            if (i < 0)
	                i += n
	            for (; i < n; i++)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //定位操作，同上，不过是从后遍历。
	        lastIndexOf: function (item, index) {
	            var n = this.length,
	                    i = index == null ? n - 1 : index
	            if (i < 0)
	                i = Math.max(0, n + i)
	            for (; i >= 0; i--)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
	        forEach: iterator("", '_', ""),
	        //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
	        filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
	        //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
	        map: iterator('r=[],', 'r[i]=_', 'return r'),
	        //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
	        some: iterator("", 'if(_)return true', 'return false'),
	        //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
	        every: iterator("", 'if(!_)return false', 'return true')
	    })
	}
	/*********************************************************************
	 *                           DOM 底层补丁                             *
	 **********************************************************************/

	function fixContains(root, el) {
	    try { //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
	        while ((el = el.parentNode))
	            if (el === root)
	                return true
	        return false
	    } catch (e) {
	        return false
	    }
	}
	avalon.contains = fixContains
	//IE6-11的文档对象没有contains
	if (!DOC.contains) {
	    DOC.contains = function (b) {
	        return fixContains(DOC, b)
	    }
	}

	function outerHTML() {
	    return new XMLSerializer().serializeToString(this)
	}

	if (window.SVGElement) {
	    //safari5+是把contains方法放在Element.prototype上而不是Node.prototype
	    if (!DOC.createTextNode("x").contains) {
	        Node.prototype.contains = function (arg) {//IE6-8没有Node对象
	            return !!(this.compareDocumentPosition(arg) & 16)
	        }
	    }
	    var svgns = "http://www.w3.org/2000/svg"
	    var svg = DOC.createElementNS(svgns, "svg")
	    svg.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />'
	    if (!rsvg.test(svg.firstChild)) { // #409
	        function enumerateNode(node, targetNode) {// jshint ignore:line
	            if (node && node.childNodes) {
	                var nodes = node.childNodes
	                for (var i = 0, el; el = nodes[i++]; ) {
	                    if (el.tagName) {
	                        var svg = DOC.createElementNS(svgns,
	                                el.tagName.toLowerCase())
	                        ap.forEach.call(el.attributes, function (attr) {
	                            svg.setAttribute(attr.name, attr.value) //复制属性
	                        })// jshint ignore:line
	                        // 递归处理子节点
	                        enumerateNode(el, svg)
	                        targetNode.appendChild(svg)
	                    }
	                }
	            }
	        }
	        Object.defineProperties(SVGElement.prototype, {
	            "outerHTML": {//IE9-11,firefox不支持SVG元素的innerHTML,outerHTML属性
	                enumerable: true,
	                configurable: true,
	                get: outerHTML,
	                set: function (html) {
	                    var tagName = this.tagName.toLowerCase(),
	                            par = this.parentNode,
	                            frag = avalon.parseHTML(html)
	                    // 操作的svg，直接插入
	                    if (tagName === "svg") {
	                        par.insertBefore(frag, this)
	                        // svg节点的子节点类似
	                    } else {
	                        var newFrag = DOC.createDocumentFragment()
	                        enumerateNode(frag, newFrag)
	                        par.insertBefore(newFrag, this)
	                    }
	                    par.removeChild(this)
	                }
	            },
	            "innerHTML": {
	                enumerable: true,
	                configurable: true,
	                get: function () {
	                    var s = this.outerHTML
	                    var ropen = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i")
	                    var rclose = new RegExp("<\/" + this.nodeName + ">$", "i")
	                    return s.replace(ropen, "").replace(rclose, "")
	                },
	                set: function (html) {
	                    if (avalon.clearHTML) {
	                        avalon.clearHTML(this)
	                        var frag = avalon.parseHTML(html)
	                        enumerateNode(frag, this)
	                    }
	                }
	            }
	        })
	    }
	}
	if (!root.outerHTML && window.HTMLElement) { //firefox 到11时才有outerHTML
	    HTMLElement.prototype.__defineGetter__("outerHTML", outerHTML);
	}


	//============================= event binding =======================
	var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/
	function fixEvent(event) {
	    var ret = {}
	    for (var i in event) {
	        ret[i] = event[i]
	    }
	    var target = ret.target = event.srcElement
	    if (event.type.indexOf("key") === 0) {
	        ret.which = event.charCode != null ? event.charCode : event.keyCode
	    } else if (rmouseEvent.test(event.type)) {
	        var doc = target.ownerDocument || DOC
	        var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement
	        ret.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
	        ret.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
	        ret.wheelDeltaY = ret.wheelDelta
	        ret.wheelDeltaX = 0
	    }
	    ret.timeStamp = new Date() - 0
	    ret.originalEvent = event
	    ret.preventDefault = function () { //阻止默认行为
	        event.returnValue = false
	    }
	    ret.stopPropagation = function () { //阻止事件在DOM树中的传播
	        event.cancelBubble = true
	    }
	    return ret
	}

	var eventHooks = avalon.eventHooks
	//针对firefox, chrome修正mouseenter, mouseleave
	if (!("onmouseenter" in root)) {
	    avalon.each({
	        mouseenter: "mouseover",
	        mouseleave: "mouseout"
	    }, function (origType, fixType) {
	        eventHooks[origType] = {
	            type: fixType,
	            deel: function (elem, _, fn) {
	                return function (e) {
	                    var t = e.relatedTarget
	                    if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
	                        delete e.type
	                        e.type = origType
	                        return fn.call(elem, e)
	                    }
	                }
	            }
	        }
	    })
	}
	//针对IE9+, w3c修正animationend
	avalon.each({
	    AnimationEvent: "animationend",
	    WebKitAnimationEvent: "webkitAnimationEnd"
	}, function (construct, fixType) {
	    if (window[construct] && !eventHooks.animationend) {
	        eventHooks.animationend = {
	            type: fixType
	        }
	    }
	})
	//针对IE6-8修正input
	if (!("oninput" in DOC.createElement("input"))) {
	    eventHooks.input = {
	        type: "propertychange",
	        deel: function (elem, _, fn) {
	            return function (e) {
	                if (e.propertyName === "value") {
	                    e.type = "input"
	                    return fn.call(elem, e)
	                }
	            }
	        }
	    }
	}
	if (DOC.onmousewheel === void 0) {
	    /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	     firefox DOMMouseScroll detail 下3 上-3
	     firefox wheel detlaY 下3 上-3
	     IE9-11 wheel deltaY 下40 上-40
	     chrome wheel deltaY 下100 上-100 */
	    var fixWheelType = DOC.onwheel !== void 0 ? "wheel" : "DOMMouseScroll"
	    var fixWheelDelta = fixWheelType === "wheel" ? "deltaY" : "detail"
	    eventHooks.mousewheel = {
	        type: fixWheelType,
	        deel: function (elem, _, fn) {
	            return function (e) {
	                e.wheelDeltaY = e.wheelDelta = e[fixWheelDelta] > 0 ? -120 : 120
	                e.wheelDeltaX = 0
	                if (Object.defineProperty) {
	                    Object.defineProperty(e, "type", {
	                        value: "mousewheel"
	                    })
	                }
	                fn.call(elem, e)
	            }
	        }
	    }
	}



	/*********************************************************************
	 *                           配置系统                                 *
	 **********************************************************************/

	function kernel(settings) {
	    for (var p in settings) {
	        if (!ohasOwn.call(settings, p))
	            continue
	        var val = settings[p]
	        if (typeof kernel.plugins[p] === "function") {
	            kernel.plugins[p](val)
	        } else if (typeof kernel[p] === "object") {
	            avalon.mix(kernel[p], val)
	        } else {
	            kernel[p] = val
	        }
	    }
	    return this
	}
	var openTag, closeTag, rexpr, rexprg, rbind, rregexp = /[-.*+?^${}()|[\]\/\\]/g

	function escapeRegExp(target) {
	    //http://stevenlevithan.com/regex/xregexp/
	    //将字符串安全格式化为正则表达式的源码
	    return (target + "").replace(rregexp, "\\$&")
	}

	var plugins = {
	    loader: function (builtin) {
	        var flag = innerRequire && builtin
	        window.require = flag ? innerRequire : otherRequire
	        window.define = flag ? innerRequire.define : otherDefine
	    },
	    interpolate: function (array) {
	        openTag = array[0]
	        closeTag = array[1]
	        if (openTag === closeTag) {
	            throw new SyntaxError("openTag!==closeTag")
	            var test = openTag + "test" + closeTag
	            cinerator.innerHTML = test
	            if (cinerator.innerHTML !== test && cinerator.innerHTML.indexOf("&lt;") > -1) {
	                throw new SyntaxError("此定界符不合法")
	            }
	            cinerator.innerHTML = ""
	        }
	        var o = escapeRegExp(openTag),
	                c = escapeRegExp(closeTag)
	        rexpr = new RegExp(o + "(.*?)" + c)
	        rexprg = new RegExp(o + "(.*?)" + c, "g")
	        rbind = new RegExp(o + ".*?" + c + "|\\sms-")
	    }
	}

	kernel.debug = true
	kernel.plugins = plugins
	kernel.plugins['interpolate'](["{{", "}}"])
	kernel.paths = {}
	kernel.shim = {}
	kernel.maxRepeatSize = 100
	avalon.config = kernel
	var ravalon = /(\w+)\[(avalonctrl)="(\S+)"\]/
	var findNodes = DOC.querySelectorAll ? function(str) {
	    return DOC.querySelectorAll(str)
	} : function(str) {
	    var match = str.match(ravalon)
	    var all = DOC.getElementsByTagName(match[1])
	    var nodes = []
	    for (var i = 0, el; el = all[i++]; ) {
	        if (el.getAttribute(match[2]) === match[3]) {
	            nodes.push(el)
	        }
	    }
	    return nodes
	}
	/*********************************************************************
	 *                            事件总线                               *
	 **********************************************************************/
	var EventBus = {
	    $watch: function (type, callback) {
	        if (typeof callback === "function") {
	            var callbacks = this.$events[type]
	            if (callbacks) {
	                callbacks.push(callback)
	            } else {
	                this.$events[type] = [callback]
	            }
	        } else { //重新开始监听此VM的第一重简单属性的变动
	            this.$events = this.$watch.backup
	        }
	        return this
	    },
	    $unwatch: function (type, callback) {
	        var n = arguments.length
	        if (n === 0) { //让此VM的所有$watch回调无效化
	            this.$watch.backup = this.$events
	            this.$events = {}
	        } else if (n === 1) {
	            this.$events[type] = []
	        } else {
	            var callbacks = this.$events[type] || []
	            var i = callbacks.length
	            while (~--i < 0) {
	                if (callbacks[i] === callback) {
	                    return callbacks.splice(i, 1)
	                }
	            }
	        }
	        return this
	    },
	    $fire: function (type) {
	        var special, i, v, callback
	        if (/^(\w+)!(\S+)$/.test(type)) {
	            special = RegExp.$1
	            type = RegExp.$2
	        }
	        var events = this.$events
	        if (!events)
	            return
	        var args = aslice.call(arguments, 1)
	        var detail = [type].concat(args)
	        if (special === "all") {
	            for (i in avalon.vmodels) {
	                v = avalon.vmodels[i]
	                if (v !== this) {
	                    v.$fire.apply(v, detail)
	                }
	            }
	        } else if (special === "up" || special === "down") {
	            var elements = events.expr ? findNodes(events.expr) : []
	            if (elements.length === 0)
	                return
	            for (i in avalon.vmodels) {
	                v = avalon.vmodels[i]
	                if (v !== this) {
	                    if (v.$events.expr) {
	                        var eventNodes = findNodes(v.$events.expr)
	                        if (eventNodes.length === 0) {
	                            continue
	                        }
	                        //循环两个vmodel中的节点，查找匹配（向上匹配或者向下匹配）的节点并设置标识
	                        /* jshint ignore:start */
	                        ap.forEach.call(eventNodes, function (node) {
	                            ap.forEach.call(elements, function (element) {
	                                var ok = special === "down" ? element.contains(node) : //向下捕获
	                                        node.contains(element) //向上冒泡
	                                if (ok) {
	                                    node._avalon = v //符合条件的加一个标识
	                                }
	                            });
	                        })
	                        /* jshint ignore:end */
	                    }
	                }
	            }
	            var nodes = DOC.getElementsByTagName("*") //实现节点排序
	            var alls = []
	            ap.forEach.call(nodes, function (el) {
	                if (el._avalon) {
	                    alls.push(el._avalon)
	                    el._avalon = ""
	                    el.removeAttribute("_avalon")
	                }
	            })
	            if (special === "up") {
	                alls.reverse()
	            }
	            for (i = 0; callback = alls[i++]; ) {
	                if (callback.$fire.apply(callback, detail) === false) {
	                    break
	                }
	            }
	        } else {
	            var callbacks = events[type] || []
	            var all = events.$all || []
	            for (i = 0; callback = callbacks[i++]; ) {
	                if (isFunction(callback))
	                    callback.apply(this, args)
	            }
	            for (i = 0; callback = all[i++]; ) {
	                if (isFunction(callback))
	                    callback.apply(this, arguments)
	            }
	        }
	    }
	}

	/*********************************************************************
	 *                           modelFactory                             *
	 **********************************************************************/
	//avalon最核心的方法的两个方法之一（另一个是avalon.scan），返回一个ViewModel(VM)
	var VMODELS = avalon.vmodels = {} //所有vmodel都储存在这里
	avalon.define = function (id, factory) {
	    var $id = id.$id || id
	    if (!$id) {
	        log("warning: vm必须指定$id")
	    }
	    if (VMODELS[$id]) {
	        log("warning: " + $id + " 已经存在于avalon.vmodels中")
	    }
	    if (typeof id === "object") {
	        var model = modelFactory(id)
	    } else {
	        var scope = {
	            $watch: noop
	        }
	        factory(scope) //得到所有定义

	        model = modelFactory(scope) //偷天换日，将scope换为model
	        stopRepeatAssign = true
	        factory(model)
	        stopRepeatAssign = false
	    }
	    model.$id = $id
	    return VMODELS[$id] = model
	}

	//一些不需要被监听的属性
	var $$skipArray = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$proxy,$reinitialize,$propertyNames").match(rword)
	var defineProperty = Object.defineProperty
	var canHideOwn = true
	//如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
	//标准浏览器使用__defineGetter__, __defineSetter__实现
	try {
	    defineProperty({}, "_", {
	        value: "x"
	    })
	    var defineProperties = Object.defineProperties
	} catch (e) {
	    canHideOwn = false
	}

	function modelFactory(source, $special, $model) {
	    if (Array.isArray(source)) {
	        var arr = source.concat()
	        source.length = 0
	        var collection = arrayFactory(source)
	        collection.pushArray(arr)
	        return collection
	    }
	    //0 null undefined || Node || VModel(fix IE6-8 createWithProxy $val: val引发的BUG)
	    if (!source || source.nodeType > 0 || (source.$id && source.$events)) {
	        return source
	    }
	    var $skipArray = Array.isArray(source.$skipArray) ? source.$skipArray : []
	    $skipArray.$special = $special || {} //强制要监听的属性
	    var $vmodel = {} //要返回的对象, 它在IE6-8下可能被偷龙转凤
	    $model = $model || {} //vmodels.$model属性
	    var $events = {} //vmodel.$events属性
	    var accessors = {} //监控属性
	    var computed = []
	    $$skipArray.forEach(function (name) {
	        delete source[name]
	    })
	    var names = Object.keys(source)
	    /* jshint ignore:start */
	    names.forEach(function (name, accessor) {
	        var val = source[name]
	        $model[name] = val
	        if (isObservable(name, val, $skipArray)) {
	            //总共产生三种accessor
	            $events[name] = []
	            var valueType = avalon.type(val)
	            //总共产生三种accessor
	            if (valueType === "object" && isFunction(val.get) && Object.keys(val).length <= 2) {
	                accessor = makeComputedAccessor(name, val)
	                computed.push(accessor)
	            } else if (rcomplexType.test(valueType)) {
	                accessor = makeComplexAccessor(name, val, valueType, $events[name])
	            } else {
	                accessor = makeSimpleAccessor(name, val)
	            }
	            accessors[name] = accessor
	        }
	    })
	    /* jshint ignore:end */

	    $vmodel = defineProperties($vmodel, descriptorFactory(accessors), source) //生成一个空的ViewModel
	    for (var i = 0; i < names.length; i++) {
	        var name = names[i]
	        if (!accessors[name]) {
	            $vmodel[name] = source[name]
	        }
	    }
	    //添加$id, $model, $events, $watch, $unwatch, $fire
	    $vmodel.$propertyNames = names.sort().join("&shy;")
	    $vmodel.$id = generateID()
	    $vmodel.$model = $model
	    $vmodel.$events = $events
	    for (i in EventBus) {
	        var fn = EventBus[i]
	        if (!W3C) { //在IE6-8下，VB对象的方法里的this并不指向自身，需要用bind处理一下
	            fn = fn.bind($vmodel)
	        }
	        $vmodel[i] = fn
	    }
	    if (canHideOwn) {
	        Object.defineProperty($vmodel, "hasOwnProperty", hasOwnDescriptor)
	    } else {
	        /* jshint ignore:start */
	        $vmodel.hasOwnProperty = function (name) {
	            return name in $vmodel.$model
	        }
	        /* jshint ignore:end */
	    }

	    $vmodel.$reinitialize = function () {
	        computed.forEach(function (accessor) {
	            delete accessor._value
	            delete accessor.oldArgs
	            accessor.digest = function () {
	                accessor.call($vmodel)
	            }
	            dependencyDetection.begin({
	                callback: function (vm, dependency) {//dependency为一个accessor
	                    var name = dependency._name
	                    if (dependency !== accessor) {
	                        var list = vm.$events[name]
	                        injectDependency(list, accessor.digest)
	                    }
	                }
	            })
	            try {
	                accessor.get.call($vmodel)
	            } finally {
	                dependencyDetection.end()
	            }
	        })
	    }
	    $vmodel.$reinitialize()
	    return $vmodel
	}

	var hasOwnDescriptor = {
	    value: function (name) {
	        return name in this.$model
	    },
	    writable: false,
	    enumerable: false,
	    configurable: true
	}
	//创建一个简单访问器
	function makeSimpleAccessor(name, value) {
	    function accessor(value) {
	        var oldValue = accessor._value
	        if (arguments.length > 0) {
	            if (!stopRepeatAssign && !isEqual(value, oldValue)) {
	                accessor.updateValue(this, value)
	                accessor.notify(this, value, oldValue)
	            }
	            return this
	        } else {
	            dependencyDetection.collectDependency(this, accessor)
	            return oldValue
	        }
	    }
	    accessorFactory(accessor, name)
	    accessor._value = value
	    return accessor;
	}

	//创建一个计算访问器
	function makeComputedAccessor(name, options) {
	    function accessor(value) {//计算属性
	        var oldValue = accessor._value
	        var init = ("_value" in accessor)
	        if (arguments.length > 0) {
	            if (stopRepeatAssign) {
	                return this
	            }
	            if (typeof accessor.set === "function") {
	                if (accessor.oldArgs !== value) {
	                    accessor.oldArgs = value
	                    var $events = this.$events
	                    var lock = $events[name]
	                    $events[name] = [] //清空回调，防止内部冒泡而触发多次$fire
	                    accessor.set.call(this, value)
	                    $events[name] = lock
	                    value = accessor.get.call(this)
	                    if (value !== oldValue) {
	                        accessor.updateValue(this, value)
	                        accessor.notify(this, value, oldValue) //触发$watch回调
	                    }
	                }
	            }
	            return this
	        } else {
	            //将依赖于自己的高层访问器或视图刷新函数（以绑定对象形式）放到自己的订阅数组中
	            //将自己注入到低层访问器的订阅数组中
	            value = accessor.get.call(this)
	            accessor.updateValue(this, value)
	            if (init && oldValue !== value) {
	                accessor.notify(this, value, oldValue) //触发$watch回调
	            }
	            return value
	        }
	    }
	    accessor.set = options.set
	    accessor.get = options.get
	    accessorFactory(accessor, name)
	    return accessor
	}

	//创建一个复杂访问器
	function makeComplexAccessor(name, initValue, valueType, list) {
	    function accessor(value) {
	        var oldValue = accessor._value

	        var son = accessor._vmodel
	        if (arguments.length > 0) {
	            if (stopRepeatAssign) {
	                return this
	            }
	            if (valueType === "array") {
	                var a = son, b = value,
	                        an = a.length,
	                        bn = b.length
	                a.$lock = true
	                if (an > bn) {
	                    a.splice(bn, an - bn)
	                } else if (bn > an) {
	                    a.push.apply(a, b.slice(an))
	                }
	                var n = Math.min(an, bn)
	                for (var i = 0; i < n; i++) {
	                    a.set(i, b[i])
	                }
	                delete a.$lock
	                a._fire("set")
	            } else if (valueType === "object") {
	                var newPropertyNames = Object.keys(value).sort().join("&shy;")
	                if (son.$propertyNames === newPropertyNames) {
	                    for (i in value) {
	                        son[i] = value[i]
	                    }
	                } else if(W3C){
	                      var a  = accessor._vmodel = modelFactory(value)
	                      a.$events = son.$events
	                } else{
	                    var $proxy = son.$proxy
	                    son = accessor._vmodel = modelFactory(value)
	                    var observes = son.$events[subscribers] = this.$events[name] || []
	                    var iterators = observes.concat()
	                    observes.length = 0
	                    son.$proxy = $proxy
	                    while (a = iterators.shift()) {
	                        var fn = bindingHandlers[a.type]
	                        if (fn) { //#753
	                            a.rollback && a.rollback() //还原 ms-with ms-on
	                            fn(a, a.vmodels)
	                        }
	                    }
	                }
	            }
	            accessor.updateValue(this, son.$model)
	            accessor.notify(this, this._value, oldValue)
	            return this
	        } else {
	            dependencyDetection.collectDependency(this, accessor)
	            return son
	        }
	    }
	    accessorFactory(accessor, name)
	    var son = accessor._vmodel = modelFactory(initValue)
	    son.$events[subscribers] = list
	    return accessor
	}

	function globalUpdateValue(vmodel, value) {
	    vmodel.$model[this._name] = this._value = value
	}

	function globalNotify(vmodel, value, oldValue) {
	    var name = this._name
	    var array = vmodel.$events[name] //刷新值
	    if (array) {
	        fireDependencies(array) //同步视图
	        EventBus.$fire.call(vmodel, name, value, oldValue) //触发$watch回调
	    }
	}

	function accessorFactory(accessor, name) {
	    accessor._name = name
	    //同时更新_value与model
	    accessor.updateValue = globalUpdateValue
	    accessor.notify = globalNotify
	}

	//比较两个值是否相等
	var isEqual = Object.is || function (v1, v2) {
	    if (v1 === 0 && v2 === 0) {
	        return 1 / v1 === 1 / v2
	    } else if (v1 !== v1) {
	        return v2 !== v2
	    } else {
	        return v1 === v2
	    }
	}

	function isObservable(name, value, $skipArray) {
	    if (isFunction(value) || value && value.nodeType) {
	        return false
	    }
	    if ($skipArray.indexOf(name) !== -1) {
	        return false
	    }
	    var $special = $skipArray.$special
	    if (name && name.charAt(0) === "$" && !$special[name]) {
	        return false
	    }
	    return true
	}

	var descriptorFactory = W3C ? function (obj) {
	    var descriptors = {}
	    for (var i in obj) {
	        descriptors[i] = {
	            get: obj[i],
	            set: obj[i],
	            enumerable: true,
	            configurable: true
	        }
	    }
	    return descriptors
	} : function (a) {
	    return a
	}

	//    function diff(newObject, oldObject) {
	//        var added = []
	//        for (var i in newObject) {
	//            if (newObject.hasOwnProperty(i)) {
	//                if (!oldObject.hasOwnerProperty(i)) {
	//                    added.push({
	//                        name: i,
	//                        value: newObject[i]
	//                    })
	//                }
	//            }
	//        }
	//        var deleted = []
	//        for (var i in newObject) {
	//            if (oldObject.hasOwnProperty(i)) {
	//                if (!newObject.hasOwnerProperty(i)) {
	//                    deleted.push( Object.getOwnPropertyDescriptor(oldObject, i).get)
	//                }
	//            }
	//        }
	//        for(var i = 0; i < added.length; i++){
	//            var a = added[i]
	//            var fn = deleted.shift()
	//            fn._name = a.name
	//            fn._value = a.value
	//        }
	//    }
	//===================修复浏览器对Object.defineProperties的支持=================
	if (!canHideOwn) {
	    if ("__defineGetter__" in avalon) {
	        defineProperty = function (obj, prop, desc) {
	            if ('value' in desc) {
	                obj[prop] = desc.value
	            }
	            if ("get" in desc) {
	                obj.__defineGetter__(prop, desc.get)
	            }
	            if ('set' in desc) {
	                obj.__defineSetter__(prop, desc.set)
	            }
	            return obj
	        }
	        defineProperties = function (obj, descs) {
	            for (var prop in descs) {
	                if (descs.hasOwnProperty(prop)) {
	                    defineProperty(obj, prop, descs[prop])
	                }
	            }
	            return obj
	        }
	    }
	    if (IEVersion) {
	        var VBClassPool = {}
	        window.execScript([// jshint ignore:line
	            "Function parseVB(code)",
	            "\tExecuteGlobal(code)",
	            "End Function" //转换一段文本为VB代码
	        ].join("\n"), "VBScript")
	        function VBMediator(instance, accessors, name, value) {// jshint ignore:line
	            var accessor = accessors[name]
	            if (arguments.length === 4) {
	                accessor.call(instance, value)
	            } else {
	                return accessor.call(instance)
	            }
	        }
	        defineProperties = function (name, accessors, properties) {
	            // jshint ignore:line
	            var buffer = []
	            buffer.push(
	                    "\r\n\tPrivate [__data__], [__proxy__]",
	                    "\tPublic Default Function [__const__](d, p)",
	                    "\t\tSet [__data__] = d: set [__proxy__] = p",
	                    "\t\tSet [__const__] = Me", //链式调用
	                    "\tEnd Function")
	            //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
	            for (name in properties) {
	                if (!accessors.hasOwnProperty(name)) {
	                    buffer.push("\tPublic [" + name + "]")
	                }
	            }
	            $$skipArray.forEach(function (name) {
	                if (!accessors.hasOwnProperty(name)) {
	                    buffer.push("\tPublic [" + name + "]")
	                }
	            })
	            buffer.push("\tPublic [" + 'hasOwnProperty' + "]")
	            //添加访问器属性 
	            for (name in accessors) {
	                buffer.push(
	                        //由于不知对方会传入什么,因此set, let都用上
	                        "\tPublic Property Let [" + name + "](val" + expose + ")", //setter
	                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
	                        "\tEnd Property",
	                        "\tPublic Property Set [" + name + "](val" + expose + ")", //setter
	                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
	                        "\tEnd Property",
	                        "\tPublic Property Get [" + name + "]", //getter
	                        "\tOn Error Resume Next", //必须优先使用set语句,否则它会误将数组当字符串返回
	                        "\t\tSet[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
	                        "\tIf Err.Number <> 0 Then",
	                        "\t\t[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
	                        "\tEnd If",
	                        "\tOn Error Goto 0",
	                        "\tEnd Property")

	            }

	            buffer.push("End Class")
	            var body = buffer.join("\r\n")
	            var className =VBClassPool[body]   
	            if (!className) {
	                className = generateID("VBClass")
	                window.parseVB("Class " + className + body)
	                window.parseVB([
	                    "Function " + className + "Factory(a, b)", //创建实例并传入两个关键的参数
	                    "\tDim o",
	                    "\tSet o = (New " + className + ")(a, b)",
	                    "\tSet " + className + "Factory = o",
	                    "End Function"
	                ].join("\r\n"))
	                VBClassPool[body] = className
	            }
	            var ret = window[className + "Factory"](accessors, VBMediator) //得到其产品
	            return ret //得到其产品
	        }
	    }
	}

	/*********************************************************************
	 *          监控数组（与ms-each, ms-repeat配合使用）                     *
	 **********************************************************************/

	function arrayFactory(model) {
	    var array = []
	    array.$id = generateID()
	    array.$model = model //数据模型
	    array.$events = {}
	    array.$events[subscribers] = []
	    array._ = modelFactory({
	        length: model.length
	    })
	    array._.$watch("length", function (a, b) {
	        array.$fire("length", a, b)
	    })
	    for (var i in EventBus) {
	        array[i] = EventBus[i]
	    }
	    avalon.mix(array, arrayPrototype)
	    return array
	}

	function mutateArray(method, pos, n, index, method2, pos2, n2) {
	    var oldLen = this.length, loop = 2
	    while (--loop) {
	        switch (method) {
	      case "add":
	                /* jshint ignore:start */
	                var array = this.$model.slice(pos, pos + n).map(function (el) {
	                    if (rcomplexType.test(avalon.type(el))) {
	                        return el.$id ? el : modelFactory(el, 0, el)
	                    } else {
	                        return el
	                    }
	                })
	                /* jshint ignore:end */
	                _splice.apply(this, [pos, 0].concat(array))
	                this._fire("add", pos, n)
	                break
	            case "del":
	                var ret = this._splice(pos, n)
	                this._fire("del", pos, n)
	                break
	        }
	        if (method2) {
	            method = method2
	            pos = pos2
	            n = n2
	            loop = 2
	            method2 = 0
	        }
	    }
	    this._fire("index", index)
	    if (this.length !== oldLen) {
	        this._.length = this.length
	    }
	    return ret
	}

	var _splice = ap.splice
	var arrayPrototype = {
	    _splice: _splice,
	    _fire: function (method, a, b) {
	        fireDependencies(this.$events[subscribers], method, a, b)
	    },
	    size: function () { //取得数组长度，这个函数可以同步视图，length不能
	        return this._.length
	    },
	    pushArray: function (array) {
	        var m = array.length, n = this.length
	        if (m) {
	            ap.push.apply(this.$model, array)
	            mutateArray.call(this, "add", n, m, Math.max(0, n - 1))
	        }
	        return  m + n
	    },
	    push: function () {
	        //http://jsperf.com/closure-with-arguments
	        var array = []
	        var i, n = arguments.length
	        for (i = 0; i < n; i++) {
	            array[i] = arguments[i]
	        }
	        return this.pushArray(array)
	    },
	    unshift: function () {
	        var m = arguments.length, n = this.length
	        if (m) {
	            ap.unshift.apply(this.$model, arguments)
	            mutateArray.call(this, "add", 0, m, 0)
	        }
	        return  m + n //IE67的unshift不会返回长度
	    },
	    shift: function () {
	        if (this.length) {
	            var el = this.$model.shift()
	            mutateArray.call(this, "del", 0, 1, 0)
	            return el //返回被移除的元素
	        }
	    },
	    pop: function () {
	        var n = this.length
	        if (n) {
	            var el = this.$model.pop()
	            mutateArray.call(this, "del", n - 1, 1, Math.max(0, n - 2))
	            return el //返回被移除的元素
	        }
	    },
	    splice: function (start) {
	        var m = arguments.length, args = [], change
	        var removed = _splice.apply(this.$model, arguments)
	        if (removed.length) { //如果用户删掉了元素
	            args.push("del", start, removed.length, 0)
	            change = true
	        }
	        if (m > 2) {  //如果用户添加了元素
	            if (change) {
	                args.splice(3, 1, 0, "add", start, m - 2)
	            } else {
	                args.push("add", start, m - 2, 0)
	            }
	            change = true
	        }
	        if (change) { //返回被移除的元素
	            return mutateArray.apply(this, args)
	        } else {
	            return []
	        }
	    },
	    contains: function (el) { //判定是否包含
	        return this.indexOf(el) !== -1
	    },
	    remove: function (el) { //移除第一个等于给定值的元素
	        return this.removeAt(this.indexOf(el))
	    },
	    removeAt: function (index) { //移除指定索引上的元素
	        if (index >= 0) {
	            this.$model.splice(index, 1)
	            return mutateArray.call(this, "del", index, 1, 0)
	        }
	        return  []
	    },
	    clear: function () {
	        this.$model.length = this.length = this._.length = 0 //清空数组
	        this._fire("clear", 0)
	        return this
	    },
	    removeAll: function (all) { //移除N个元素
	        if (Array.isArray(all)) {
	            for (var i = this.length - 1; i >= 0; i--) {
	                if (all.indexOf(this[i]) !== -1) {
	                    this.removeAt(i)
	                }
	            }
	        } else if (typeof all === "function") {
	            for ( i = this.length - 1; i >= 0; i--) {
	                var el = this[i]
	                if (all(el, i)) {
	                    this.removeAt(i)
	                }
	            }
	        } else {
	            this.clear()
	        }
	    },
	    ensure: function (el) {
	        if (!this.contains(el)) { //只有不存在才push
	            this.push(el)
	        }
	        return this
	    },
	    set: function (index, val) {
	        if (index >= 0) {
	            var valueType = avalon.type(val)
	            if (val && val.$model) {
	                val = val.$model
	            }
	            var target = this[index]
	            if (valueType === "object") {
	                for (var i in val) {
	                    if (target.hasOwnProperty(i)) {
	                        target[i] = val[i]
	                    }
	                }
	            } else if (valueType === "array") {
	                target.clear().push.apply(target, val)
	            } else if (target !== val) {
	                this[index] = val
	                this.$model[index] = val
	                this._fire("set", index, val)
	            }
	        }
	        return this
	    }
	}
	//相当于原来bindingExecutors.repeat 的index分支
	function resetIndex(array, pos) {
	    var last = array.length - 1
	    for (var el; el = array[pos]; pos++) {
	        el.$index = pos
	        el.$first = pos === 0
	        el.$last = pos === last
	    }
	}

	function sortByIndex(array, indexes) {
	    var map = {};
	    for (var i = 0, n = indexes.length; i < n; i++) {
	        map[i] = array[i] // preserve
	        var j = indexes[i]
	        if (j in map) {
	            array[i] = map[j]
	            delete map[j]
	        } else {
	            array[i] = array[j]
	        }
	    }
	}

	"sort,reverse".replace(rword, function (method) {
	    arrayPrototype[method] = function () {
	        var newArray = this.$model//这是要排序的新数组
	        var oldArray = newArray.concat() //保持原来状态的旧数组
	        var mask = Math.random()
	        var indexes = []
	        var hasSort
	        ap[method].apply(newArray, arguments) //排序
	        for (var i = 0, n = oldArray.length; i < n; i++) {
	            var neo = newArray[i]
	            var old = oldArray[i]
	            if (isEqual(neo, old)) {
	                indexes.push(i)
	            } else {
	                var index = oldArray.indexOf(neo)
	                indexes.push(index)//得到新数组的每个元素在旧数组对应的位置
	                oldArray[index] = mask    //屏蔽已经找过的元素
	                hasSort = true
	            }
	        }
	        if (hasSort) {
	            sortByIndex(this, indexes)
	            // sortByIndex(this.$proxy, indexes)
	            this._fire("move", indexes)
	              this._fire("index", 0)
	        }
	        return this
	    }
	})


	/*********************************************************************
	 *                           依赖调度系统                             *
	 **********************************************************************/
	//检测两个对象间的依赖关系
	var dependencyDetection = (function () {
	    var outerFrames = []
	    var currentFrame
	    return {
	        begin: function (accessorObject) {
	            //accessorObject为一个拥有callback的对象
	            outerFrames.push(currentFrame)
	            currentFrame = accessorObject
	        },
	        end: function () {
	            currentFrame = outerFrames.pop()
	        },
	        collectDependency: function (vmodel, accessor) {
	            if (currentFrame) {
	                //被dependencyDetection.begin调用
	                currentFrame.callback(vmodel, accessor);
	            }
	        }
	    };
	})()
	//将绑定对象注入到其依赖项的订阅数组中
	var ronduplex = /^(duplex|on)$/
	avalon.injectBinding = function (data) {
	    var fn = data.evaluator
	    if (fn) { //如果是求值函数
	        dependencyDetection.begin({
	            callback: function (vmodel, dependency) {
	                injectDependency(vmodel.$events[dependency._name], data)
	            }
	        })
	        try {
	            var c = ronduplex.test(data.type) ? data : fn.apply(0, data.args)
	            data.handler(c, data.element, data)
	        } catch (e) {
	            //log("warning:exception throwed in [avalon.injectBinding] " + e)
	            delete data.evaluator
	            var node = data.element
	            if (node.nodeType === 3) {
	                var parent = node.parentNode
	                if (kernel.commentInterpolate) {
	                    parent.replaceChild(DOC.createComment(data.value), node)
	                } else {
	                    node.data = openTag + (data.oneTime ? "::" : "") + data.value + closeTag
	                }
	            }
	        } finally {
	            dependencyDetection.end()
	        }
	    }
	}

	//将依赖项(比它高层的访问器或构建视图刷新函数的绑定对象)注入到订阅者数组 
	function injectDependency(list, data) {
	    if (data.oneTime)
	        return
	    if (list && avalon.Array.ensure(list, data) && data.element) {
	        injectDisposeQueue(data, list)
	    }
	}

	//通知依赖于这个访问器的订阅者更新自身
	function fireDependencies(list) {
	    if (list && list.length) {
	        if (new Date() - beginTime > 444 && typeof list[0] === "object") {
	            rejectDisposeQueue()
	        }
	        var args = aslice.call(arguments, 1)
	        for (var i = list.length, fn; fn = list[--i]; ) {
	            var el = fn.element
	            if (el && el.parentNode) {
	                try {
	                    if (fn.$repeat) {
	                        fn.handler.apply(fn, args) //处理监控数组的方法
	                    } else if (fn.type !== "on") { //事件绑定只能由用户触发,不能由程序触发
	                        var fun = fn.evaluator || noop
	                        fn.handler(fun.apply(0, fn.args || []), el, fn)

	                    }
	                } catch (e) {
	                }
	            }
	        }
	    }
	}
	/*********************************************************************
	 *                          定时GC回收机制                             *
	 **********************************************************************/
	var disposeCount = 0
	var disposeQueue = avalon.$$subscribers = []
	var beginTime = new Date()
	var oldInfo = {}
	var uuid2Node = {}
	function getUid(obj, makeID) { //IE9+,标准浏览器
	    if (!obj.uuid && !makeID) {
	        obj.uuid = ++disposeCount
	        uuid2Node[obj.uuid] = obj
	    }
	    return obj.uuid
	}
	function getNode(uuid) {
	    return uuid2Node[uuid]
	}
	//添加到回收列队中
	function injectDisposeQueue(data, list) {
	    var elem = data.element
	    if (!data.uuid) {
	        if (elem.nodeType !== 1) {
	            data.uuid = data.type + (data.pos || 0) + "-" + getUid(elem.parentNode)
	        } else {
	            data.uuid = data.name + "-" + getUid(elem)
	        }
	    }
	    var lists = data.lists || (data.lists = [])
	    avalon.Array.ensure(lists, list)
	    list.$uuid = list.$uuid || generateID()
	    if (!disposeQueue[data.uuid]) {
	        disposeQueue[data.uuid] = 1
	        disposeQueue.push(data)
	    }
	}

	function rejectDisposeQueue(data) {
	    if (avalon.optimize)
	        return
	    var i = disposeQueue.length
	    var n = i
	    var allTypes = []
	    var iffishTypes = {}
	    var newInfo = {}
	    //对页面上所有绑定对象进行分门别类, 只检测个数发生变化的类型
	    while (data = disposeQueue[--i]) {
	        var type = data.type
	        if (newInfo[type]) {
	            newInfo[type]++
	        } else {
	            newInfo[type] = 1
	            allTypes.push(type)
	        }
	    }
	    var diff = false
	    allTypes.forEach(function (type) {
	        if (oldInfo[type] !== newInfo[type]) {
	            iffishTypes[type] = 1
	            diff = true
	        }
	    })
	    i = n
	    if (diff) {
	        while (data = disposeQueue[--i]) {
	            if (!data.element)
	                continue
	            if (iffishTypes[data.type] && shouldDispose(data.element)) { //如果它没有在DOM树
	                disposeQueue.splice(i, 1)
	                delete disposeQueue[data.uuid]
	                delete uuid2Node[data.element.uuid]
	                var lists = data.lists
	                for (var k = 0, list; list = lists[k++]; ) {
	                    avalon.Array.remove(lists, list)
	                    avalon.Array.remove(list, data)
	                }
	                disposeData(data)
	            }
	        }
	    }
	    oldInfo = newInfo
	    beginTime = new Date()
	}

	function disposeData(data) {
	    data.element = null
	    data.rollback && data.rollback()
	    for (var key in data) {
	        data[key] = null
	    }
	}

	function shouldDispose(el) {
	    try {//IE下，如果文本节点脱离DOM树，访问parentNode会报错
	        if (!el.parentNode) {
	            return true
	        }
	    } catch (e) {
	        return true
	    }

	    return el.msRetain ? 0 : (el.nodeType === 1 ? !root.contains(el) : !avalon.contains(root, el))
	}

	/************************************************************************
	 *            HTML处理(parseHTML, innerHTML, clearHTML)                  *
	 ************************************************************************/
	// We have to close these tags to support XHTML 
	var tagHooks = {
	    area: [1, "<map>", "</map>"],
	    param: [1, "<object>", "</object>"],
	    col: [2, "<table><colgroup>", "</colgroup></table>"],
	    legend: [1, "<fieldset>", "</fieldset>"],
	    option: [1, "<select multiple='multiple'>", "</select>"],
	    thead: [1, "<table>", "</table>"],
	    tr: [2, "<table>", "</table>"],
	    td: [3, "<table><tr>", "</tr></table>"],
	    g: [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', '</svg>'],
	    //IE6-8在用innerHTML生成节点时，不能直接创建no-scope元素与HTML5的新标签
	    _default: W3C ? [0, "", ""] : [1, "X<div>", "</div>"] //div可以不用闭合
	}
	tagHooks.th = tagHooks.td
	tagHooks.optgroup = tagHooks.option
	tagHooks.tbody = tagHooks.tfoot = tagHooks.colgroup = tagHooks.caption = tagHooks.thead
	String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(rword, function (tag) {
	    tagHooks[tag] = tagHooks.g //处理SVG
	})
	var rtagName = /<([\w:]+)/  //取得其tagName
	var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
	var rcreate = W3C ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/ig
	var scriptTypes = oneObject(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"])
	var rnest = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/ //需要处理套嵌关系的标签
	var script = DOC.createElement("script")
	var rhtml = /<|&#?\w+;/
	avalon.parseHTML = function (html) {
	    var fragment = avalonFragment.cloneNode(false)
	    if (typeof html !== "string") {
	        return fragment
	    }
	    if (!rhtml.test(html)) {
	        fragment.appendChild(DOC.createTextNode(html))
	        return fragment
	    }
	    html = html.replace(rxhtml, "<$1></$2>").trim()
	    var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase(),
	            //取得其标签名
	            wrap = tagHooks[tag] || tagHooks._default,
	            wrapper = cinerator,
	            firstChild, neo
	    if (!W3C) { //fix IE
	        html = html.replace(rcreate, "<br class=msNoScope>$1") //在link style script等标签之前添加一个补丁
	    }
	    wrapper.innerHTML = wrap[1] + html + wrap[2]
	    var els = wrapper.getElementsByTagName("script")
	    if (els.length) { //使用innerHTML生成的script节点不会发出请求与执行text属性
	        for (var i = 0, el; el = els[i++]; ) {
	            if (scriptTypes[el.type]) {
	                //以偷龙转凤方式恢复执行脚本功能
	                neo = script.cloneNode(false) //FF不能省略参数
	                ap.forEach.call(el.attributes, function (attr) {
	                    if (attr && attr.specified) {
	                        neo[attr.name] = attr.value //复制其属性
	                        neo.setAttribute(attr.name, attr.value)
	                    }
	                })  // jshint ignore:line
	                neo.text = el.text
	                el.parentNode.replaceChild(neo, el) //替换节点
	            }
	        }
	    }
	    if (!W3C) { //fix IE
	        var target = wrap[1] === "X<div>" ? wrapper.lastChild.firstChild : wrapper.lastChild
	        if (target && target.tagName === "TABLE" && tag !== "tbody") {
	            //IE6-7处理 <thead> --> <thead>,<tbody>
	            //<tfoot> --> <tfoot>,<tbody>
	            //<table> --> <table><tbody></table>
	            for (els = target.childNodes, i = 0; el = els[i++]; ) {
	                if (el.tagName === "TBODY" && !el.innerHTML) {
	                    target.removeChild(el)
	                    break
	                }
	            }
	        }
	        els = wrapper.getElementsByTagName("br")
	        var n = els.length
	        while (el = els[--n]) {
	            if (el.className === "msNoScope") {
	                el.parentNode.removeChild(el)
	            }
	        }
	        for (els = wrapper.all, i = 0; el = els[i++]; ) { //fix VML
	            if (isVML(el)) {
	                fixVML(el)
	            }
	        }
	    }
	    //移除我们为了符合套嵌关系而添加的标签
	    for (i = wrap[0]; i--; wrapper = wrapper.lastChild) {
	    }
	    while (firstChild = wrapper.firstChild) { // 将wrapper上的节点转移到文档碎片上！
	        fragment.appendChild(firstChild)
	    }
	    return fragment
	}

	function isVML(src) {
	    var nodeName = src.nodeName
	    return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ""
	}

	function fixVML(node) {
	    if (node.currentStyle.behavior !== "url(#default#VML)") {
	        node.style.behavior = "url(#default#VML)"
	        node.style.display = "inline-block"
	        node.style.zoom = 1 //hasLayout
	    }
	}
	avalon.innerHTML = function (node, html) {
	    if (!W3C && (!rcreate.test(html) && !rnest.test(html))) {
	        try {
	            node.innerHTML = html
	            return
	        } catch (e) {
	        }
	    }
	    var a = this.parseHTML(html)
	    this.clearHTML(node).appendChild(a)
	}
	avalon.clearHTML = function (node) {
	    node.textContent = ""
	    while (node.firstChild) {
	        node.removeChild(node.firstChild)
	    }
	    return node
	}

	/*********************************************************************
	 *                  avalon的原型方法定义区                            *
	 **********************************************************************/

	function hyphen(target) {
	    //转换为连字符线风格
	    return target.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
	}

	function camelize(target) {
	    //提前判断，提高getStyle等的效率
	    if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
	        return target
	    }
	    //转换为驼峰风格
	    return target.replace(/[-_][^-_]/g, function(match) {
	        return match.charAt(1).toUpperCase()
	    })
	}

	var fakeClassListMethods = {
	    _toString: function() {
	        var node = this.node
	        var cls = node.className
	        var str = typeof cls === "string" ? cls : cls.baseVal
	        return str.split(/\s+/).join(" ")
	    },
	    _contains: function(cls) {
	        return (" " + this + " ").indexOf(" " + cls + " ") > -1
	    },
	    _add: function(cls) {
	        if (!this.contains(cls)) {
	            this._set(this + " " + cls)
	        }
	    },
	    _remove: function(cls) {
	        this._set((" " + this + " ").replace(" " + cls + " ", " "))
	    },
	    __set: function(cls) {
	        cls = cls.trim()
	        var node = this.node
	        if (rsvg.test(node)) {
	            //SVG元素的className是一个对象 SVGAnimatedString { baseVal="", animVal=""}，只能通过set/getAttribute操作
	            node.setAttribute("class", cls)
	        } else {
	            node.className = cls
	        }
	    } //toggle存在版本差异，因此不使用它
	}

	    function fakeClassList(node) {
	        if (!("classList" in node)) {
	            node.classList = {
	                node: node
	            }
	            for (var k in fakeClassListMethods) {
	                node.classList[k.slice(1)] = fakeClassListMethods[k]
	            }
	        }
	        return node.classList
	    }


	    "add,remove".replace(rword, function(method) {
	        avalon.fn[method + "Class"] = function(cls) {
	            var el = this[0]
	            //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	            if (cls && typeof cls === "string" && el && el.nodeType === 1) {
	                cls.replace(/\S+/g, function(c) {
	                    fakeClassList(el)[method](c)
	                })
	            }
	            return this
	        }
	    })
	    avalon.fn.mix({
	        hasClass: function(cls) {
	            var el = this[0] || {}
	            return el.nodeType === 1 && fakeClassList(el).contains(cls)
	        },
	        toggleClass: function(value, stateVal) {
	            var className, i = 0
	            var classNames = String(value).split(/\s+/)
	            var isBool = typeof stateVal === "boolean"
	            while ((className = classNames[i++])) {
	                var state = isBool ? stateVal : !this.hasClass(className)
	                this[state ? "addClass" : "removeClass"](className)
	            }
	            return this
	        },
	        attr: function(name, value) {
	            if (arguments.length === 2) {
	                this[0].setAttribute(name, value)
	                return this
	            } else {
	                return this[0].getAttribute(name)
	            }
	        },
	        data: function(name, value) {
	            name = "data-" + hyphen(name || "")
	            switch (arguments.length) {
	                case 2:
	                    this.attr(name, value)
	                    return this
	                case 1:
	                    var val = this.attr(name)
	                    return parseData(val)
	                case 0:
	                    var ret = {}
	                    ap.forEach.call(this[0].attributes, function(attr) {
	                        if (attr) {
	                            name = attr.name
	                            if (!name.indexOf("data-")) {
	                                name = camelize(name.slice(5))
	                                ret[name] = parseData(attr.value)
	                            }
	                        }
	                    })
	                    return ret
	            }
	        },
	        removeData: function(name) {
	            name = "data-" + hyphen(name)
	            this[0].removeAttribute(name)
	            return this
	        },
	        css: function(name, value) {
	            if (avalon.isPlainObject(name)) {
	                for (var i in name) {
	                    avalon.css(this, i, name[i])
	                }
	            } else {
	                var ret = avalon.css(this, name, value)
	            }
	            return ret !== void 0 ? ret : this
	        },
	        position: function() {
	            var offsetParent, offset,
	                elem = this[0],
	                parentOffset = {
	                    top: 0,
	                    left: 0
	                }
	            if (!elem) {
	                return
	            }
	            if (this.css("position") === "fixed") {
	                offset = elem.getBoundingClientRect()
	            } else {
	                offsetParent = this.offsetParent() //得到真正的offsetParent
	                offset = this.offset() // 得到正确的offsetParent
	                if (offsetParent[0].tagName !== "HTML") {
	                    parentOffset = offsetParent.offset()
	                }
	                parentOffset.top += avalon.css(offsetParent[0], "borderTopWidth", true)
	                parentOffset.left += avalon.css(offsetParent[0], "borderLeftWidth", true)

	                // Subtract offsetParent scroll positions
	                parentOffset.top -= offsetParent.scrollTop()
	                parentOffset.left -= offsetParent.scrollLeft()
	            }
	            return {
	                top: offset.top - parentOffset.top - avalon.css(elem, "marginTop", true),
	                left: offset.left - parentOffset.left - avalon.css(elem, "marginLeft", true)
	            }
	        },
	        offsetParent: function() {
	            var offsetParent = this[0].offsetParent
	            while (offsetParent && avalon.css(offsetParent, "position") === "static") {
	                offsetParent = offsetParent.offsetParent;
	            }
	            return avalon(offsetParent || root)
	        },
	        bind: function(type, fn, phase) {
	            if (this[0]) { //此方法不会链
	                return avalon.bind(this[0], type, fn, phase)
	            }
	        },
	        unbind: function(type, fn, phase) {
	            if (this[0]) {
	                avalon.unbind(this[0], type, fn, phase)
	            }
	            return this
	        },
	        val: function(value) {
	            var node = this[0]
	            if (node && node.nodeType === 1) {
	                var get = arguments.length === 0
	                var access = get ? ":get" : ":set"
	                var fn = valHooks[getValType(node) + access]
	                if (fn) {
	                    var val = fn(node, value)
	                } else if (get) {
	                    return (node.value || "").replace(/\r/g, "")
	                } else {
	                    node.value = value
	                }
	            }
	            return get ? val : this
	        }
	    })

	    function parseData(data) {
	        try {
	            if (typeof data === "object")
	                return data
	            data = data === "true" ? true :
	                data === "false" ? false :
	                data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? avalon.parseJSON(data) : data
	        } catch (e) {}
	        return data
	    }
	var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	    rvalidchars = /^[\],:{}\s]*$/,
	    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
	avalon.parseJSON = window.JSON ? JSON.parse : function(data) {
	    if (typeof data === "string") {
	        data = data.trim();
	        if (data) {
	            if (rvalidchars.test(data.replace(rvalidescape, "@")
	                .replace(rvalidtokens, "]")
	                .replace(rvalidbraces, ""))) {
	                return (new Function("return " + data))() // jshint ignore:line
	            }
	        }
	        avalon.error("Invalid JSON: " + data)
	    }
	    return data
	}

	//生成avalon.fn.scrollLeft, avalon.fn.scrollTop方法
	avalon.each({
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	}, function(method, prop) {
	    avalon.fn[method] = function(val) {
	        var node = this[0] || {}, win = getWindow(node),
	            top = method === "scrollTop"
	        if (!arguments.length) {
	            return win ? (prop in win) ? win[prop] : root[method] : node[method]
	        } else {
	            if (win) {
	                win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop())
	            } else {
	                node[method] = val
	            }
	        }
	    }
	})

	function getWindow(node) {
	    return node.window && node.document ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	}
	//=============================css相关=======================
	var cssHooks = avalon.cssHooks = {}
	var prefixes = ["", "-webkit-", "-o-", "-moz-", "-ms-"]
	var cssMap = {
	    "float": W3C ? "cssFloat" : "styleFloat"
	}
	avalon.cssNumber = oneObject("columnCount,order,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom")

	avalon.cssName = function(name, host, camelCase) {
	    if (cssMap[name]) {
	        return cssMap[name]
	    }
	    host = host || root.style
	    for (var i = 0, n = prefixes.length; i < n; i++) {
	        camelCase = camelize(prefixes[i] + name)
	        if (camelCase in host) {
	            return (cssMap[name] = camelCase)
	        }
	    }
	    return null
	}
	cssHooks["@:set"] = function(node, name, value) {
	    try { //node.style.width = NaN;node.style.width = "xxxxxxx";node.style.width = undefine 在旧式IE下会抛异常
	        node.style[name] = value
	    } catch (e) {}
	}
	if (window.getComputedStyle) {
	    cssHooks["@:get"] = function(node, name) {
	        if (!node || !node.style) {
	            throw new Error("getComputedStyle要求传入一个节点 " + node)
	        }
	        var ret, styles = getComputedStyle(node, null)
	            if (styles) {
	                ret = name === "filter" ? styles.getPropertyValue(name) : styles[name]
	                if (ret === "") {
	                    ret = node.style[name] //其他浏览器需要我们手动取内联样式
	                }
	            }
	        return ret
	    }
	    cssHooks["opacity:get"] = function(node) {
	        var ret = cssHooks["@:get"](node, "opacity")
	        return ret === "" ? "1" : ret
	    }
	} else {
	    var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i
	    var rposition = /^(top|right|bottom|left)$/
	    var ralpha = /alpha\([^)]*\)/i
	    var ie8 = !! window.XDomainRequest
	    var salpha = "DXImageTransform.Microsoft.Alpha"
	    var border = {
	        thin: ie8 ? '1px' : '2px',
	        medium: ie8 ? '3px' : '4px',
	        thick: ie8 ? '5px' : '6px'
	    }
	    cssHooks["@:get"] = function(node, name) {
	        //取得精确值，不过它有可能是带em,pc,mm,pt,%等单位
	        var currentStyle = node.currentStyle
	        var ret = currentStyle[name]
	        if ((rnumnonpx.test(ret) && !rposition.test(ret))) {
	            //①，保存原有的style.left, runtimeStyle.left,
	            var style = node.style,
	                left = style.left,
	                rsLeft = node.runtimeStyle.left
	                //②由于③处的style.left = xxx会影响到currentStyle.left，
	                //因此把它currentStyle.left放到runtimeStyle.left，
	                //runtimeStyle.left拥有最高优先级，不会style.left影响
	                node.runtimeStyle.left = currentStyle.left
	                //③将精确值赋给到style.left，然后通过IE的另一个私有属性 style.pixelLeft
	                //得到单位为px的结果；fontSize的分支见http://bugs.jquery.com/ticket/760
	                style.left = name === 'fontSize' ? '1em' : (ret || 0)
	                ret = style.pixelLeft + "px"
	                //④还原 style.left，runtimeStyle.left
	            style.left = left
	            node.runtimeStyle.left = rsLeft
	        }
	        if (ret === "medium") {
	            name = name.replace("Width", "Style")
	            //border width 默认值为medium，即使其为0"
	            if (currentStyle[name] === "none") {
	                ret = "0px"
	            }
	        }
	        return ret === "" ? "auto" : border[ret] || ret
	    }
	    cssHooks["opacity:set"] = function(node, name, value) {
	        var style = node.style
	        var opacity = isFinite(value) && value <= 1 ? "alpha(opacity=" + value * 100 + ")" : ""
	        var filter = style.filter || "";
	        style.zoom = 1
	        //不能使用以下方式设置透明度
	        //node.filters.alpha.opacity = value * 100
	        style.filter = (ralpha.test(filter) ?
	            filter.replace(ralpha, opacity) :
	            filter + " " + opacity).trim()
	        if (!style.filter) {
	            style.removeAttribute("filter")
	        }
	    }
	    cssHooks["opacity:get"] = function(node) {
	        //这是最快的获取IE透明值的方式，不需要动用正则了！
	        var alpha = node.filters.alpha || node.filters[salpha],
	            op = alpha && alpha.enabled ? alpha.opacity : 100
	        return (op / 100) + "" //确保返回的是字符串
	    }
	}

	"top,left".replace(rword, function(name) {
	    cssHooks[name + ":get"] = function(node) {
	        var computed = cssHooks["@:get"](node, name)
	        return /px$/.test(computed) ? computed :
	            avalon(node).position()[name] + "px"
	    }
	})

	var cssShow = {
	    position: "absolute",
	    visibility: "hidden",
	    display: "block"
	}

	var rdisplayswap = /^(none|table(?!-c[ea]).+)/

	    function showHidden(node, array) {
	        //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	        if (node.offsetWidth <= 0) { //opera.offsetWidth可能小于0
	            if (rdisplayswap.test(cssHooks["@:get"](node, "display"))) {
	                var obj = {
	                    node: node
	                }
	                for (var name in cssShow) {
	                    obj[name] = node.style[name]
	                    node.style[name] = cssShow[name]
	                }
	                array.push(obj)
	            }
	            var parent = node.parentNode
	            if (parent && parent.nodeType === 1) {
	                showHidden(parent, array)
	            }
	        }
	    }
	    "Width,Height".replace(rword, function(name) { //fix 481
	        var method = name.toLowerCase(),
	            clientProp = "client" + name,
	            scrollProp = "scroll" + name,
	            offsetProp = "offset" + name
	            cssHooks[method + ":get"] = function(node, which, override) {
	                var boxSizing = -4
	                if (typeof override === "number") {
	                    boxSizing = override
	                }
	                which = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
	                var ret = node[offsetProp] // border-box 0
	                if (boxSizing === 2) { // margin-box 2
	                    return ret + avalon.css(node, "margin" + which[0], true) + avalon.css(node, "margin" + which[1], true)
	                }
	                if (boxSizing < 0) { // padding-box  -2
	                    ret = ret - avalon.css(node, "border" + which[0] + "Width", true) - avalon.css(node, "border" + which[1] + "Width", true)
	                }
	                if (boxSizing === -4) { // content-box -4
	                    ret = ret - avalon.css(node, "padding" + which[0], true) - avalon.css(node, "padding" + which[1], true)
	                }
	                return ret
	            }
	        cssHooks[method + "&get"] = function(node) {
	            var hidden = [];
	            showHidden(node, hidden);
	            var val = cssHooks[method + ":get"](node)
	            for (var i = 0, obj; obj = hidden[i++];) {
	                node = obj.node
	                for (var n in obj) {
	                    if (typeof obj[n] === "string") {
	                        node.style[n] = obj[n]
	                    }
	                }
	            }
	            return val;
	        }
	        avalon.fn[method] = function(value) { //会忽视其display
	            var node = this[0]
	            if (arguments.length === 0) {
	                if (node.setTimeout) { //取得窗口尺寸,IE9后可以用node.innerWidth /innerHeight代替
	                    return node["inner" + name] || node.document.documentElement[clientProp]
	                }
	                if (node.nodeType === 9) { //取得页面尺寸
	                    var doc = node.documentElement
	                    //FF chrome    html.scrollHeight< body.scrollHeight
	                    //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                    //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                    return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
	                }
	                return cssHooks[method + "&get"](node)
	            } else {
	                return this.css(method, value)
	            }
	        }
	        avalon.fn["inner" + name] = function() {
	            return cssHooks[method + ":get"](this[0], void 0, -2)
	        }
	        avalon.fn["outer" + name] = function(includeMargin) {
	            return cssHooks[method + ":get"](this[0], void 0, includeMargin === true ? 2 : 0)
	        }
	    })
	    avalon.fn.offset = function() { //取得距离页面左右角的坐标
	        var node = this[0],
	            box = {
	                left: 0,
	                top: 0
	            }
	        if (!node || !node.tagName || !node.ownerDocument) {
	            return box
	        }
	        var doc = node.ownerDocument,
	            body = doc.body,
	            root = doc.documentElement,
	            win = doc.defaultView || doc.parentWindow
	        if (!avalon.contains(root, node)) {
	            return box
	        }
	        //http://hkom.blog1.fc2.com/?mode=m&no=750 body的偏移量是不包含margin的
	        //我们可以通过getBoundingClientRect来获得元素相对于client的rect.
	        //http://msdn.microsoft.com/en-us/library/ms536433.aspx
	        if (node.getBoundingClientRect) {
	            box = node.getBoundingClientRect() // BlackBerry 5, iOS 3 (original iPhone)
	        }
	        //chrome/IE6: body.scrollTop, firefox/other: root.scrollTop
	        var clientTop = root.clientTop || body.clientTop,
	            clientLeft = root.clientLeft || body.clientLeft,
	            scrollTop = Math.max(win.pageYOffset || 0, root.scrollTop, body.scrollTop),
	            scrollLeft = Math.max(win.pageXOffset || 0, root.scrollLeft, body.scrollLeft)
	            // 把滚动距离加到left,top中去。
	            // IE一些版本中会自动为HTML元素加上2px的border，我们需要去掉它
	            // http://msdn.microsoft.com/en-us/library/ms533564(VS.85).aspx
	            return {
	                top: box.top + scrollTop - clientTop,
	                left: box.left + scrollLeft - clientLeft
	            }
	    }

	    //==================================val相关============================

	    function getValType(elem) {
	        var ret = elem.tagName.toLowerCase()
	        return ret === "input" && /checkbox|radio/.test(elem.type) ? "checked" : ret
	    }
	var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i
	var valHooks = {
	    "option:get": IEVersion ? function(node) {
	        //在IE11及W3C，如果没有指定value，那么node.value默认为node.text（存在trim作），但IE9-10则是取innerHTML(没trim操作)
	        //specified并不可靠，因此通过分析outerHTML判定用户有没有显示定义value
	        return roption.test(node.outerHTML) ? node.value : node.text.trim()
	    } : function(node) {
	        return node.value
	    },
	    "select:get": function(node, value) {
	        var option, options = node.options,
	            index = node.selectedIndex,
	            getter = valHooks["option:get"],
	            one = node.type === "select-one" || index < 0,
	            values = one ? null : [],
	            max = one ? index + 1 : options.length,
	            i = index < 0 ? max : one ? index : 0
	        for (; i < max; i++) {
	            option = options[i]
	            //旧式IE在reset后不会改变selected，需要改用i === index判定
	            //我们过滤所有disabled的option元素，但在safari5下，如果设置select为disable，那么其所有孩子都disable
	            //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
	            if ((option.selected || i === index) && !option.disabled) {
	                value = getter(option)
	                if (one) {
	                    return value
	                }
	                //收集所有selected值组成数组返回
	                values.push(value)
	            }
	        }
	        return values
	    },
	    "select:set": function(node, values, optionSet) {
	        values = [].concat(values) //强制转换为数组
	        var getter = valHooks["option:get"]
	        for (var i = 0, el; el = node.options[i++];) {
	            if ((el.selected = values.indexOf(getter(el)) > -1)) {
	                optionSet = true
	            }
	        }
	        if (!optionSet) {
	            node.selectedIndex = -1
	        }
	    }
	}

	/*********************************************************************
	 *                          编译系统                                  *
	 **********************************************************************/
	var meta = {
	    '\b': '\\b',
	    '\t': '\\t',
	    '\n': '\\n',
	    '\f': '\\f',
	    '\r': '\\r',
	    '"': '\\"',
	    '\\': '\\\\'
	}
	var quote = window.JSON && JSON.stringify || function(str) {
	    return '"' + str.replace(/[\\\"\x00-\x1f]/g, function(a) {
	        var c = meta[a];
	        return typeof c === 'string' ? c :
	                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    }) + '"'
	}

	var keywords = [
	    "break,case,catch,continue,debugger,default,delete,do,else,false",
	    "finally,for,function,if,in,instanceof,new,null,return,switch,this",
	    "throw,true,try,typeof,var,void,while,with", /* 关键字*/
	    "abstract,boolean,byte,char,class,const,double,enum,export,extends",
	    "final,float,goto,implements,import,int,interface,long,native",
	    "package,private,protected,public,short,static,super,synchronized",
	    "throws,transient,volatile", /*保留字*/
	    "arguments,let,yield,undefined" /* ECMA 5 - use strict*/].join(",")
	var rrexpstr = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g
	var rsplit = /[^\w$]+/g
	var rkeywords = new RegExp(["\\b" + keywords.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g')
	var rnumber = /\b\d[^,]*/g
	var rcomma = /^,+|,+$/g
	var variablePool = new Cache(512)
	var getVariables = function (code) {
	    var key = "," + code.trim()
	    var ret = variablePool.get(key)
	    if (ret) {
	        return ret
	    }
	    var match = code
	            .replace(rrexpstr, "")
	            .replace(rsplit, ",")
	            .replace(rkeywords, "")
	            .replace(rnumber, "")
	            .replace(rcomma, "")
	            .split(/^$|,+/)
	    return variablePool.put(key, uniqSet(match))
	}
	/*添加赋值语句*/

	function addAssign(vars, scope, name, data) {
	    var ret = [],
	            prefix = " = " + name + "."
	    for (var i = vars.length, prop; prop = vars[--i]; ) {
	        if (scope.hasOwnProperty(prop)) {
	            ret.push(prop + prefix + prop)
	            data.vars.push(prop)
	            if (data.type === "duplex") {
	                vars.get = name + "." + prop
	            }
	            vars.splice(i, 1)
	        }
	    }
	    return ret
	}

	function uniqSet(array) {
	    var ret = [],
	            unique = {}
	    for (var i = 0; i < array.length; i++) {
	        var el = array[i]
	        var id = el && typeof el.$id === "string" ? el.$id : el
	        if (!unique[id]) {
	            unique[id] = ret.push(el)
	        }
	    }
	    return ret
	}
	//缓存求值函数，以便多次利用
	var evaluatorPool = new Cache(128)
	//取得求值函数及其传参
	var rduplex = /\w\[.*\]|\w\.\w/
	var rproxy = /(\$proxy\$[a-z]+)\d+$/
	var rthimRightParentheses = /\)\s*$/
	var rthimOtherParentheses = /\)\s*\|/g
	var rquoteFilterName = /\|\s*([$\w]+)/g
	var rpatchBracket = /"\s*\["/g
	var rthimLeftParentheses = /"\s*\(/g
	function parseFilter(val, filters) {
	    filters = filters
	            .replace(rthimRightParentheses, "")//处理最后的小括号
	            .replace(rthimOtherParentheses, function () {//处理其他小括号
	                return "],|"
	            })
	            .replace(rquoteFilterName, function (a, b) { //处理|及它后面的过滤器的名字
	                return "[" + quote(b)
	            })
	            .replace(rpatchBracket, function () {
	                return '"],["'
	            })
	            .replace(rthimLeftParentheses, function () {
	                return '",'
	            }) + "]"
	    return  "return avalon.filters.$filter(" + val + ", " + filters + ")"
	}

	function parseExpr(code, scopes, data) {
	    var dataType = data.type
	    var filters = data.filters || ""
	    var exprId = scopes.map(function (el) {
	        return String(el.$id).replace(rproxy, "$1")
	    }) + code + dataType + filters
	    var vars = getVariables(code).concat(),
	            assigns = [],
	            names = [],
	            args = [],
	            prefix = ""
	    //args 是一个对象数组， names 是将要生成的求值函数的参数
	    scopes = uniqSet(scopes)
	    data.vars = []
	    for (var i = 0, sn = scopes.length; i < sn; i++) {
	        if (vars.length) {
	            var name = "vm" + expose + "_" + i
	            names.push(name)
	            args.push(scopes[i])
	            assigns.push.apply(assigns, addAssign(vars, scopes[i], name, data))
	        }
	    }
	    if (!assigns.length && dataType === "duplex") {
	        return
	    }
	    if (dataType !== "duplex" && (code.indexOf("||") > -1 || code.indexOf("&&") > -1)) {
	        //https://github.com/RubyLouvre/avalon/issues/583
	        data.vars.forEach(function (v) {
	            var reg = new RegExp("\\b" + v + "(?:\\.\\w+|\\[\\w+\\])+", "ig")
	            code = code.replace(reg, function (_) {
	                var c = _.charAt(v.length)
	                var r = IEVersion ? code.slice(arguments[1] + _.length) : RegExp.rightContext
	                var method = /^\s*\(/.test(r)
	                if (c === "." || c === "[" || method) {//比如v为aa,我们只匹配aa.bb,aa[cc],不匹配aaa.xxx
	                    var name = "var" + String(Math.random()).replace(/^0\./, "")
	                    if (method) {//array.size()
	                        var array = _.split(".")
	                        if (array.length > 2) {
	                            var last = array.pop()
	                            assigns.push(name + " = " + array.join("."))
	                            return name + "." + last
	                        } else {
	                            return _
	                        }
	                    }
	                    assigns.push(name + " = " + _)
	                    return name
	                } else {
	                    return _
	                }
	            })
	        })
	    }
	    //---------------args----------------
	    data.args = args
	    //---------------cache----------------
	    delete data.vars
	    var fn = evaluatorPool.get(exprId) //直接从缓存，免得重复生成
	    if (fn) {
	        data.evaluator = fn
	        return
	    }
	    prefix = assigns.join(", ")
	    if (prefix) {
	        prefix = "var " + prefix
	    }
	    if (/\S/.test(filters)) { //文本绑定，双工绑定才有过滤器
	        if (!/text|html/.test(data.type)) {
	            throw Error("ms-" + data.type + "不支持过滤器")
	        }
	        code = "\nvar ret" + expose + " = " + code + ";\r\n"
	        code += parseFilter("ret" + expose, filters)
	    } else if (dataType === "duplex") { //双工绑定
	        var _body = "'use strict';\nreturn function(vvv){\n\t" +
	                prefix +
	                ";\n\tif(!arguments.length){\n\t\treturn " +
	                code +
	                "\n\t}\n\t" + (!rduplex.test(code) ? vars.get : code) +
	                "= vvv;\n} "
	        try {
	            fn = Function.apply(noop, names.concat(_body))
	            data.evaluator = evaluatorPool.put(exprId, fn)
	        } catch (e) {
	            log("debug: parse error," + e.message)
	        }
	        return
	    } else if (dataType === "on") { //事件绑定
	        if (code.indexOf("(") === -1) {
	            code += ".call(this, $event)"
	        } else {
	            code = code.replace("(", ".call(this,")
	        }
	        names.push("$event")
	        code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
	        var lastIndex = code.lastIndexOf("\nreturn")
	        var header = code.slice(0, lastIndex)
	        var footer = code.slice(lastIndex)
	        code = header + "\n" + footer
	    } else { //其他绑定
	        code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
	    }
	    try {
	        fn = Function.apply(noop, names.concat("'use strict';\n" + prefix + code))
	        data.evaluator = evaluatorPool.put(exprId, fn)
	    } catch (e) {
	        log("debug: parse error," + e.message)
	    } finally {
	        vars = assigns = names = null //释放内存
	    }
	}


	//parseExpr的智能引用代理

	function parseExprProxy(code, scopes, data, tokens, noRegister) {
	    if (Array.isArray(tokens)) {
	        code = tokens.map(function (el) {
	            return el.expr ? "(" + el.value + ")" : quote(el.value)
	        }).join(" + ")
	    }
	    parseExpr(code, scopes, data)
	    if (data.evaluator && !noRegister) {
	        data.handler = bindingExecutors[data.handlerName || data.type]
	        //方便调试
	        //这里非常重要,我们通过判定视图刷新函数的element是否在DOM树决定
	        //将它移出订阅者列表
	        avalon.injectBinding(data)
	    }
	}
	avalon.parseExprProxy = parseExprProxy
	/*********************************************************************
	 *                           扫描系统                                 *
	 **********************************************************************/

	avalon.scan = function(elem, vmodel) {
	    elem = elem || root
	    var vmodels = vmodel ? [].concat(vmodel) : []
	    scanTag(elem, vmodels)
	}

	//http://www.w3.org/TR/html5/syntax.html#void-elements
	var stopScan = oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase())

	function checkScan(elem, callback, innerHTML) {
	    var id = setTimeout(function() {
	        var currHTML = elem.innerHTML
	        clearTimeout(id)
	        if (currHTML === innerHTML) {
	            callback()
	        } else {
	            checkScan(elem, callback, currHTML)
	        }
	    })
	}


	function createSignalTower(elem, vmodel) {
	    var id = elem.getAttribute("avalonctrl") || vmodel.$id
	    elem.setAttribute("avalonctrl", id)
	    vmodel.$events.expr = elem.tagName + '[avalonctrl="' + id + '"]'
	}

	var getBindingCallback = function(elem, name, vmodels) {
	    var callback = elem.getAttribute(name)
	    if (callback) {
	        for (var i = 0, vm; vm = vmodels[i++]; ) {
	            if (vm.hasOwnProperty(callback) && typeof vm[callback] === "function") {
	                return vm[callback]
	            }
	        }
	    }
	}

	function executeBindings(bindings, vmodels) {
	    for (var i = 0, data; data = bindings[i++]; ) {
	        data.vmodels = vmodels
	        bindingHandlers[data.type](data, vmodels)
	        if (data.evaluator && data.element && data.element.nodeType === 1) { //移除数据绑定，防止被二次解析
	            //chrome使用removeAttributeNode移除不存在的特性节点时会报错 https://github.com/RubyLouvre/avalon/issues/99
	            data.element.removeAttribute(data.name)
	        }
	    }
	    bindings.length = 0
	}

	//https://github.com/RubyLouvre/avalon/issues/636
	var mergeTextNodes = IEVersion && window.MutationObserver ? function (elem) {
	    var node = elem.firstChild, text
	    while (node) {
	        var aaa = node.nextSibling
	        if (node.nodeType === 3) {
	            if (text) {
	                text.nodeValue += node.nodeValue
	                elem.removeChild(node)
	            } else {
	                text = node
	            }
	        } else {
	            text = null
	        }
	        node = aaa
	    }
	} : 0
	var roneTime = /^\s*::/
	var rmsAttr = /ms-(\w+)-?(.*)/
	var priorityMap = {
	    "if": 10,
	    "repeat": 90,
	    "data": 100,
	    "widget": 110,
	    "each": 1400,
	    "with": 1500,
	    "duplex": 2000,
	    "on": 3000
	}

	var events = oneObject("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit")
	var obsoleteAttrs = oneObject("value,title,alt,checked,selected,disabled,readonly,enabled")
	function bindingSorter(a, b) {
	    return a.priority - b.priority
	}

	function scanAttr(elem, vmodels, match) {
	    var scanNode = true
	    if (vmodels.length) {
	        var attributes = getAttributes ? getAttributes(elem) : elem.attributes
	        var bindings = []
	        var fixAttrs = []
	        var msData = {}
	        for (var i = 0, attr; attr = attributes[i++]; ) {
	            if (attr.specified) {
	                if (match = attr.name.match(rmsAttr)) {
	                    //如果是以指定前缀命名的
	                    var type = match[1]
	                    var param = match[2] || ""
	                    var value = attr.value
	                    var name = attr.name
	                    if (events[type]) {
	                        param = type
	                        type = "on"
	                    } else if (obsoleteAttrs[type]) {
	                        if (type === "enabled") {//吃掉ms-enabled绑定,用ms-disabled代替
	                            log("warning!ms-enabled或ms-attr-enabled已经被废弃")
	                            type = "disabled"
	                            value = "!(" + value + ")"
	                        }
	                        param = type
	                        type = "attr"
	                        name = "ms-" + type + "-"+ param
	                        fixAttrs.push([attr.name, name, value])
	                    }
	                    msData[name] = value
	                    if (typeof bindingHandlers[type] === "function") {
	                        var newValue = value.replace(roneTime, "")
	                        var oneTime = value !== newValue
	                        var binding = {
	                            type: type,
	                            param: param,
	                            element: elem,
	                            name: name,
	                            value: newValue,
	                            oneTime: oneTime,
	                            uuid: name+"-"+getUid(elem),
	                             //chrome与firefox下Number(param)得到的值不一样 #855
	                            priority:  (priorityMap[type] || type.charCodeAt(0) * 10 )+ (Number(param.replace(/\D/g, "")) || 0)
	                        }
	                        if (type === "html" || type === "text") {
	                            var token = getToken(value)
	                            avalon.mix(binding, token)
	                            binding.filters = binding.filters.replace(rhasHtml, function () {
	                                binding.type = "html"
	                                binding.group = 1
	                                return ""
	                            })// jshint ignore:line
	                        } else if (type === "duplex") {
	                            var hasDuplex = name
	                        } else if (name === "ms-if-loop") {
	                            binding.priority += 100
	                        }
	                        bindings.push(binding)
	                        if (type === "widget") {
	                            elem.msData = elem.msData || msData
	                        }
	                    }
	                }
	            }
	        }
	        if (bindings.length) {
	            bindings.sort(bindingSorter)
	            fixAttrs.forEach(function (arr) {
	                log("warning!请改用" + arr[1] + "代替" + arr[0] + "!")
	                elem.removeAttribute(arr[0])
	                elem.setAttribute(arr[1], arr[2])
	            })
	            //http://bugs.jquery.com/ticket/7071
	            //在IE下对VML读取type属性,会让此元素所有属性都变成<Failed>
	            if (hasDuplex) {
	                if (msData["ms-attr-checked"]) {
	                    log("warning!一个控件不能同时定义ms-attr-checked与" + hasDuplex)
	                }
	                if (msData["ms-attr-value"]) {
	                    log("warning!一个控件不能同时定义ms-attr-value与" + hasDuplex)
	                }
	            }
	            for (i = 0; binding = bindings[i]; i++) {
	                type = binding.type
	                if (rnoscanAttrBinding.test(type)) {
	                    return executeBindings(bindings.slice(0, i + 1), vmodels)
	                } else if (scanNode) {
	                    scanNode = !rnoscanNodeBinding.test(type)
	                }
	            }
	            executeBindings(bindings, vmodels)
	        }
	    }
	    if (scanNode && !stopScan[elem.tagName] && rbind.test(elem.innerHTML.replace(rlt, "<").replace(rgt, ">"))) {
	        mergeTextNodes && mergeTextNodes(elem)
	        scanNodeList(elem, vmodels) //扫描子孙元素
	    }
	}
	var rnoscanAttrBinding = /^if|widget|repeat$/
	var rnoscanNodeBinding = /^each|with|html|include$/
	//IE67下，在循环绑定中，一个节点如果是通过cloneNode得到，自定义属性的specified为false，无法进入里面的分支，
	//但如果我们去掉scanAttr中的attr.specified检测，一个元素会有80+个特性节点（因为它不区分固有属性与自定义属性），很容易卡死页面
	if (!"1" [0]) {
	    var attrPool = new Cache(512)
	    var rattrs = /\s+(ms-[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
	            rquote = /^['"]/,
	            rtag = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/i,
	            ramp = /&amp;/g
	    //IE6-8解析HTML5新标签，会将它分解两个元素节点与一个文本节点
	    //<body><section>ddd</section></body>
	    //        window.onload = function() {
	    //            var body = document.body
	    //            for (var i = 0, el; el = body.children[i++]; ) {
	    //                avalon.log(el.outerHTML)
	    //            }
	    //        }
	    //依次输出<SECTION>, </SECTION>
	    var getAttributes = function (elem) {
	        var html = elem.outerHTML
	        //处理IE6-8解析HTML5新标签的情况，及<br>等半闭合标签outerHTML为空的情况
	        if (html.slice(0, 2) === "</" || !html.trim()) {
	            return []
	        }
	        var str = html.match(rtag)[0]
	        var attributes = [],
	                match,
	                k, v
	        var ret = attrPool.get(str)
	        if (ret) {
	            return ret
	        }
	        while (k = rattrs.exec(str)) {
	            v = k[2]
	            if (v) {
	                v = (rquote.test(v) ? v.slice(1, -1) : v).replace(ramp, "&")
	            }
	            var name = k[1].toLowerCase()
	            match = name.match(rmsAttr)
	            var binding = {
	                name: name,
	                specified: true,
	                value: v || ""
	            }
	            attributes.push(binding)
	        }
	        return attrPool.put(str, attributes)
	    }
	}

	function scanNodeList(parent, vmodels) {
	    var nodes = avalon.slice(parent.childNodes)
	    scanNodeArray(nodes, vmodels)
	}

	function scanNodeArray(nodes, vmodels) {
	    for (var i = 0, node; node = nodes[i++];) {
	        switch (node.nodeType) {
	            case 1:
	                scanTag(node, vmodels) //扫描元素节点
	                if (node.msCallback) {
	                    node.msCallback()
	                    node.msCallback = void 0
	                }
	                break
	            case 3:
	               if(rexpr.test(node.nodeValue)){
	                    scanText(node, vmodels, i) //扫描文本节点
	               }
	               break
	        }
	    }
	}


	function scanTag(elem, vmodels, node) {
	    //扫描顺序  ms-skip(0) --> ms-important(1) --> ms-controller(2) --> ms-if(10) --> ms-repeat(100) 
	    //--> ms-if-loop(110) --> ms-attr(970) ...--> ms-each(1400)-->ms-with(1500)--〉ms-duplex(2000)垫后
	    var a = elem.getAttribute("ms-skip")
	    //#360 在旧式IE中 Object标签在引入Flash等资源时,可能出现没有getAttributeNode,innerHTML的情形
	    if (!elem.getAttributeNode) {
	        return log("warning " + elem.tagName + " no getAttributeNode method")
	    }
	    var b = elem.getAttributeNode("ms-important")
	    var c = elem.getAttributeNode("ms-controller")
	    if (typeof a === "string") {
	        return
	    } else if (node = b || c) {
	        var newVmodel = avalon.vmodels[node.value]
	        if (!newVmodel) {
	            return
	        }
	        //ms-important不包含父VM，ms-controller相反
	        vmodels = node === b ? [newVmodel] : [newVmodel].concat(vmodels)
	        var name = node.name
	        elem.removeAttribute(name) //removeAttributeNode不会刷新[ms-controller]样式规则
	        avalon(elem).removeClass(name)
	        createSignalTower(elem, newVmodel)
	    }
	    scanAttr(elem, vmodels) //扫描特性节点
	}
	var rhasHtml = /\|\s*html\s*/,
	        r11a = /\|\|/g,
	        rlt = /&lt;/g,
	        rgt = /&gt;/g,
	        rstringLiteral = /(['"])(\\\1|.)+?\1/g
	function getToken(value) {
	    if (value.indexOf("|") > 0) {
	        var scapegoat = value.replace(rstringLiteral, function (_) {
	            return Array(_.length + 1).join("1")// jshint ignore:line
	        })
	        var index = scapegoat.replace(r11a, "\u1122\u3344").indexOf("|") //干掉所有短路或
	        if (index > -1) {
	            return {
	                filters: value.slice(index),
	                value: value.slice(0, index),
	                expr: true
	            }
	        }
	    }
	    return {
	        value: value,
	        filters: "",
	        expr: true
	    }
	}

	function scanExpr(str) {
	    var tokens = [],
	            value, start = 0,
	            stop
	    do {
	        stop = str.indexOf(openTag, start)
	        if (stop === -1) {
	            break
	        }
	        value = str.slice(start, stop)
	        if (value) { // {{ 左边的文本
	            tokens.push({
	                value: value,
	                filters: "",
	                expr: false
	            })
	        }
	        start = stop + openTag.length
	        stop = str.indexOf(closeTag, start)
	        if (stop === -1) {
	            break
	        }
	        value = str.slice(start, stop)
	        if (value) { //处理{{ }}插值表达式
	            tokens.push(getToken(value, start))
	        }
	        start = stop + closeTag.length
	    } while (1)
	    value = str.slice(start)
	    if (value) { //}} 右边的文本
	        tokens.push({
	            value: value,
	            expr: false,
	            filters: ""
	        })
	    }
	    return tokens
	}

	function scanText(textNode, vmodels, index) {
	    var bindings = []
	    tokens = scanExpr(textNode.data)
	    if (tokens.length) {
	        for (var i = 0; token = tokens[i++]; ) {
	            var node = DOC.createTextNode(token.value) //将文本转换为文本节点，并替换原来的文本节点
	            if (token.expr) {
	                token.value = token.value.replace(roneTime, function () {
	                    token.oneTime = true
	                    return ""
	                })
	                token.type = "text"
	                token.element = node
	                token.filters = token.filters.replace(rhasHtml, function () {
	                    token.type = "html"
	                    return ""
	                })// jshint ignore:line
	                token.pos = index * 1000 + i
	                bindings.push(token) //收集带有插值表达式的文本
	            }
	            avalonFragment.appendChild(node)
	        }
	        textNode.parentNode.replaceChild(avalonFragment, textNode)
	        if (bindings.length)
	            executeBindings(bindings, vmodels)
	    }
	}

	var bools = ["autofocus,autoplay,async,allowTransparency,checked,controls",
	    "declare,disabled,defer,defaultChecked,defaultSelected",
	    "contentEditable,isMap,loop,multiple,noHref,noResize,noShade",
	    "open,readOnly,selected"
	].join(",")
	var boolMap = {}
	bools.replace(rword, function(name) {
	    boolMap[name.toLowerCase()] = name
	})

	var propMap = { //属性名映射
	    "accept-charset": "acceptCharset",
	    "char": "ch",
	    "charoff": "chOff",
	    "class": "className",
	    "for": "htmlFor",
	    "http-equiv": "httpEquiv"
	}

	var anomaly = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan",
	    "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight",
	    "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"
	].join(",")
	anomaly.replace(rword, function(name) {
	    propMap[name.toLowerCase()] = name
	})

	var rnoscripts = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/img
	var rnoscriptText = /<noscript.*?>([\s\S]+?)<\/noscript>/im

	var getXHR = function() {
	    return new(window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP") // jshint ignore:line
	}

	var templatePool = avalon.templateCache = {}

	bindingHandlers.attr = function(data, vmodels) {
	    var text = data.value.trim(),
	        simple = true
	    if (text.indexOf(openTag) > -1 && text.indexOf(closeTag) > 2) {
	        simple = false
	        if (rexpr.test(text) && RegExp.rightContext === "" && RegExp.leftContext === "") {
	            simple = true
	            text = RegExp.$1
	        }
	    }
	    if (data.type === "include") {
	        var elem = data.element
	        data.includeRendered = getBindingCallback(elem, "data-include-rendered", vmodels)
	        data.includeLoaded = getBindingCallback(elem, "data-include-loaded", vmodels)
	        var outer = data.includeReplace = !! avalon(elem).data("includeReplace")
	        if (avalon(elem).data("includeCache")) {
	            data.templateCache = {}
	        }
	        data.startInclude = DOC.createComment("ms-include")
	        data.endInclude = DOC.createComment("ms-include-end")
	        if (outer) {
	            data.element = data.startInclude
	            elem.parentNode.insertBefore(data.startInclude, elem)
	            elem.parentNode.insertBefore(data.endInclude, elem.nextSibling)
	        } else {
	            elem.insertBefore(data.startInclude, elem.firstChild)
	            elem.appendChild(data.endInclude)
	        }
	    }
	    data.handlerName = "attr" //handleName用于处理多种绑定共用同一种bindingExecutor的情况
	    parseExprProxy(text, vmodels, data, (simple ? 0 : scanExpr(data.value)))
	}

	bindingExecutors.attr = function(val, elem, data) {
	    var method = data.type,
	        attrName = data.param
	    if (method === "css") {
	        avalon(elem).css(attrName, val)
	    } else if (method === "attr") {
	       
	        // ms-attr-class="xxx" vm.xxx="aaa bbb ccc"将元素的className设置为aaa bbb ccc
	        // ms-attr-class="xxx" vm.xxx=false  清空元素的所有类名
	        // ms-attr-name="yyy"  vm.yyy="ooo" 为元素设置name属性
	        var toRemove = (val === false) || (val === null) || (val === void 0)

	        if (!W3C && propMap[attrName]) { //旧式IE下需要进行名字映射
	            attrName = propMap[attrName]
	        }
	        var bool = boolMap[attrName]
	        if (typeof elem[bool] === "boolean") {
	            elem[bool] = !! val //布尔属性必须使用el.xxx = true|false方式设值
	            if (!val) { //如果为false, IE全系列下相当于setAttribute(xxx,''),会影响到样式,需要进一步处理
	                toRemove = true
	            }
	        }
	        if (toRemove) {
	            return elem.removeAttribute(attrName)
	        }
	        //SVG只能使用setAttribute(xxx, yyy), VML只能使用elem.xxx = yyy ,HTML的固有属性必须elem.xxx = yyy
	        var isInnate = rsvg.test(elem) ? false : (DOC.namespaces && isVML(elem)) ? true : attrName in elem.cloneNode(false)
	        if (isInnate) {
	            elem[attrName] = val+""
	        } else {
	            elem.setAttribute(attrName, val)
	        }
	    } else if (method === "include" && val) {
	        var vmodels = data.vmodels
	        var rendered = data.includeRendered
	        var loaded = data.includeLoaded
	        var replace = data.includeReplace
	        var target = replace ? elem.parentNode : elem
	        var scanTemplate = function(text) {
	            if (loaded) {
	                var newText = loaded.apply(target, [text].concat(vmodels))
	                if (typeof newText === "string")
	                    text = newText
	            }
	            if (rendered) {
	                checkScan(target, function() {
	                    rendered.call(target)
	                }, NaN)
	            }
	            var lastID = data.includeLastID
	            if (data.templateCache && lastID && lastID !== val) {
	                var lastTemplate = data.templateCache[lastID]
	                if (!lastTemplate) {
	                    lastTemplate = data.templateCache[lastID] = DOC.createElement("div")
	                    ifGroup.appendChild(lastTemplate)
	                }
	            }
	            data.includeLastID = val
	            while (true) {
	                var node = data.startInclude.nextSibling
	                if (node && node !== data.endInclude) {
	                    target.removeChild(node)
	                    if (lastTemplate)
	                        lastTemplate.appendChild(node)
	                } else {
	                    break
	                }
	            }
	            var dom = getTemplateNodes(data, val, text)
	            var nodes = avalon.slice(dom.childNodes)
	            target.insertBefore(dom, data.endInclude)
	            scanNodeArray(nodes, vmodels)
	        }

	        if (data.param === "src") {
	            if (typeof templatePool[val] === "string") {
	                avalon.nextTick(function() {
	                    scanTemplate(templatePool[val])
	                })
	            } else if (Array.isArray(templatePool[val])) { //#805 防止在循环绑定中发出许多相同的请求
	                templatePool[val].push(scanTemplate)
	            } else {
	                var xhr = getXHR()
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4) {
	                        var s = xhr.status
	                        if (s >= 200 && s < 300 || s === 304 || s === 1223) {
	                            var text = xhr.responseText
	                            for (var f = 0, fn; fn = templatePool[val][f++];) {
	                                fn(text)
	                            }
	                            templatePool[val] = text
	                        }
	                    }
	                }
	                templatePool[val] = [scanTemplate]
	                xhr.open("GET", val, true)
	                if ("withCredentials" in xhr) {
	                    xhr.withCredentials = true
	                }
	                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
	                xhr.send(null)
	            }
	        } else {
	            //IE系列与够新的标准浏览器支持通过ID取得元素（firefox14+）
	            //http://tjvantoll.com/2012/07/19/dom-element-references-as-global-variables/
	            var el = val && val.nodeType === 1 ? val : DOC.getElementById(val)
	            if (el) {
	                if (el.tagName === "NOSCRIPT" && !(el.innerHTML || el.fixIE78)) { //IE7-8 innerText,innerHTML都无法取得其内容，IE6能取得其innerHTML
	                    xhr = getXHR() //IE9-11与chrome的innerHTML会得到转义的内容，它们的innerText可以
	                    xhr.open("GET", location, false) //谢谢Nodejs 乱炖群 深圳-纯属虚构
	                    xhr.send(null)
	                    //http://bbs.csdn.net/topics/390349046?page=1#post-393492653
	                    var noscripts = DOC.getElementsByTagName("noscript")
	                    var array = (xhr.responseText || "").match(rnoscripts) || []
	                    var n = array.length
	                    for (var i = 0; i < n; i++) {
	                        var tag = noscripts[i]
	                        if (tag) { //IE6-8中noscript标签的innerHTML,innerText是只读的
	                            tag.style.display = "none" //http://haslayout.net/css/noscript-Ghost-Bug
	                            tag.fixIE78 = (array[i].match(rnoscriptText) || ["", "&nbsp;"])[1]
	                        }
	                    }
	                }
	                avalon.nextTick(function() {
	                    scanTemplate(el.fixIE78 || el.value || el.innerText || el.innerHTML)
	                })
	            }
	        }
	    } else {
	        if (!root.hasAttribute && typeof val === "string" && (method === "src" || method === "href")) {
	            val = val.replace(/&amp;/g, "&") //处理IE67自动转义的问题
	        }
	        elem[method] = val
	        if (window.chrome && elem.tagName === "EMBED") {
	            var parent = elem.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
	            var comment = document.createComment("ms-src")
	            parent.replaceChild(comment, elem)
	            parent.replaceChild(elem, comment)
	        }
	    }
	}

	function getTemplateNodes(data, id, text) {
	    var div = data.templateCache && data.templateCache[id]
	    if (div) {
	        var dom = DOC.createDocumentFragment(),
	            firstChild
	        while (firstChild = div.firstChild) {
	            dom.appendChild(firstChild)
	        }
	        return dom
	    }
	    return avalon.parseHTML(text)
	}

	//这几个指令都可以使用插值表达式，如ms-src="aaa/{{b}}/{{c}}.html"
	"title,alt,src,value,css,include,href".replace(rword, function(name) {
	    bindingHandlers[name] = bindingHandlers.attr
	})
	//根据VM的属性值或表达式的值切换类名，ms-class="xxx yyy zzz:flag" 
	//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	bindingHandlers["class"] = function(data, vmodels) {
	    var oldStyle = data.param,
	        text = data.value,
	        rightExpr
	        data.handlerName = "class"
	    if (!oldStyle || isFinite(oldStyle)) {
	        data.param = "" //去掉数字
	        var noExpr = text.replace(rexprg, function(a) {
	            return a.replace(/./g, "0")
	            //return Math.pow(10, a.length - 1) //将插值表达式插入10的N-1次方来占位
	        })
	        var colonIndex = noExpr.indexOf(":") //取得第一个冒号的位置
	        if (colonIndex === -1) { // 比如 ms-class="aaa bbb ccc" 的情况
	            var className = text
	        } else { // 比如 ms-class-1="ui-state-active:checked" 的情况 
	            className = text.slice(0, colonIndex)
	            rightExpr = text.slice(colonIndex + 1)
	            parseExpr(rightExpr, vmodels, data) //决定是添加还是删除
	            if (!data.evaluator) {
	                log("debug: ms-class '" + (rightExpr || "").trim() + "' 不存在于VM中")
	                return false
	            } else {
	                data._evaluator = data.evaluator
	                data._args = data.args
	            }
	        }
	        var hasExpr = rexpr.test(className) //比如ms-class="width{{w}}"的情况
	        if (!hasExpr) {
	            data.immobileClass = className
	        }
	        parseExprProxy("", vmodels, data, (hasExpr ? scanExpr(className) : 0))
	    } else {
	        data.immobileClass = data.oldStyle = data.param
	        parseExprProxy(text, vmodels, data)
	    }
	}

	bindingExecutors["class"] = function(val, elem, data) {
	    var $elem = avalon(elem),
	        method = data.type
	    if (method === "class" && data.oldStyle) { //如果是旧风格
	        $elem.toggleClass(data.oldStyle, !! val)
	    } else {
	        //如果存在冒号就有求值函数
	        data.toggleClass = data._evaluator ? !! data._evaluator.apply(elem, data._args) : true
	        data.newClass = data.immobileClass || val
	        if (data.oldClass && data.newClass !== data.oldClass) {
	            $elem.removeClass(data.oldClass)
	        }
	        data.oldClass = data.newClass
	        switch (method) {
	            case "class":
	                $elem.toggleClass(data.newClass, data.toggleClass)
	                break
	            case "hover":
	            case "active":
	                if (!data.hasBindEvent) { //确保只绑定一次
	                    var activate = "mouseenter" //在移出移入时切换类名
	                    var abandon = "mouseleave"
	                    if (method === "active") { //在聚焦失焦中切换类名
	                        elem.tabIndex = elem.tabIndex || -1
	                        activate = "mousedown"
	                        abandon = "mouseup"
	                        var fn0 = $elem.bind("mouseleave", function() {
	                            data.toggleClass && $elem.removeClass(data.newClass)
	                        })
	                    }
	                    var fn1 = $elem.bind(activate, function() {
	                        data.toggleClass && $elem.addClass(data.newClass)
	                    })
	                    var fn2 = $elem.bind(abandon, function() {
	                        data.toggleClass && $elem.removeClass(data.newClass)
	                    })
	                    data.rollback = function() {
	                        $elem.unbind("mouseleave", fn0)
	                        $elem.unbind(activate, fn1)
	                        $elem.unbind(abandon, fn2)
	                    }
	                    data.hasBindEvent = true
	                }
	                break;
	        }
	    }
	}

	"hover,active".replace(rword, function(method) {
	    bindingHandlers[method] = bindingHandlers["class"]
	})
	//ms-controller绑定已经在scanTag 方法中实现
	//ms-css绑定已由ms-attr绑定实现


	// bindingHandlers.data 定义在if.js
	bindingExecutors.data = function(val, elem, data) {
		var key = "data-" + data.param
		if (val && typeof val === "object") {
			elem[key] = val
		} else {
			elem.setAttribute(key, String(val))
		}
	}
	//双工绑定
	var duplexBinding = bindingHandlers.duplex = function(data, vmodels) {
	    var elem = data.element,
	        hasCast
	        parseExprProxy(data.value, vmodels, data, 0, 1)

	        data.changed = getBindingCallback(elem, "data-duplex-changed", vmodels) || noop
	    if (data.evaluator && data.args) {
	        var params = []
	        var casting = oneObject("string,number,boolean,checked")
	        if (elem.type === "radio" && data.param === "") {
	            data.param = "checked"
	        }
	        if (elem.msData) {
	            elem.msData["ms-duplex"] = data.value
	        }
	        data.param.replace(/\w+/g, function(name) {
	            if (/^(checkbox|radio)$/.test(elem.type) && /^(radio|checked)$/.test(name)) {
	                if (name === "radio")
	                    log("ms-duplex-radio已经更名为ms-duplex-checked")
	                name = "checked"
	                data.isChecked = true
	            }
	            if (name === "bool") {
	                name = "boolean"
	                log("ms-duplex-bool已经更名为ms-duplex-boolean")
	            } else if (name === "text") {
	                name = "string"
	                log("ms-duplex-text已经更名为ms-duplex-string")
	            }
	            if (casting[name]) {
	                hasCast = true
	            }
	            avalon.Array.ensure(params, name)
	        })
	        if (!hasCast) {
	            params.push("string")
	        }
	        data.param = params.join("-")
	        data.bound = function(type, callback) {
	            if (elem.addEventListener) {
	                elem.addEventListener(type, callback, false)
	            } else {
	                elem.attachEvent("on" + type, callback)
	            }
	            var old = data.rollback
	            data.rollback = function() {
	                elem.avalonSetter = null
	                avalon.unbind(elem, type, callback)
	                old && old()
	            }
	        }
	        for (var i in avalon.vmodels) {
	            var v = avalon.vmodels[i]
	            v.$fire("avalon-ms-duplex-init", data)
	        }
	        var cpipe = data.pipe || (data.pipe = pipe)
	        cpipe(null, data, "init")
	        var tagName = elem.tagName
	        duplexBinding[tagName] && duplexBinding[tagName](elem, data.evaluator.apply(null, data.args), data)
	    }
	}
	//不存在 bindingExecutors.duplex

	    function fixNull(val) {
	        return val == null ? "" : val
	    }
	avalon.duplexHooks = {
	    checked: {
	        get: function(val, data) {
	            return !data.element.oldValue
	        }
	    },
	    string: {
	        get: function(val) { //同步到VM
	            return val
	        },
	        set: fixNull
	    },
	    "boolean": {
	        get: function(val) {
	            return val === "true"
	        },
	        set: fixNull
	    },
	    number: {
	        get: function(val, data) {
	            var number = parseFloat(val)
	            if (-val === -number) {
	                return number
	            }
	            var arr = /strong|medium|weak/.exec(data.element.getAttribute("data-duplex-number")) || ["medium"]
	            switch (arr[0]) {
	                case "strong":
	                    return 0
	                case "medium":
	                    return val === "" ? "" : 0
	                case "weak":
	                    return val
	            }
	        },
	        set: fixNull
	    }
	}

	function pipe(val, data, action, e) {
	    data.param.replace(/\w+/g, function(name) {
	        var hook = avalon.duplexHooks[name]
	        if (hook && typeof hook[action] === "function") {
	            val = hook[action](val, data)
	        }
	    })
	    return val
	}

	var TimerID, ribbon = []

	    avalon.tick = function(fn) {
	        if (ribbon.push(fn) === 1) {
	            TimerID = setInterval(ticker, 60)
	        }
	    }

	    function ticker() {
	        for (var n = ribbon.length - 1; n >= 0; n--) {
	            var el = ribbon[n]
	            if (el() === false) {
	                ribbon.splice(n, 1)
	            }
	        }
	        if (!ribbon.length) {
	            clearInterval(TimerID)
	        }
	    }

	var watchValueInTimer = noop
	var rmsinput = /text|password|hidden/
	new function() { // jshint ignore:line
	    try { //#272 IE9-IE11, firefox
	        var setters = {}
	        var aproto = HTMLInputElement.prototype
	        var bproto = HTMLTextAreaElement.prototype
	        function newSetter(value) { // jshint ignore:line
	                setters[this.tagName].call(this, value)
	                if (rmsinput.test(this.type) && !this.msFocus && this.avalonSetter) {
	                    this.avalonSetter()
	                }
	        }
	        var inputProto = HTMLInputElement.prototype
	        Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
	        setters["INPUT"] = Object.getOwnPropertyDescriptor(aproto, "value").set
	    
	        Object.defineProperty(aproto, "value", {
	            set: newSetter
	        })
	        setters["TEXTAREA"] = Object.getOwnPropertyDescriptor(bproto, "value").set
	        Object.defineProperty(bproto, "value", {
	            set: newSetter
	        })
	    } catch (e) {
	        //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	        // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	        // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	        watchValueInTimer = avalon.tick
	    }
	} // jshint ignore:line
	if (IEVersion) {
	    avalon.bind(DOC, "selectionchange", function(e) {
	        var el = DOC.activeElement
	        if (el && typeof el.avalonSetter === "function") {
	            el.avalonSetter()
	        }
	    })
	}

	//处理radio, checkbox, text, textarea, password
	duplexBinding.INPUT = function(element, evaluator, data) {
	    var $type = element.type,
	        bound = data.bound,
	        $elem = avalon(element),
	        composing = false

	        function callback(value) {
	            data.changed.call(this, value, data)
	        }

	        function compositionStart() {
	            composing = true
	        }

	        function compositionEnd() {
	            composing = false
	        }
	        //当value变化时改变model的值
	    var updateVModel = function() {
	        if (composing) //处理中文输入法在minlengh下引发的BUG
	            return
	        var val = element.oldValue = element.value //防止递归调用形成死循环
	        var lastValue = data.pipe(val, data, "get")
	        if ($elem.data("duplexObserve") !== false) {
	            evaluator(lastValue)
	            callback.call(element, lastValue)
	            if ($elem.data("duplex-focus")) {
	                avalon.nextTick(function() {
	                    element.focus()
	                })
	            }
	        }
	    }
	    //当model变化时,它就会改变value的值
	    data.handler = function() {
	        var val = data.pipe(evaluator(), data, "set") + "" //fix #673
	        if (val !== element.oldValue) {
	            element.value = val
	        }
	    }
	    if (data.isChecked || $type === "radio") {
	        var IE6 = IEVersion === 6
	        updateVModel = function() {
	            if ($elem.data("duplexObserve") !== false) {
	                var lastValue = data.pipe(element.value, data, "get")
	                evaluator(lastValue)
	                callback.call(element, lastValue)
	            }
	        }
	        data.handler = function() {
	            var val = evaluator()
	            var checked = data.isChecked ? !! val : val + "" === element.value
	            element.oldValue = checked
	            if (IE6) {
	                setTimeout(function() {
	                    //IE8 checkbox, radio是使用defaultChecked控制选中状态，
	                    //并且要先设置defaultChecked后设置checked
	                    //并且必须设置延迟
	                    element.defaultChecked = checked
	                    element.checked = checked
	                }, 31)
	            } else {
	                element.checked = checked
	            }
	        }
	        bound("click", updateVModel)
	    } else if ($type === "checkbox") {
	        updateVModel = function() {
	            if ($elem.data("duplexObserve") !== false) {
	                var method = element.checked ? "ensure" : "remove"
	                var array = evaluator()
	                if (!Array.isArray(array)) {
	                    log("ms-duplex应用于checkbox上要对应一个数组")
	                    array = [array]
	                }
	                var val = data.pipe(element.value, data, "get")
	                avalon.Array[method](array, val)
	                callback.call(element, array)
	            }
	        }

	        data.handler = function() {
	            var array = [].concat(evaluator()) //强制转换为数组
	            var val = data.pipe(element.value, data, "get")
	            element.checked = array.indexOf(val) > -1
	        }
	        bound(W3C ? "change" : "click", updateVModel)
	    } else {
	        var events = element.getAttribute("data-duplex-event") || "input"
	        if (element.attributes["data-event"]) {
	            log("data-event指令已经废弃，请改用data-duplex-event")
	        }

	        function delay(e) { // jshint ignore:line
	            setTimeout(function() {
	                updateVModel(e)
	            })
	        }
	        events.replace(rword, function(name) {
	            switch (name) {
	                case "input":
	                    if (!IEVersion) { // W3C
	                        bound("input", updateVModel)
	                        //非IE浏览器才用这个
	                        bound("compositionstart", compositionStart)
	                        bound("compositionend", compositionEnd)
	                        bound("DOMAutoComplete", updateVModel)
	                    } else { //onpropertychange事件无法区分是程序触发还是用户触发
	                        // IE下通过selectionchange事件监听IE9+点击input右边的X的清空行为，及粘贴，剪切，删除行为
	                        if (IEVersion > 8) {
	                            bound("input", updateVModel) //IE9使用propertychange无法监听中文输入改动
	                        } else {
	                            bound("propertychange", function(e) { //IE6-8下第一次修改时不会触发,需要使用keydown或selectionchange修正
	                                if (e.propertyName === "value") {
	                                    updateVModel()
	                                }
	                            })
	                        }
	                        bound("dragend", delay)
	                        //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
	                        //http://www.matts411.com/post/internet-explorer-9-oninput/
	                    }
	                    break
	                default:
	                    bound(name, updateVModel)
	                    break
	            }
	        })
	        bound("focus", function() {
	            element.msFocus = true
	        })
	        bound("blur", function() {
	            element.msFocus = false
	        })

	        if (rmsinput.test($type)) {
	            watchValueInTimer(function() {
	                if (root.contains(element)) {
	                    if (!element.msFocus && element.oldValue !== element.value) {
	                        updateVModel()
	                    }
	                } else if (!element.msRetain) {
	                    return false
	                }
	            })
	        }

	        element.avalonSetter = updateVModel //#765
	    }

	    element.oldValue = element.value
	    avalon.injectBinding(data)
	    callback.call(element, element.value)
	}
	duplexBinding.TEXTAREA = duplexBinding.INPUT
	duplexBinding.SELECT = function(element, evaluator, data) {
	    var $elem = avalon(element)

	        function updateVModel() {
	            if ($elem.data("duplexObserve") !== false) {
	                var val = $elem.val() //字符串或字符串数组
	                if (Array.isArray(val)) {
	                    val = val.map(function(v) {
	                        return data.pipe(v, data, "get")
	                    })
	                } else {
	                    val = data.pipe(val, data, "get")
	                }
	                if (val + "" !== element.oldValue) {
	                    evaluator(val)
	                }
	                data.changed.call(element, val, data)
	            }
	        }
	    data.handler = function() {
	        var val = evaluator()
	        val = val && val.$model || val
	        if (Array.isArray(val)) {
	            if (!element.multiple) {
	                log("ms-duplex在<select multiple=true>上要求对应一个数组")
	            }
	        } else {
	            if (element.multiple) {
	                log("ms-duplex在<select multiple=false>不能对应一个数组")
	            }
	        }
	        //必须变成字符串后才能比较
	        val = Array.isArray(val) ? val.map(String) : val + ""
	        if (val + "" !== element.oldValue) {
	            $elem.val(val)
	            element.oldValue = val + ""
	        }
	    }
	    data.bound("change", updateVModel)
	    element.msCallback = function() {
	        avalon.injectBinding(data)
	        data.changed.call(element, evaluator(), data)
	    }
	}
	// bindingHandlers.html 定义在if.js
	bindingExecutors.html = function (val, elem, data) {
	    var isHtmlFilter = elem.nodeType !== 1
	    var parent = isHtmlFilter ? elem.parentNode : elem
	    if (!parent)
	        return
	    val = val == null ? "" : val
	    if (data.oldText !== val) {
	        data.oldText = val
	    } else {
	        return
	    }
	    if (elem.nodeType === 3) {
	        var signature = generateID("html")
	        parent.insertBefore(DOC.createComment(signature), elem)
	        data.element = DOC.createComment(signature + ":end")
	        parent.replaceChild(data.element, elem)
	        elem = data.element
	    }
	    if (typeof val !== "object") {//string, number, boolean
	        var fragment = avalon.parseHTML(String(val))
	    } else if (val.nodeType === 11) { //将val转换为文档碎片
	        fragment = val
	    } else if (val.nodeType === 1 || val.item) {
	        var nodes = val.nodeType === 1 ? val.childNodes : val.item
	        fragment = avalonFragment.cloneNode(true)
	        while (nodes[0]) {
	            fragment.appendChild(nodes[0])
	        }
	    }

	    nodes = avalon.slice(fragment.childNodes)
	    //插入占位符, 如果是过滤器,需要有节制地移除指定的数量,如果是html指令,直接清空
	    if (isHtmlFilter) {
	        var endValue = elem.nodeValue.slice(0, -4)
	        while (true) {
	            var node = elem.previousSibling
	            if (!node || node.nodeType === 8 && node.nodeValue === endValue) {
	                break
	            } else {
	                parent.removeChild(node)
	            }
	        }
	        parent.insertBefore(fragment, elem)
	    } else {
	        avalon.clearHTML(elem).appendChild(fragment)
	    }
	    scanNodeArray(nodes, data.vmodels)
	}
	bindingHandlers["if"] =
	    bindingHandlers.data =
	    bindingHandlers.text =
	    bindingHandlers.html =
	    function(data, vmodels) {
	        parseExprProxy(data.value, vmodels, data)
	}

	bindingExecutors["if"] = function(val, elem, data) {
	     try {
	         if(!elem.parentNode) return
	     } catch(e) {return}
	    if (val) { //插回DOM树
	        if (elem.nodeType === 8) {
	            elem.parentNode.replaceChild(data.template, elem)
	         //   animate.enter(data.template, elem.parentNode)
	            elem = data.element = data.template //这时可能为null
	        }
	        if (elem.getAttribute(data.name)) {
	            elem.removeAttribute(data.name)
	            scanAttr(elem, data.vmodels)
	        }
	        data.rollback = null
	    } else { //移出DOM树，并用注释节点占据原位置
	        if (elem.nodeType === 1) {
	            var node = data.element = DOC.createComment("ms-if")
	            elem.parentNode.replaceChild(node, elem)
	       //     animate.leave(elem, node.parentNode, node)
	            data.template = elem //元素节点
	            ifGroup.appendChild(elem)
	            data.rollback = function() {
	                if (elem.parentNode === ifGroup) {
	                    ifGroup.removeChild(elem)
	                }
	            }
	        }
	    }
	}
	//ms-important绑定已经在scanTag 方法中实现
	//ms-include绑定已由ms-attr绑定实现

	var rdash = /\(([^)]*)\)/
	bindingHandlers.on = function(data, vmodels) {
	    var value = data.value
	    data.type = "on"
	    var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
	    if (typeof bindingHandlers.on[eventType + "Hook"] === "function") {
	        bindingHandlers.on[eventType + "Hook"](data)
	    }
	    if (value.indexOf("(") > 0 && value.indexOf(")") > -1) {
	        var matched = (value.match(rdash) || ["", ""])[1].trim()
	        if (matched === "" || matched === "$event") { // aaa() aaa($event)当成aaa处理
	            value = value.replace(rdash, "")
	        }
	    }
	    parseExprProxy(value, vmodels, data)
	}

	bindingExecutors.on = function(callback, elem, data) {
	    callback = function(e) {
	        var fn = data.evaluator || noop
	        return fn.apply(this, data.args.concat(e))
	    }
	    var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
	    if (eventType === "scan") {
	        callback.call(elem, {
	            type: eventType
	        })
	    } else if (typeof data.specialBind === "function") {
	        data.specialBind(elem, callback)
	    } else {
	        var removeFn = avalon.bind(elem, eventType, callback)
	    }
	    data.rollback = function() {
	        if (typeof data.specialUnbind === "function") {
	            data.specialUnbind()
	        } else {
	            avalon.unbind(elem, eventType, removeFn)
	        }
	    }
	}
	bindingHandlers.repeat = function (data, vmodels) {
	    var type = data.type
	    parseExprProxy(data.value, vmodels, data, 0, 1)
	    data.proxies = []
	    var freturn = false
	    try {
	        var $repeat = data.$repeat = data.evaluator.apply(0, data.args || [])
	        var xtype = avalon.type($repeat)
	        if (xtype !== "object" && xtype !== "array") {
	            freturn = true
	            avalon.log("warning:" + data.value + "只能是对象或数组")
	        }
	    } catch (e) {
	        freturn = true
	    }
	    var arr = data.value.split(".") || []
	    if (arr.length > 1) {
	        arr.pop()
	        var n = arr[0]
	        for (var i = 0, v; v = vmodels[i++]; ) {
	            if (v && v.hasOwnProperty(n)) {
	                var events = v[n].$events || {}
	                events[subscribers] = events[subscribers] || []
	                events[subscribers].push(data)
	                break
	            }
	        }
	    }

	    var elem = data.element
	    if (elem.nodeType === 1) {
	        elem.removeAttribute(data.name)
	        data.sortedCallback = getBindingCallback(elem, "data-with-sorted", vmodels)
	        data.renderedCallback = getBindingCallback(elem, "data-" + type + "-rendered", vmodels)
	        var signature = generateID(type)
	        var start = DOC.createComment(signature)
	        var end = DOC.createComment(signature + ":end")
	        data.signature = signature
	        data.template = avalonFragment.cloneNode(false)
	        if (type === "repeat") {
	            var parent = elem.parentNode
	            parent.replaceChild(end, elem)
	            parent.insertBefore(start, end)
	            data.template.appendChild(elem)
	        } else {
	            while (elem.firstChild) {
	                data.template.appendChild(elem.firstChild)
	            }
	            elem.appendChild(start)
	            elem.appendChild(end)
	        }
	        data.element = end
	        data.handler = bindingExecutors.repeat
	        data.rollback = function () {
	            var elem = data.element
	            if (!elem)
	                return
	            data.handler("clear")
	        }
	    }

	    if (freturn) {
	        return
	    }

	    data.$outer = {}
	    var check0 = "$key"
	    var check1 = "$val"
	    if (Array.isArray($repeat)) {
	        check0 = "$first"
	        check1 = "$last"
	    }
	   
	    for (i = 0; v = vmodels[i++]; ) {
	        if (v.hasOwnProperty(check0) && v.hasOwnProperty(check1)) {
	            data.$outer = v
	            break
	        }
	    }
	    var $events = $repeat.$events
	    var $list = ($events || {})[subscribers]
	    injectDependency($list, data)
	    if (xtype === "object") {
	        data.$with = true
	        $repeat.$proxy || ($repeat.$proxy = {})
	        data.handler("append", $repeat)
	    } else if ($repeat.length) {
	        data.handler("add", 0, $repeat.length)
	    }
	}

	bindingExecutors.repeat = function (method, pos, el) {
	    if (method) {
	        var data = this, start, fragment
	        var end = data.element
	        var comments = getComments(data)
	        var parent = end.parentNode
	        var proxies = data.proxies
	        var transation = avalonFragment.cloneNode(false)
	        switch (method) {
	            case "add": //在pos位置后添加el数组（pos为插入位置,el为要插入的个数）
	                var n = pos + el
	                var fragments = []
	                for (var i = pos; i < n; i++) {
	                    var proxy = eachProxyAgent(i, data)
	                    proxies.splice(i, 0, proxy)
	                    shimController(data, transation, proxy, fragments)
	                }
	                var now = new Date() - 0
	                avalon.optimize = avalon.optimize || now
	                for (i = 0; fragment = fragments[i++]; ) {
	                    scanNodeArray(fragment.nodes, fragment.vmodels)
	                    fragment.nodes = fragment.vmodels = null
	                }
	                if (avalon.optimize === now) {
	                    delete avalon.optimize
	                }
	                parent.insertBefore(transation, comments[pos] || end)
	                avalon.profile("插入操作花费了 " + (new Date - now))
	                break
	            case "del": //将pos后的el个元素删掉(pos, el都是数字)
	                sweepNodes(comments[pos], comments[pos + el] || end)
	                var removed = proxies.splice(pos, el)
	                recycleProxies(removed, "each")
	                break
	            case "clear":
	                start = comments[0]
	                if (start) {
	                    sweepNodes(start, end)
	                    if (data.$with) {
	                        parent.insertBefore(start, end)
	                    }
	                }
	                recycleProxies(proxies, "each")
	                break
	            case "move":
	                start = comments[0]
	                if (start) {
	                    var signature = start.nodeValue
	                    var rooms = []
	                    var room = [],
	                            node
	                    sweepNodes(start, end, function () {
	                        room.unshift(this)
	                        if (this.nodeValue === signature) {
	                            rooms.unshift(room)
	                            room = []
	                        }
	                    })
	                    sortByIndex(rooms, pos)
	                    sortByIndex(proxies, pos)
	                    while (room = rooms.shift()) {
	                        while (node = room.shift()) {
	                            transation.appendChild(node)
	                        }
	                    }
	                    parent.insertBefore(transation, end)
	                }
	                break
	        case "index": //将proxies中的第pos个起的所有元素重新索引
	                var last = proxies.length - 1
	                for (; el = proxies[pos]; pos++) {
	                    el.$index = pos
	                    el.$first = pos === 0
	                    el.$last = pos === last
	                }
	                return
	            case "set": //将proxies中的第pos个元素的VM设置为el（pos为数字，el任意）
	                proxy = proxies[pos]
	                if (proxy) {
	                    fireDependencies(proxy.$events[data.param || "el"])
	                }
	                break
	            case "append":
	                var object = pos //原来第2参数， 被循环对象
	                var pool = object.$proxy   //代理对象组成的hash
	                var keys = []
	                fragments = []
	                for (var key in pool) {
	                    if (!object.hasOwnProperty(key)) {
	                        proxyRecycler(pool[key], withProxyPool) //去掉之前的代理VM
	                        delete(pool[key])
	                    }
	                }
	                for (key in object) { //得到所有键名
	                    if (object.hasOwnProperty(key) && key !== "hasOwnProperty" && key !== "$proxy") {
	                        keys.push(key)
	                    }
	                }
	                if (data.sortedCallback) { //如果有回调，则让它们排序
	                    var keys2 = data.sortedCallback.call(parent, keys)
	                    if (keys2 && Array.isArray(keys2) && keys2.length) {
	                        keys = keys2
	                    }
	                }

	                for (i = 0; key = keys[i++]; ) {
	                    if (key !== "hasOwnProperty") {
	                        pool[key] = withProxyAgent(pool[key], key, data)
	                        shimController(data, transation, pool[key], fragments)
	                    }
	                }

	                parent.insertBefore(transation, end)
	                for (i = 0; fragment = fragments[i++]; ) {
	                    scanNodeArray(fragment.nodes, fragment.vmodels)
	                    fragment.nodes = fragment.vmodels = null
	                }
	                break
	        }
	        if (!data.$repeat || data.$repeat.hasOwnProperty("$lock")) //IE6-8 VBScript对象会报错, 有时候data.$repeat不存在
	            return
	        if (method === "clear")
	            method = "del"
	        var callback = data.renderedCallback || noop,
	                args = arguments
	        if (parent.oldValue && parent.tagName === "SELECT") { //fix #503
	            avalon(parent).val(parent.oldValue.split(","))
	        }
	        callback.apply(parent, args)
	    }
	}

	"with,each".replace(rword, function (name) {
	    bindingHandlers[name] = bindingHandlers.repeat
	})

	function shimController(data, transation, proxy, fragments) {
	    var content = data.template.cloneNode(true)
	    var nodes = avalon.slice(content.childNodes)
	    if (!data.$with) {
	        content.insertBefore(DOC.createComment(data.signature), content.firstChild)
	    }
	    transation.appendChild(content)
	    var nv = [proxy].concat(data.vmodels)
	    var fragment = {
	        nodes: nodes,
	        vmodels: nv
	    }
	    fragments.push(fragment)
	}

	function getComments(data) {
	    var end = data.element
	    var signature = end.nodeValue.replace(":end", "")
	    var node = end.previousSibling
	    var array = []
	    while (node) {
	        if (node.nodeValue === signature) {
	            array.unshift(node)
	        }
	        node = node.previousSibling
	    }
	    return array
	}


	//移除掉start与end之间的节点(保留end)
	function sweepNodes(start, end, callback) {
	    while (true) {
	        var node = end.previousSibling
	        if (!node)
	            break
	        node.parentNode.removeChild(node)
	        callback && callback.call(node)
	        if (node === start) {
	            break
	        }
	    }
	}

	// 为ms-each,ms-with, ms-repeat会创建一个代理VM，
	// 通过它们保持一个下上文，让用户能调用$index,$first,$last,$remove,$key,$val,$outer等属性与方法
	// 所有代理VM的产生,消费,收集,存放通过xxxProxyFactory,xxxProxyAgent, recycleProxies,xxxProxyPool实现
	var withProxyPool = []
	function withProxyFactory() {
	    var proxy = modelFactory({
	        $key: "",
	        $outer: {},
	        $host: {},
	        $val: {
	            get: function () {
	                return this.$host[this.$key]
	            },
	            set: function (val) {
	                this.$host[this.$key] = val
	            }
	        }
	    }, {
	        $val: 1
	    })
	    proxy.$id = generateID("$proxy$with")
	    return proxy
	}

	function withProxyAgent(proxy, key, data) {
	    proxy = proxy || withProxyPool.pop()
	    if (!proxy) {
	        proxy = withProxyFactory()
	    } else {
	        proxy.$reinitialize()
	    }
	    var host = data.$repeat
	    proxy.$key = key
	    proxy.$host = host
	    proxy.$outer = data.$outer
	    if (host.$events) {
	        proxy.$events.$val = host.$events[key]
	    } else {
	        proxy.$events = {}
	    }
	    return proxy
	}


	function  recycleProxies(proxies) {
	    eachProxyRecycler(proxies)
	}
	function eachProxyRecycler(proxies) {
	    proxies.forEach(function (proxy) {
	        proxyRecycler(proxy, eachProxyPool)
	    })
	    proxies.length = 0
	}


	var eachProxyPool = []
	function eachProxyFactory(name) {
	    var source = {
	        $host: [],
	        $outer: {},
	        $index: 0,
	        $first: false,
	        $last: false,
	        $remove: avalon.noop
	    }
	    source[name] = {
	        get: function () {
	            var e = this.$events
	            var array = e.$index
	            e.$index = e[name] //#817 通过$index为el收集依赖
	            try {
	                return this.$host[this.$index]
	            } finally {
	                e.$index = array
	            }
	        },
	        set: function (val) {
	            try {
	                var e = this.$events
	                var array = e.$index
	                e.$index = []
	                this.$host.set(this.$index, val)
	            } finally {
	                e.$index = array
	            }
	        }
	    }
	    var second = {
	        $last: 1,
	        $first: 1,
	        $index: 1
	    }
	    var proxy = modelFactory(source, second)
	    proxy.$id = generateID("$proxy$each")
	    return proxy
	}

	function eachProxyAgent(index, data) {
	    var param = data.param || "el",
	            proxy
	    for (var i = 0, n = eachProxyPool.length; i < n; i++) {
	        var candidate = eachProxyPool[i]
	        if (candidate && candidate.hasOwnProperty(param)) {
	            proxy = candidate
	            eachProxyPool.splice(i, 1)
	        }
	    }
	    if (!proxy) {
	        proxy = eachProxyFactory(param)
	    }
	    var host = data.$repeat
	    var last = host.length - 1
	    proxy.$index = index
	    proxy.$first = index === 0
	    proxy.$last = index === last
	    proxy.$host = host
	    proxy.$outer = data.$outer
	    proxy.$remove = function () {
	        return host.removeAt(proxy.$index)
	    }
	    return proxy
	}


	function proxyRecycler(proxy, proxyPool) {
	    for (var i in proxy.$events) {
	        if (Array.isArray(proxy.$events[i])) {
	            proxy.$events[i].forEach(function (data) {
	                if (typeof data === "object")
	                    disposeData(data)
	            })// jshint ignore:line
	            proxy.$events[i].length = 0
	        }
	    }
	    proxy.$host = proxy.$outer = {}
	    if (proxyPool.unshift(proxy) > kernel.maxRepeatSize) {
	        proxyPool.pop()
	    }
	}
	/*********************************************************************
	 *                         各种指令                                  *
	 **********************************************************************/
	//ms-skip绑定已经在scanTag 方法中实现
	// bindingHandlers.text 定义在if.js
	bindingExecutors.text = function(val, elem) {
	    val = val == null ? "" : val //不在页面上显示undefined null
	    if (elem.nodeType === 3) { //绑定在文本节点上
	        try { //IE对游离于DOM树外的节点赋值会报错
	            elem.data = val
	        } catch (e) {}
	    } else { //绑定在特性节点上
	        if ("textContent" in elem) {
	            elem.textContent = val
	        } else {
	            elem.innerText = val
	        }
	    }
	}
	function parseDisplay(nodeName, val) {
	    //用于取得此类标签的默认display值
	    var key = "_" + nodeName
	    if (!parseDisplay[key]) {
	        var node = DOC.createElement(nodeName)
	        root.appendChild(node)
	        if (W3C) {
	            val = getComputedStyle(node, null).display
	        } else {
	            val = node.currentStyle.display
	        }
	        root.removeChild(node)
	        parseDisplay[key] = val
	    }
	    return parseDisplay[key]
	}

	avalon.parseDisplay = parseDisplay

	bindingHandlers.visible = function(data, vmodels) {
	    var elem = avalon(data.element)
	    var display = elem.css("display")
	    if (display === "none") {
	        var style = elem[0].style
	        var has = /visibility/i.test(style.cssText)
	        var visible = elem.css("visibility")
	        style.display = ""
	        style.visibility = "hidden"
	        display = elem.css("display")
	        if (display === "none") {
	            display = parseDisplay(elem[0].nodeName)
	        }
	        style.visibility = has ? visible : ""
	    }
	    data.display = display
	    parseExprProxy(data.value, vmodels, data)
	}

	bindingExecutors.visible = function(val, elem, data) {
	    elem.style.display = val ? data.display : "none"
	}
	bindingHandlers.widget = function(data, vmodels) {
	    var args = data.value.match(rword)
	    var elem = data.element
	    var widget = args[0]
	    var id = args[1]
	    if (!id || id === "$") { //没有定义或为$时，取组件名+随机数
	        id = generateID(widget)
	    }
	    var optName = args[2] || widget //没有定义，取组件名
	    var constructor = avalon.ui[widget]
	    if (typeof constructor === "function") { //ms-widget="tabs,tabsAAA,optname"
	        vmodels = elem.vmodels || vmodels
	        for (var i = 0, v; v = vmodels[i++];) {
	            if (v.hasOwnProperty(optName) && typeof v[optName] === "object") {
	                var vmOptions = v[optName]
	                vmOptions = vmOptions.$model || vmOptions
	                break
	            }
	        }
	        if (vmOptions) {
	            var wid = vmOptions[widget + "Id"]
	            if (typeof wid === "string") {
	                log("warning!不再支持" + widget + "Id")
	                id = wid
	            }
	        }
	        //抽取data-tooltip-text、data-tooltip-attr属性，组成一个配置对象
	        var widgetData = avalon.getWidgetData(elem, widget)
	        data.value = [widget, id, optName].join(",")
	        data[widget + "Id"] = id
	        data.evaluator = noop
	        elem.msData["ms-widget-id"] = id
	        var options = data[widget + "Options"] = avalon.mix({}, constructor.defaults, vmOptions || {}, widgetData)
	        elem.removeAttribute("ms-widget")
	        var vmodel = constructor(elem, data, vmodels) || {} //防止组件不返回VM
	        if (vmodel.$id) {
	            avalon.vmodels[id] = vmodel
	            createSignalTower(elem, vmodel)
	            try {
	                vmodel.$init(function() {
	                    avalon.scan(elem, [vmodel].concat(vmodels))
	                    if (typeof options.onInit === "function") {
	                        options.onInit.call(elem, vmodel, options, vmodels)
	                    }
	                })
	            } catch (e) {}
	            data.rollback = function() {
	                try {
	                    vmodel.widgetElement = null
	                    vmodel.$remove()
	                } catch (e) {}
	                elem.msData = {}
	                delete avalon.vmodels[vmodel.$id]
	            }
	            injectDisposeQueue(data, widgetList)
	            if (window.chrome) {
	                elem.addEventListener("DOMNodeRemovedFromDocument", function() {
	                    setTimeout(rejectDisposeQueue)
	                })
	            }
	        } else {
	            avalon.scan(elem, vmodels)
	        }
	    } else if (vmodels.length) { //如果该组件还没有加载，那么保存当前的vmodels
	        elem.vmodels = vmodels
	    }
	}
	var widgetList = []
	//不存在 bindingExecutors.widget
	/*********************************************************************
	 *                             自带过滤器                            *
	 **********************************************************************/
	var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
	var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
	var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
	var rsanitize = {
	    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	}
	var rsurrogate = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
	var rnoalphanumeric = /([^\#-~| |!])/g;

	function numberFormat(number, decimals, point, thousands) {
	    //form http://phpjs.org/functions/number_format/
	    //number	必需，要格式化的数字
	    //decimals	可选，规定多少个小数位。
	    //point	可选，规定用作小数点的字符串（默认为 . ）。
	    //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	    number = (number + '')
	            .replace(/[^0-9+\-Ee.]/g, '')
	    var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = thousands || ",",
	            dec = point || ".",
	            s = '',
	            toFixedFix = function(n, prec) {
	                var k = Math.pow(10, prec)
	                return '' + (Math.round(n * k) / k)
	                        .toFixed(prec)
	            }
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	            .split('.')
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	    }
	    if ((s[1] || '')
	            .length < prec) {
	        s[1] = s[1] || ''
	        s[1] += new Array(prec - s[1].length + 1)
	                .join('0')
	    }
	    return s.join(dec)
	}


	var filters = avalon.filters = {
	    uppercase: function(str) {
	        return str.toUpperCase()
	    },
	    lowercase: function(str) {
	        return str.toLowerCase()
	    },
	    truncate: function(str, length, truncation) {
	        //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	        length = length || 30
	        truncation = typeof truncation === "string" ?  truncation : "..." 
	        return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
	    },
	    $filter: function(val) {
	        for (var i = 1, n = arguments.length; i < n; i++) {
	            var array = arguments[i]
	            var fn = avalon.filters[array.shift()]
	            if (typeof fn === "function") {
	                var arr = [val].concat(array)
	                val = fn.apply(null, arr)
	            }
	        }
	        return val
	    },
	    camelize: camelize,
	    //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	    //    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	    //    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	    //    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	    //    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	    //    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	    sanitize: function(str) {
	        return str.replace(rscripts, "").replace(ropen, function(a, b) {
	            var match = a.toLowerCase().match(/<(\w+)\s/)
	            if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
	                var reg = rsanitize[match[1]]
	                if (reg) {
	                    a = a.replace(reg, function(s, name, value) {
	                        var quote = value.charAt(0)
	                        return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
	                    })
	                }
	            }
	            return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
	        })
	    },
	    escape: function(str) {
	        //将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
	        return String(str).
	                replace(/&/g, '&amp;').
	                replace(rsurrogate, function(value) {
	                    var hi = value.charCodeAt(0)
	                    var low = value.charCodeAt(1)
	                    return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
	                }).
	                replace(rnoalphanumeric, function(value) {
	                    return '&#' + value.charCodeAt(0) + ';'
	                }).
	                replace(/</g, '&lt;').
	                replace(/>/g, '&gt;')
	    },
	    currency: function(amount, symbol, fractionSize) {
	        return (symbol || "\uFFE5") + numberFormat(amount, isFinite(fractionSize) ? fractionSize : 2)
	    },
	    number: numberFormat
	}
	/*
	 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	 'MMMM': Month in year (January-December)
	 'MMM': Month in year (Jan-Dec)
	 'MM': Month in year, padded (01-12)
	 'M': Month in year (1-12)
	 'dd': Day in month, padded (01-31)
	 'd': Day in month (1-31)
	 'EEEE': Day in Week,(Sunday-Saturday)
	 'EEE': Day in Week, (Sun-Sat)
	 'HH': Hour in day, padded (00-23)
	 'H': Hour in day (0-23)
	 'hh': Hour in am/pm, padded (01-12)
	 'h': Hour in am/pm, (1-12)
	 'mm': Minute in hour, padded (00-59)
	 'm': Minute in hour (0-59)
	 'ss': Second in minute, padded (00-59)
	 's': Second in minute (0-59)
	 'a': am/pm marker
	 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	 format string can also be one of the following predefined localizable formats:
	 
	 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	 'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	 */
	new function() {// jshint ignore:line
	    function toInt(str) {
	        return parseInt(str, 10) || 0
	    }

	    function padNumber(num, digits, trim) {
	        var neg = ""
	        if (num < 0) {
	            neg = '-'
	            num = -num
	        }
	        num = "" + num
	        while (num.length < digits)
	            num = "0" + num
	        if (trim)
	            num = num.substr(num.length - digits)
	        return neg + num
	    }

	    function dateGetter(name, size, offset, trim) {
	        return function(date) {
	            var value = date["get" + name]()
	            if (offset > 0 || value > -offset)
	                value += offset
	            if (value === 0 && offset === -12) {
	                value = 12
	            }
	            return padNumber(value, size, trim)
	        }
	    }

	    function dateStrGetter(name, shortForm) {
	        return function(date, formats) {
	            var value = date["get" + name]()
	            var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
	            return formats[get][value]
	        }
	    }

	    function timeZoneGetter(date) {
	        var zone = -1 * date.getTimezoneOffset()
	        var paddedZone = (zone >= 0) ? "+" : ""
	        paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
	        return paddedZone
	    }
	    //取得上午下午

	    function ampmGetter(date, formats) {
	        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
	    }
	    var DATE_FORMATS = {
	        yyyy: dateGetter("FullYear", 4),
	        yy: dateGetter("FullYear", 2, 0, true),
	        y: dateGetter("FullYear", 1),
	        MMMM: dateStrGetter("Month"),
	        MMM: dateStrGetter("Month", true),
	        MM: dateGetter("Month", 2, 1),
	        M: dateGetter("Month", 1, 1),
	        dd: dateGetter("Date", 2),
	        d: dateGetter("Date", 1),
	        HH: dateGetter("Hours", 2),
	        H: dateGetter("Hours", 1),
	        hh: dateGetter("Hours", 2, -12),
	        h: dateGetter("Hours", 1, -12),
	        mm: dateGetter("Minutes", 2),
	        m: dateGetter("Minutes", 1),
	        ss: dateGetter("Seconds", 2),
	        s: dateGetter("Seconds", 1),
	        sss: dateGetter("Milliseconds", 3),
	        EEEE: dateStrGetter("Day"),
	        EEE: dateStrGetter("Day", true),
	        a: ampmGetter,
	        Z: timeZoneGetter
	    }
	    var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
	    var raspnetjson = /^\/Date\((\d+)\)\/$/
	    filters.date = function(date, format) {
	        var locate = filters.date.locate,
	                text = "",
	                parts = [],
	                fn, match
	        format = format || "mediumDate"
	        format = locate[format] || format
	        if (typeof date === "string") {
	            if (/^\d+$/.test(date)) {
	                date = toInt(date)
	            } else if (raspnetjson.test(date)) {
	                date = +RegExp.$1
	            } else {
	                var trimDate = date.trim()
	                var dateArray = [0, 0, 0, 0, 0, 0, 0]
	                var oDate = new Date(0)
	                //取得年月日
	                trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function(_, a, b, c) {
	                    var array = c.length === 4 ? [c, a, b] : [a, b, c]
	                    dateArray[0] = toInt(array[0])     //年
	                    dateArray[1] = toInt(array[1]) - 1 //月
	                    dateArray[2] = toInt(array[2])     //日
	                    return ""
	                })
	                var dateSetter = oDate.setFullYear
	                var timeSetter = oDate.setHours
	                trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function(_, a, b, c, d) {
	                    dateArray[3] = toInt(a) //小时
	                    dateArray[4] = toInt(b) //分钟
	                    dateArray[5] = toInt(c) //秒
	                    if (d) {                //毫秒
	                        dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
	                    }
	                    return ""
	                })
	                var tzHour = 0
	                var tzMin = 0
	                trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function(z, symbol, c, d) {
	                    dateSetter = oDate.setUTCFullYear
	                    timeSetter = oDate.setUTCHours
	                    if (symbol) {
	                        tzHour = toInt(symbol + c)
	                        tzMin = toInt(symbol + d)
	                    }
	                    return ""
	                })

	                dateArray[3] -= tzHour
	                dateArray[4] -= tzMin
	                dateSetter.apply(oDate, dateArray.slice(0, 3))
	                timeSetter.apply(oDate, dateArray.slice(3))
	                date = oDate
	            }
	        }
	        if (typeof date === "number") {
	            date = new Date(date)
	        }
	        if (avalon.type(date) !== "date") {
	            return
	        }
	        while (format) {
	            match = rdateFormat.exec(format)
	            if (match) {
	                parts = parts.concat(match.slice(1))
	                format = parts.pop()
	            } else {
	                parts.push(format)
	                format = null
	            }
	        }
	        parts.forEach(function(value) {
	            fn = DATE_FORMATS[value]
	            text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
	        })
	        return text
	    }
	    var locate = {
	        AMPMS: {
	            0: "上午",
	            1: "下午"
	        },
	        DAY: {
	            0: "星期日",
	            1: "星期一",
	            2: "星期二",
	            3: "星期三",
	            4: "星期四",
	            5: "星期五",
	            6: "星期六"
	        },
	        MONTH: {
	            0: "1月",
	            1: "2月",
	            2: "3月",
	            3: "4月",
	            4: "5月",
	            5: "6月",
	            6: "7月",
	            7: "8月",
	            8: "9月",
	            9: "10月",
	            10: "11月",
	            11: "12月"
	        },
	        SHORTDAY: {
	            "0": "周日",
	            "1": "周一",
	            "2": "周二",
	            "3": "周三",
	            "4": "周四",
	            "5": "周五",
	            "6": "周六"
	        },
	        fullDate: "y年M月d日EEEE",
	        longDate: "y年M月d日",
	        medium: "yyyy-M-d H:mm:ss",
	        mediumDate: "yyyy-M-d",
	        mediumTime: "H:mm:ss",
	        "short": "yy-M-d ah:mm",
	        shortDate: "yy-M-d",
	        shortTime: "ah:mm"
	    }
	    locate.SHORTMONTH = locate.MONTH
	    filters.date.locate = locate
	}// jshint ignore:line
	/*********************************************************************
	 *                     END                                  *
	 **********************************************************************/
	new function () {
	    avalon.config({
	        loader: false
	    })
	    var fns = [], loaded = DOC.readyState === "complete", fn
	    function flush(f) {
	        loaded = 1
	        while (f = fns.shift())
	            f()
	    }

	    avalon.bind(DOC, "DOMContentLoaded", fn = function () {
	        avalon.unbind(DOC, "DOMContentLoaded", fn)
	        flush()
	    })

	    var id = setInterval(function () {
	        if (document.readyState === "complete" && document.body) {
	            clearInterval(id)
	            flush()
	        }
	    }, 50)

	    avalon.ready = function (fn) {
	        loaded ? fn(avalon) : fns.push(fn)
	    }
	    avalon.ready(function () {
	        avalon.scan(DOC.body)
	    })
	}


	// Register as a named AMD module, since avalon can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase avalon is used because AMD module names are
	// derived from file names, and Avalon is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of avalon, it will work.

	// Note that for maximum portability, libraries that are not avalon should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. avalon is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return avalon
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	    }
	// Map over avalon in case of overwrite
	    var _avalon = window.avalon
	    avalon.noConflict = function(deep) {
	        if (deep && window.avalon === avalon) {
	            window.avalon = _avalon
	        }
	        return avalon
	    }
	// Expose avalon identifiers, even in AMD
	// and CommonJS for browser emulators
	    if (noGlobal === void 0) {
	        window.avalon = avalon
	    }
	    return avalon

	}));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 手风琴组件
	 * @enName accordion
	 * @introduce
	 *    <p>手风琴组件可以将多个内容组织到多个小面板中，通过点击面板的<code>小三角</code>(默认)或<code>标题</code>(需要配置)可以展开或者收缩其内容，使用效果很像<code>Tab</code>。作为备选，还可以通过将鼠标放置到标题上来展开或者收缩。
	                此组件能方便我们在有限的区域中放置众多信息。</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, sourceHTML) {
	    var template = sourceHTML,
	        templateArr = template.split("MS_OPTION_MODE_CARET"),
	        caretTemplate = templateArr[1],
	        navTemplate = templateArr[0],
	        accordionNum = 0;
	    var widget = avalon.ui.accordion = function(element, data, vmodels) {
	        var options = data.accordionOptions,
	            vmodelsLength = vmodels.length,
	            accordionOpts = data.value.split(",")[2],
	            msData = Object.keys(element.msData),
	            _data = [],
	            dataVM = [],
	            accordionTemp = "",
	            horizontalHeaderStyle = "ms-css-width='headerWidth' ms-css-height='headerAndContentHeight'",
	            horizontalH2Style = "ms-css-bottom='-headerWidth' ms-css-width='headerAndContentHeight' ms-css-height='headerWidth'",
	            horizontalContentStyle = "ms-css-width='contentWidth' ms-css-height='headerAndContentHeight'",
	            animateTime = 0;

	        accordionNum += 1
	        if (vmodelsLength > 1) { // 存在嵌套的accordion时，需要手动将配置对象mix到options上，这就要求所有accordion的组件定义必须存在id和options选项，比如：ms-widget="accordion,accordionId,accordionOpts"
	            avalon.mix(options, vmodels[vmodelsLength-1][accordionOpts]);
	        }
	        navTemplate = options.direction === "vertical" ? navTemplate.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT", "").replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g, "") : navTemplate.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT", horizontalHeaderStyle).replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g,horizontalContentStyle)
	        if (options.direction === "vertical") {
	            accordionTemp = options.mode == "caret" ? caretTemplate : navTemplate 
	        } else {
	            options.mode = "nav"
	            options.multiple = false
	            accordionTemp = navTemplate.replace("MS_OPTION_HORIZONTAL_TITLE", horizontalH2Style)
	        }
	        // 根据mode的不同使用不同的template
	        options.template = options.getTemplate(accordionTemp, options);
	        msData.forEach(function(item){
	            if(item.indexOf("ms-each") === 0) {
	                _data = element.msData[item]
	                dataVM = avalon.getModel(_data, vmodels)
	                _data = dataVM[1][dataVM[0]]
	                element.removeAttribute(item)
	                return false
	            }
	        })
	        options.data = !options.data.length ? _data.$model || _data: options.data
	        avalon.each(options.data, function(index, item) {
	            var toggle = item.toggle 
	            item.toggle = toggle !== void 0 ? toggle : false
	        })
	        var vmodel = avalon.define(data.accordionId, function(vm) {
	            avalon.mix(vm, options)
	            vm.$skipArray = ["widgetElement", "rendered","autoRun","template","accordionClass","currentTrigge","initIndex","multiple","trigger","triggerType", "accordionVmodel", "rootElement"]
	            vm.widgetElement = element
	            vm.rootElement = {}
	            vm.$headers = [] // 保存所有面板的header
	            vm.$panels = [] // 保存所有的面板content
	            vm.$triggers = []
	            /**
	             * @interface 组件是否完成渲染,false未完成，true完成
	             */
	            vm.rendered = false 
	            vm._renderView = function(continueScan) {
	                var template = options.template,
	                    accordionItems = "",
	                    elementClass = 'oni-accordion oni-accordion-mode-' + options.mode + ' js-accordion' + accordionNum+" "+options.accordionClass,
	                    header, 
	                    content, 
	                    trigger,
	                    accordionInnerWrapper,
	                    initIndex = options.initIndex

	                avalon(element).addClass(elementClass)
	                element.setAttribute("ms-css-width","width")
	                template = template.replace(/MS_OPTION_ACTIVECLASS/g, options.currentTriggerClass)
	                element.innerHTML = template
	                accordionInnerWrapper = element.children[0]// accordion wrapper
	                accordionItems = accordionInnerWrapper.children
	                header = accordionItems[0] // header
	                content = accordionItems[1] // panel
	                if (!!options.trigger) {
	                    var headerChildren = header.children;
	                    for (var i=0, el; el = headerChildren[i++];) {
	                        if (avalon(el).hasClass(options.trigger)) {
	                            trigger = el
	                            break;
	                        }
	                    }
	                }
	                if (options.trigger && trigger) { // 如果设置了触发 面板切换事件的节点class，那么将事件绑定在对应节点
	                    trigger.setAttribute("ms-on-"+options.triggerType, options.triggerType+"Callback($event,$index)")
	                } else { // 未设置触发节点则在整个header上触发
	                    header.setAttribute("ms-on-"+options.triggerType, options.triggerType+"Callback($event,$index)")
	                    avalon(header).css("cursor","pointer")
	                }
	                if (initIndex !== null) {
	                    vmodel.currentIndex = initIndex
	                    vmodel.data[initIndex].toggle = true 
	                }
	                vm.rootElement = element.getElementsByTagName("*")[0]
	                if (continueScan) {
	                    continueScan()
	                } else {
	                    avalon.log("avalon请尽快升到1.3.7+")
	                    avalon.scan(element, [vmodel].concat(vmodels))
	                    if (typeof options.onInit === "function") {
	                        options.onInit.call(element, vmodel, options, vmodels)
	                    }
	                }
	                vmodel.rendered = true
	                setTimeout(function() { // 渲染完组件之后，将对应面板的header和panel分别保存
	                    for (var i=0, el; el = accordionItems[i++];) {
	                        var $el = avalon(el)
	                        if ($el.hasClass("oni-accordion-header")) {
	                            vmodel.$headers.push(el)
	                            if(!!options.trigger) {
	                                var headerChildren = el.children
	                                for(var j=0, subEl; subEl = headerChildren[j++];) {
	                                    if(avalon(subEl).hasClass(options.trigger)) {
	                                        vmodel.$triggers.push(subEl);
	                                        break;
	                                    }
	                                }
	                            } else {
	                                vmodel.$triggers.push(el)
	                            }

	                        } else if($el.hasClass("oni-accordion-content")) {
	                            vmodel.$panels.push(el)
	                        }
	                    }
	                }, 400)
	            }
	            vm.$init = function(continueScan) {
	                if(!vmodel.data.length) {
	                    // 从dom中抓取数据
	                    var list = [],
	                        subEle,
	                        next = null;
	                    while(subEle = element.firstChild) {
	                        if(subEle.nodeType !==1) {
	                            element.removeChild(subEle)
	                            continue
	                        }
	                        next = subEle.nextSibling
	                        while(next.nodeType !==1) {
	                            element.removeChild(next)
	                            next = subEle.nextSibling
	                        }
	                        if(avalon(subEle).hasClass("title")) {
	                            list.push({
	                                title: subEle.innerHTML.trim(),
	                                content: next.innerHTML.trim(),
	                                toggle: false
	                            })
	                        }
	                        element.removeChild(subEle)
	                        element.removeChild(next)
	                    }
	                    vmodel.data = list
	                }
	                element.$vmodel = vmodel
	                if (options.autoRun) {
	                    vm._renderView(continueScan)
	                }
	            }
	            // 点击面板header时的回调,设置triggerType为click时执行
	            vm.clickCallback = function(event,index) {
	                vmodel._eventCallback(event, index)
	            }
	            // mouseenter面板header时的回调，设置triggerType为mouseenter时执行
	            vm.mouseenterCallback = function(event, index) {
	                vmodel._eventCallback(event, index)
	            }
	            /**
	             * @interface 当组件移出DOM树时,系统自动调用的销毁函数
	             */
	            vm.$remove = function() {
	                element.innerHTML = element.textContent = ""
	            }
	            
	            /**
	             * @interface 重定义组件配置数据对象
	             * @param data {Array} 结构如下：
	             * <pre class="brush:javascript;gutter:false;toolbar:false">
	                [{
	                title: "标题1",
	                content: "正文1"
	                },
	                {
	                title: "标题2",
	                content: "正文2"
	                }] 
	                </pre>
	             *
	             */
	            vm.setData = function(data) {
	                avalon.each(data, function(index, item) {
	                    item.toggle = item.toggle !== void 0 ? item.toggle : false
	                })
	                vmodel.data = data
	                vmodel.currentIndex = -1
	                vmodel._renderView()
	            }
	            /**
	             * @interface 手工刷新组件视图,也可以传递参数data，重渲染组件视图
	             * @param data {Array} 结构如下：
	             * <pre class="brush:javascript;gutter:false;toolbar:false">
	                [{
	                title: "标题1",
	                content: "正文1"
	                },
	                {
	                title: "标题2",
	                content: "正文2"
	                }] 
	                </pre>
	             *
	             */
	            vm.refresh = function(data) {
	                if (data) {
	                    vmodel.setData(data)
	                } else if(!vmodel.rendered){
	                    vm._renderView()
	                }
	            }
	            /**
	             * @interface 获得当前展开的accordion标题对象，仅在config.multiple == false时有效
	             * @returns {ElementObj} 标题dom对象的引用
	             */
	            vm.getCurrentHeader = function() {
	                if (options.multiple) {
	                    return null
	                }
	                return vmodel.$headers[this.currentIndex]
	            }
	            /**
	             * @interface 获得当前展开的accordion面板对象，仅在config.multiple == false时有效
	             * @returns {ElementObj} 面板dom对象的引用
	             */
	            vm.getCurrentPanel = function() {
	                if (options.multiple) {
	                    return null
	                }
	                return vmodel.$panels[this.currentIndex]
	            }
	            /**
	             * @interface 获得指定序号的accordion面板对应的标题节点对象
	             * @param index {Number} 面板序号
	             * @returns {ElementObj} 指定序号的标题dom对象的引用
	             */
	            vm.getHeader = function(index) {
	                return vmodel.$headers[index]
	            }
	            /**
	             * @interface 获得指定序号的accordion面板对应的面板节点对象
	             * @param index {Number} 面板序号
	             * @returns {ElementObj} 指定序号的面板dom对象的引用
	             */
	            vm.getPanel = function(index) {
	                return vmodel.$panels[index]
	            }
	            /**
	             * @interface 获得组件的面板数量
	             * @returns {Number} 手风琴面板个数
	             */
	            vm.getLength = function() {
	                return options.data.length
	            }
	            /**
	             * @interface 获得指定序号的accordion面板展开(1)/收起(0)状态
	             * @param index {Number} 指定面板序号(从0开始)
	             * @returns {Number} 1表示index对应面板展开，0表示收起
	             */
	            vm.getStatus = function(index) {
	                return (avalon(vmodel.$panels[index]).css('display') === 'none') ? 0 : 1
	            }
	            /**
	             * @interface 切换accordion面板的展开
	             * @param index {Number} 指定面板序号(从0开始)
	             */
	            vm.switchTo = function(index) {
	                var event= {
	                        target: vmodel.$triggers[index]
	                    }
	                if (options.onBeforeSwitch.call(event.target, index, vm.getHeader(index), vm.getPanel(index)) === false) {
	                    return false
	                }
	                vmodel.currentIndex = index
	                vmodel.data[index].toggle = true
	            }
	            vm._eventCallback = eventCallback
	        })
	        vmodel.$watch("currentIndex", function(newVal, oldVal) {
	            var panel = vmodel.getPanel(newVal)
	            if (vmodel.direction == "horizontal" && panel) {
	                clearTimeout(animateTime) 
	                animate(panel, Number(vmodel.contentWidth) || 400)
	            } 
	            if (!vmodel.multiple && oldVal !== -1) {
	                vmodel.data[oldVal].toggle = false
	            }
	        })
	        function eventCallback(event, index) {
	            var header = vmodel.getHeader(index),
	                $header = avalon(header),
	                panel = vmodel.getPanel(index),
	                dataItem = vmodel.data[index],
	                itemToggle = !dataItem.toggle

	            if (index === vmodel.currentIndex && event.type === "mouseenter") {
	                return
	            }
	            if (options.onBeforeSwitch.call(event.target, index, header, panel) === false) {
	                return false
	            }

	            vmodel.data[index].toggle = itemToggle
	            if (itemToggle) {
	                vmodel.currentIndex = index
	            }
	            options.onSwitch.call(event.target, index, header, panel)
	        }

	        function animate(panel, width) {
	            var currentWidth = 0
	            function widthAnimate() {
	                currentWidth += 10
	                if (currentWidth > width) {
	                    currentWidth = width
	                    panel.style.width = currentWidth + "px"
	                    clearTimeout(animateTime)
	                    return false
	                }
	                panel.style.width = currentWidth + "px"
	                animateTime = setTimeout(widthAnimate, 10)
	            }
	            widthAnimate()
	        }
	        return vmodel
	    }
	    widget.version = 1.0
	    widget.defaults = {
	        width: '100%', //@config 配置组件宽度(type: Number || Percent)
	        headerWidth: 30, //@config 组件水平展开时，头部的宽
	        contentWidth: 400, //@config 组件水平展开时内容的宽
	        headerAndContentHeight: 200, //@config 组件水平展开时的高度
	        autoRun: true, //@config 告知组件是否自动渲染，设为false时需要手动调用refresh方法进行组件的解析渲染
	        template: "", //@config 用户自定义template
	        accordionClass: "", //@config 为accordion容器自定义的class
	        currentTriggerClass: "oni-state-active", //@config 展开accordion面板时，header添加的class
	        /**
	         * @interface 配置accordion组件要展示的数据对象，格式为
	            <pre class="brush:javascript;gutter:false;toolbar:false">
	            [
	            {title: String, content: String},
	            {title: String, content: String},
	            {title: String, content: String}
	             ]
	            </pre> 
	         */
	        data: [], 
	        initIndex: null, //@config 初始展开第几个面板
	        mode: "caret", //@config 组件展开模式，取值说明："nav"=面板header无小三角图标，"caret"=展开面板有小三角图标，可以定义是点击图标展开面板还是点击header即展开，默认是点击header即展开，当然也可以通过getTemplate自定义模板
	        multiple: false, //@config 是否可以同时打开多个面板
	        widgetElement: "", //@interface 保存绑定组件元素的引用
	        trigger: "oni-accordion-header", //@config 触发展开面板的dom节点对应class，比如mode为caret时想要只通过小图标展开隐藏panel时可以设置为"oni-accordion-trigger"
	        triggerType: 'click', //@config 触发展开面板的事件类型，可以是：click|mouseenter
	        currentIndex: -1, //@interface 组件最新展开的面板序号，不可配置
	        direction: "vertical", //@config 组件的展开方向，默认为垂直展开，也可以水平展开("horizontal")
	        /**
	         * @config {Function} 组件面板展开前回调函数
	         * @param index {Number} 面板序号
	         * @param header {Object} 标题区域节点对象
	         * @param panel {Object} 面板区域节点对象
	         * @returns {Boolean| Undefined} 若返回false则不展开面板 
	         */
	        onBeforeSwitch: avalon.noop, //@config
	        /**
	         * @config {Function} 组件面板展开后的回调函数
	         * @param index {Number} 面板序号
	         * @param header {Object} 标题区域节点对象
	         * @param panel {Object} 面板区域节点对象
	         */
	        onSwitch: avalon.noop, //@config
	        /**
	         * @config {Function} 远程更改数据
	         * @param vmodel {Object} 组件自身vmodel
	         * @param options {Object} 组件的配置对象
	         * @param vmodels {Array} 组件的祖先vmodel组成的数组链
	         */
	        onInit: avalon.noop, //@config
	        /**
	         * @config {Function} 方便用户自定义模板
	         * @param str {String} 默认模板
	         * @param opts {Object} vmodel
	         * @returns {String} 新模板
	         */
	        getTemplate: function(str, options) {
	            return str
	        }
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/**
	 @links
	 [简单例子](avalon.accordion.ex1.html)
	 [使用setData或者refresh(data)重新渲染accordion](avalon.accordion.ex2.html)
	 [accordion提供的各种API](avalon.accordion.ex3.html)
	 [嵌套的accordion](avalon.accordion.ex4.html)
	 [文字内容水平展开的accordion](avalon.accordion.ex5.html)
	 */

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    function getChildVM(expr, vm, strLen) {
	        var t = vm, pre, _t;
	        for (var i = 0, len = expr.length; i < len; i++) {
	            var k = expr[i];
	            _t = t.$model || t;
	            if (typeof _t[k] !== 'undefined') {
	                pre = t;
	                t = t[k];
	            } else {
	                return;
	            }
	        }
	        if (strLen > 1) {
	            return pre[k];
	        } else {
	            return pre;
	        }
	    }
	   // 在一堆VM中，提取某一个VM的符合条件的子VM
	   // 比如 vm.aaa.bbb = {} ; 
	   // avalon.getModel("aaa.bbb", vmodels) ==> ["bbb", bbbVM, bbbVM所在的祖先VM（它位于vmodels中）]
	    avalon.getModel = function(expr, vmodels){
	        if (!expr) {
	            return null;
	        }
	        var str = expr.split('.'),
	            strLen = str.length,
	            last = str[strLen-1];
	        if (str.length != 1) {
	            str.pop();
	        }
	        for (var i = 0, len = vmodels.length; i < len; i++) {
	            var ancestor = vmodels[i];
	            var child = getChildVM(str, ancestor, strLen);
	            if (typeof child !== 'undefined' && (child.hasOwnProperty(last) || Object.prototype.hasOwnProperty.call(child, last))) {
	                return [last, child, ancestor];
	            }
	        }
	        return null;
	    }
	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-accordion-inner\" ms-each-item=\"data\" ms-class=\"oni-accordion-horizontal: direction==='horizontal'\">\n    <div class=\"oni-accordion-header oni-widget-header oni-state-default oni-accordion-trigger\"\n\n        ms-class=\"MS_OPTION_ACTIVECLASS:item.toggle\"\n        ms-class-1=\"oni-corner-top: item.toggle && direction==='vertical'\"\n        ms-class-2=\"oni-corner-all: direction==='vertical'\"\n        MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT\n        ms-hover=\"oni-state-hover\">\n        <h2 ms-if=\"direction==='horizontal'\" MS_OPTION_HORIZONTAL_TITLE>{{item.title}} {{$index}}{{currentIndex}}</h2>\n        <span ms-if=\"direction==='vertical'\">{{item.title}}</span>\n    </div>\n    <div class=\"oni-accordion-content oni-widget-content oni-state-default\" \n         ms-visible=\"item.toggle\"\n         ms-class=\"oni-corner-bottom: direction==='vertical'\"\n         MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT>\n         <div MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT>\n            {{item.content|html}}\n         </div>\n    </div>\n</div>\nMS_OPTION_MODE_CARET\n<div class=\"oni-accordion-inner\" ms-each-item=\"data\">\n    <div class=\"oni-accordion-header oni-widget-header oni-state-default oni-corner-all\"\n        ms-class=\"MS_OPTION_ACTIVECLASS:item.toggle\"\n        ms-class-1=\"oni-corner-top: item.toggle\"\n        ms-hover=\"oni-state-hover\">\n        <span class=\"oni-accordion-icon-wrap oni-accordion-trigger\">\n            <i class=\"oni-icon oni-icon-caret-right\">&#xf040;</i>\n            <i class=\"oni-icon oni-icon-caret-down\">&#xf033;</i>\n        </span> \n        {{item.title}}\n    </div>\n    <div class=\"oni-accordion-content oni-state-default oni-widget-content oni-corner-bottom\" ms-visible=\"item.toggle\">\n        {{item.content|html}}\n    </div>\n</div>"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../usr/local/lib/node_modules/css-loader/index.js!./oniui-common.css", function() {
				var newContent = require("!!./../../../../../../usr/local/lib/node_modules/css-loader/index.js!./oniui-common.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "\n/*\nchameleon\nby 司徒正美 2014.6.28 拉萨开往西宁的火车上\n这里放置所有组件都共用的类名，它们根据compass构建\n\noinui的CSS规范\n\n不能出现大写,以连字符风格命名 \n表示状态的应该用ui-state-*命名 \n表示功能的应该用ui-helper-*命名\n表示布局的应用用ui-uiname-* 命名, 它的子元素应该全部包在 .oni-uiname这个根类下\n如 .oni-grid .oni-grid-tbody{ ... }\n如果某一个区域的背景要换肤,能用ui-widget-header或ui-widget-content就尽用\n其他细微之后的换肤,使用ui-state-*-?-color实现,或至少包在if(oniui-theme === xxx){}分支内\n\n\n样式规则的出现顺序\n1 display float position overflow表示布局的样式\n2 width height line-height 表示尺寸的样式\n3 margin border padding 表示盒子模型的样式\n4 cursor font-size vertical-align text-align user-select outline....装饰用的样式\n5 color background 表示换肤的样式(上面的bordrer-color outline-color也可以放到这里)\n\n\nCSSShrink 是一个压缩 CSS 的在线工具。压缩比真高！\n\nhttp://cssshrink.com/\n*/\n.oni-helper-hidden {\n  display: none; }\n\n.oni-helper-hidden-accessible {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.oni-helper-reset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  line-height: 1.3;\n  text-decoration: none;\n  font-size: 100%;\n  list-style: none; }\n\n.oni-helper-noselect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none; }\n  .oni-helper-noselect img, .oni-helper-noselect a {\n    -webkit-user-drag: none;\n    pointer-events: none; }\n\n.oni-helper-clearfix {\n  *zoom: 1; }\n  .oni-helper-clearfix:after {\n    content: \" \";\n    display: block;\n    height: 0;\n    clear: both;\n    overflow: hidden;\n    visibility: hidden; }\n\nhtml .oni-helper-max-index, body .oni-helper-max-index {\n  z-index: 1000; }\n\n@font-face {\n  font-family: fontawesome;\n  font-style: normal;\n  font-weight: normal;\n  src: url(\"http://source.qunarzz.com/fonts/oniui/0.0.3/oniui-webfont.eot?v=4.2.0\");\n  src: url(\"http://source.qunarzz.com/fonts/oniui/0.0.3/oniui-webfont.eot?#iefix&v=4.2.0\") format(\"embedded-opentype\"), \n       url(\"http://source.qunarzz.com/fonts/oniui/0.0.3/oniui-webfont.woff?v=4.2.0\") format(\"woff\"), \n       url(\"http://source.qunarzz.com/fonts/oniui/0.0.3/oniui-webfont.ttf?v=4.2.0\") format(\"truetype\"), \n       url(\"http://source.qunarzz.com/fonts/oniui/0.0.3/oniui-webfont.svg?v=4.2.0#fontawesomeregular\") format(\"svg\");}\n.oni-icon {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  cursor: default;\n  font-family: fontawesome !important;\n  font-size: 14px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 18px;\n  vertical-align: middle; }\n\na .oni-icon, .oni-btn .oni-icon {\n  cursor: pointer; }\n\n.oni-state-error {\n  border: 1px solid #ff8888; }\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../usr/local/lib/node_modules/css-loader/index.js!./avalon.accordion.css", function() {
				var newContent = require("!!./../../../../../../usr/local/lib/node_modules/css-loader/index.js!./avalon.accordion.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "\n/*\n这是每个都组件都应该引用的部分\n*/\n.oni-accordion { display: -moz-inline-stack; display: inline-block; vertical-align: middle; *vertical-align: auto; zoom: 1; *display: inline; vertical-align: middle; width: 100%; font-family: 1.1em; font-size: 1em; }\n.oni-accordion .oni-corner-all { border-radius: 4px; }\n.oni-accordion .oni-corner-top { border-top-left-radius: 4px; border-top-right-radius: 4px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }\n.oni-accordion .oni-corner-bottom { border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; border-top-left-radius: 0; border-top-right-radius: 0; }\n.oni-accordion.oni-accordion-mode-nav { margin-top: -1px; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner { border-top: 0 none; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner .oni-accordion-header { padding: 7px 10px; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner.oni-accordion-horizontal div { float: left; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner.oni-accordion-horizontal div.oni-accordion-header { margin: 0; position: relative; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner.oni-accordion-horizontal div.oni-accordion-header h2 { -webkit-transform-origin: 0 0; -moz-transform-origin: 0 0; -ms-transform-origin: 0 0; -o-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); -ms-transform: rotate(-90deg); -o-transform: rotate(-90deg); transform: rotate(-90deg); position: absolute; left: 10px; margin: 0; padding: 0; }\n.oni-accordion.oni-accordion-mode-nav .oni-accordion-inner.oni-accordion-horizontal div.oni-accordion-content { overflow: hidden; }\n.oni-accordion.oni-accordion-mode-caret .oni-accordion-inner { border: 0 none; }\n.oni-accordion .oni-accordion-header { display: block; min-height: 0; position: relative; margin: 2px 0 0 0; padding: 7px 10px; cursor: pointer; font-size: 100%; }\n.oni-accordion .oni-accordion-header.oni-state-default { border: 1px solid #d3d3d3; background-color: #e6e6e6; font-weight: normal; color: #555; }\n.oni-accordion .oni-accordion-header .oni-icon-caret-right { display: inline; }\n.oni-accordion .oni-accordion-header .oni-icon-caret-down { display: none; }\n.oni-accordion .oni-accordion-header.oni-state-hover { border: 1px solid #999999; background: #dadada; font-weight: normal; color: #212121; }\n.oni-accordion .oni-accordion-header.oni-state-active { background: #fff; border: 1px solid #aaa; color: #212121; }\n.oni-accordion .oni-accordion-header.oni-state-active .oni-icon-caret-down { display: inline; }\n.oni-accordion .oni-accordion-header.oni-state-active .oni-icon-caret-right { display: none; }\n.oni-accordion .oni-accordion-icons { padding-left: 2.2em; }\n.oni-accordion .oni-accordion-icons .oni-accordion-icons { padding-left: 2.2em; }\n.oni-accordion .oni-accordion-icon-wrap { display: -moz-inline-stack; display: inline-block; vertical-align: middle; *vertical-align: auto; zoom: 1; *display: inline; width: 14px; vertical-align: middle; text-align: right; cursor: pointer; }\n.oni-accordion .oni-accordion-icon-wrap .oni-icon { cursor: pointer; }\n.oni-accordion .oni-accordion-content { border-top: 0; padding: 7px 10px; overflow: auto; font-size: 12px; }\n.oni-accordion .oni-accordion-content.oni-state-default { border: 1px solid #aaa; background: #fff; color: #000; }\n.oni-accordion .oni-accordion-content.oni-state-active { background: #fff; border: 1px solid #aaa; }\n.oni-accordion .oni-accordion-content.oni-state-hover { border: 1px solid #999999; background: #dadada; font-weight: normal; color: #212121; }\n.oni-accordion .oni-accordion-content .oni-accordion-content { border: 1px solid #aaa; background: #fff; color: #333; }\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
	!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

	    return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
	    return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"=="function"&&__webpack_require__(12)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});
	//# sourceMappingURL=jquery.min.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);