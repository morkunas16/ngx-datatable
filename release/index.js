/**
 * angular2-data-table v"13.1.0" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
	else if(typeof define === 'function' && define.amd)
		define("ngxDatatable", ["@angular/common", "@angular/core", "@angular/platform-browser", "rxjs", "rxjs/operators"], factory);
	else if(typeof exports === 'object')
		exports["ngxDatatable"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
	else
		root["ngxDatatable"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["rxjs"], root["rxjs/operators"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__angular_common__, __WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_platform_browser__, __WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/atoa/atoa.js":
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),

/***/ "./node_modules/contra/debounce.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__("./node_modules/ticky/ticky-browser.js");

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),

/***/ "./node_modules/contra/emitter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__("./node_modules/atoa/atoa.js");
var debounce = __webpack_require__("./node_modules/contra/debounce.js");

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),

/***/ "./node_modules/crossvent/node_modules/custom-event/index.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/crossvent/src/crossvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__("./node_modules/crossvent/node_modules/custom-event/index.js");
var eventmap = __webpack_require__("./node_modules/crossvent/src/eventmap.js");
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/crossvent/src/eventmap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js??ref--3-4!./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ngx-datatable {\n  display: block;\n  overflow: hidden;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  /**\n   * Vertical Scrolling Adjustments\n   */\n  /**\n   * Horizontal Scrolling Adjustments\n   */\n  /**\n   * Fixed Header Height Adjustments\n   */\n  /**\n   * Fixed row height adjustments\n   */\n  /**\n   * Shared Styles\n   */\n  /**\n   * Header Styles\n   */\n  /**\n   * Body Styles\n   */\n  /**\n   * Footer Styles\n   */ }\n  .ngx-datatable [hidden] {\n    display: none !important; }\n  .ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  .ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto; }\n  .ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper {\n    position: absolute; }\n  .ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n  .ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row; }\n  .ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    overflow-x: hidden;\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625; }\n    .ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-group,\n  .ngx-datatable .datatable-row-right {\n    position: relative; }\n  .ngx-datatable .datatable-header {\n    display: block;\n    overflow: hidden; }\n    .ngx-datatable .datatable-header .datatable-header-inner {\n      -webkit-box-align: stretch;\n          -ms-flex-align: stretch;\n              align-items: stretch;\n      -webkit-align-items: stretch; }\n    .ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper {\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper {\n        cursor: move; }\n      .ngx-datatable .datatable-header .datatable-header-cell .sort-btn {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block;\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle, .ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 4px;\n        visibility: hidden; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        cursor: ew-resize; }\n      .ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible; }\n      .ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable {\n        visibility: visible; }\n      .ngx-datatable .datatable-header .datatable-header-cell .targetMarker {\n        position: absolute;\n        top: 0;\n        bottom: 0; }\n        .ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft {\n          right: 0; }\n        .ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight {\n          left: 0; }\n      .ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap {\n        height: inherit; }\n  .ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block; }\n    .ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block; }\n    .ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden; }\n    .ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n    .ngx-datatable .datatable-body .datatable-body-row {\n      outline: none; }\n      .ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n  .ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%; }\n    .ngx-datatable .datatable-footer .datatable-footer-inner {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 100%; }\n    .ngx-datatable .datatable-footer .selected-count .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 40%;\n              flex: 1 1 40%; }\n    .ngx-datatable .datatable-footer .selected-count .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 60%;\n              flex: 1 1 60%; }\n    .ngx-datatable .datatable-footer .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 20%;\n              flex: 1 1 20%; }\n    .ngx-datatable .datatable-footer .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 80%;\n              flex: 1 1 80%;\n      text-align: right; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed; }\n\n/* in-flight clone */\n.gu-mirror {\n  position: fixed !important;\n  margin: 0 !important;\n  z-index: 9999 !important;\n  opacity: 0.8;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";\n  filter: alpha(opacity=80);\n  pointer-events: none; }\n\n/* high-performance display:none; helper */\n.gu-hide {\n  left: -9999px !important; }\n\n/* added to mirrorContainer (default = body) while dragging */\n.gu-unselectable {\n  -webkit-user-select: none !important;\n  -moz-user-select: none !important;\n  -ms-user-select: none !important;\n  user-select: none !important; }\n\n/* added to the source element while its mirror is dragged */\n.gu-transit {\n  opacity: 0.2;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";\n  filter: alpha(opacity=20); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/dragula/classes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),

/***/ "./node_modules/dragula/dragula.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__("./node_modules/contra/emitter.js");
var crossvent = __webpack_require__("./node_modules/crossvent/src/crossvent.js");
var classes = __webpack_require__("./node_modules/dragula/classes.js");
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ng2-dragula/dist/fesm5/ng2-dragula.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/dragula/dragula.js
var dragula = __webpack_require__("./node_modules/dragula/dragula.js");
var dragula_default = /*#__PURE__*/__webpack_require__.n(dragula);

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

// EXTERNAL MODULE: external "@angular/core"
var core_ = __webpack_require__("@angular/core");
var core__default = /*#__PURE__*/__webpack_require__.n(core_);

// EXTERNAL MODULE: external "rxjs"
var external__rxjs_ = __webpack_require__("rxjs");
var external__rxjs__default = /*#__PURE__*/__webpack_require__.n(external__rxjs_);

// EXTERNAL MODULE: external "rxjs/operators"
var operators_ = __webpack_require__("rxjs/operators");
var operators__default = /*#__PURE__*/__webpack_require__.n(operators_);

// CONCATENATED MODULE: ./node_modules/ng2-dragula/dist/fesm5/ng2-dragula.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragulaDirective", function() { return ng2_dragula_DragulaDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragulaService", function() { return ng2_dragula_DragulaService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragulaModule", function() { return ng2_dragula_DragulaModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragula", function() { return ng2_dragula_dragula; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrakeFactory", function() { return DrakeFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return Group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTypes", function() { return EventTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockDrake", function() { return ng2_dragula_MockDrake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockDrakeFactory", function() { return MockDrakeFactory; });







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Group = /** @class */ (function () {
    function Group(name, drake, options) {
        this.name = name;
        this.drake = drake;
        this.options = options;
        this.initEvents = false;
    }
    return Group;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
var EventTypes = {
    Cancel: "cancel",
    Cloned: "cloned",
    Drag: "drag",
    DragEnd: "dragend",
    Drop: "drop",
    Out: "out",
    Over: "over",
    Remove: "remove",
    Shadow: "shadow",
    DropModel: "dropModel",
    RemoveModel: "removeModel",
};
/** @type {?} */
var AllEvents = Object.keys(EventTypes).map(function (k) { return (EventTypes[/** @type {?} */ (k)]); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var ng2_dragula_dragula = dragula_default.a || dragula;
var DrakeFactory = /** @class */ (function () {
    function DrakeFactory(build) {
        if (build === void 0) { build = ng2_dragula_dragula; }
        this.build = build;
    }
    return DrakeFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var filterEvent = function (eventType, filterDragType, projector) { return function (input) {
    return input.pipe(Object(operators_["filter"])(function (_a) {
        var event = _a.event, name = _a.name;
        return event === eventType
            && (filterDragType === undefined || name === filterDragType);
    }), Object(operators_["map"])(function (_a) {
        var name = _a.name, args = _a.args;
        return projector(name, args);
    }));
}; };
/** @type {?} */
var elContainerSourceProjector = function (name, _a) {
    var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
    return ({ name: name, el: el, container: container, source: source });
};
var ng2_dragula_DragulaService = /** @class */ (function () {
    function DragulaService(drakeFactory) {
        if (drakeFactory === void 0) { drakeFactory = null; }
        var _this = this;
        this.drakeFactory = drakeFactory;
        this.dispatch$ = new external__rxjs_["Subject"]();
        this.drag = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
            var _b = __read(_a, 2), el = _b[0], source = _b[1];
            return ({ name: name, el: el, source: source });
        })); };
        this.dragend = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
            var _b = __read(_a, 1), el = _b[0];
            return ({ name: name, el: el });
        })); };
        this.drop = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
            var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
            return { name: name, el: el, target: target, source: source, sibling: sibling };
        })); };
        this.elContainerSource = function (eventType) {
            return function (groupName) {
                return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
            };
        };
        this.cancel = this.elContainerSource(EventTypes.Cancel);
        this.remove = this.elContainerSource(EventTypes.Remove);
        this.shadow = this.elContainerSource(EventTypes.Shadow);
        this.over = this.elContainerSource(EventTypes.Over);
        this.out = this.elContainerSource(EventTypes.Out);
        this.cloned = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
            var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
            return { name: name, clone: clone, original: original, cloneType: cloneType };
        })); };
        this.dropModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
            var _b = __read(_a, 7), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6];
            return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel };
        })); };
        this.removeModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
            var _b = __read(_a, 5), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4];
            return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel };
        })); };
        this.groups = {};
        if (this.drakeFactory === null) {
            this.drakeFactory = new DrakeFactory();
        }
    }
    /**
     * Public mainly for testing purposes. Prefer `createGroup()`.
     * @param {?} group
     * @return {?}
     */
    DragulaService.prototype.add = /**
     * Public mainly for testing purposes. Prefer `createGroup()`.
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var existingGroup = this.find(group.name);
        if (existingGroup) {
            throw new Error('Group named: "' + group.name + '" already exists.');
        }
        this.groups[group.name] = group;
        this.handleModels(group);
        this.setupEvents(group);
        return group;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaService.prototype.find = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.groups[name];
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaService.prototype.destroy = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var group = this.find(name);
        if (!group) {
            return;
        }
        group.drake && group.drake.destroy();
        delete this.groups[name];
    };
    /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     * @template T
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    DragulaService.prototype.createGroup = /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     * @template T
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    function (name, options) {
        return this.add(new Group(name, this.drakeFactory.build([], options), options));
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DragulaService.prototype.handleModels = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var name = _a.name, drake = _a.drake, options = _a.options;
        /** @type {?} */
        var dragElm;
        /** @type {?} */
        var dragIndex;
        /** @type {?} */
        var dropIndex;
        drake.on('remove', function (el, container, source) {
            if (!drake.models) {
                return;
            }
            /** @type {?} */
            var sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel = sourceModel.slice(0);
            /** @type {?} */
            var item = sourceModel.splice(dragIndex, 1)[0];
            // console.log('REMOVE');
            // console.log(sourceModel);
            // console.log('REMOVE');
            // console.log(sourceModel);
            _this.dispatch$.next({
                event: EventTypes.RemoveModel,
                name: name,
                args: [el, container, source, item, sourceModel]
            });
        });
        drake.on('drag', function (el, source) {
            if (!drake.models) {
                return;
            }
            dragElm = el;
            dragIndex = _this.domIndexOf(el, source);
        });
        drake.on('drop', function (dropElm, target, source, sibling) {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = _this.domIndexOf(dropElm, target);
            /** @type {?} */
            var sourceModel = drake.models[drake.containers.indexOf(source)];
            /** @type {?} */
            var targetModel = drake.models[drake.containers.indexOf(target)];
            /** @type {?} */
            var item;
            if (target === source) {
                sourceModel = sourceModel.slice(0);
                item = sourceModel.splice(dragIndex, 1)[0];
                sourceModel.splice(dropIndex, 0, item);
                // this was true before we cloned and updated sourceModel,
                // but targetModel still has the old value
                targetModel = sourceModel;
            }
            else {
                /** @type {?} */
                var isCopying = dragElm !== dropElm;
                item = sourceModel[dragIndex];
                if (isCopying) {
                    if (!options.copyItem) {
                        throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
                    }
                    item = options.copyItem(item);
                }
                if (!isCopying) {
                    sourceModel = sourceModel.slice(0);
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel = targetModel.slice(0);
                targetModel.splice(dropIndex, 0, item);
                if (isCopying) {
                    try {
                        target.removeChild(dropElm);
                    }
                    catch (e) { }
                }
            }
            _this.dispatch$.next({
                event: EventTypes.DropModel,
                name: name,
                args: [dropElm, target, source, sibling, item, sourceModel, targetModel]
            });
        });
    };
    /**
     * @param {?} group
     * @return {?}
     */
    DragulaService.prototype.setupEvents = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        if (group.initEvents) {
            return;
        }
        group.initEvents = true;
        /** @type {?} */
        var name = group.name;
        /** @type {?} */
        var emitter = function (event) {
            group.drake.on(event, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.dispatch$.next({ event: event, name: name, args: args });
            });
        };
        AllEvents.forEach(emitter);
    };
    /**
     * @param {?} child
     * @param {?} parent
     * @return {?}
     */
    DragulaService.prototype.domIndexOf = /**
     * @param {?} child
     * @param {?} parent
     * @return {?}
     */
    function (child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    };
    DragulaService.decorators = [
        { type: core_["Injectable"] },
    ];
    /** @nocollapse */
    DragulaService.ctorParameters = function () { return [
        { type: DrakeFactory, decorators: [{ type: core_["Optional"] }] }
    ]; };
    return DragulaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ng2_dragula_DragulaDirective = /** @class */ (function () {
    function DragulaDirective(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.dragulaModelChange = new core_["EventEmitter"]();
    }
    Object.defineProperty(DragulaDirective.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () {
            return this.el && this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DragulaDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes && changes.dragula) {
            var _a = changes.dragula, prev = _a.previousValue, current = _a.currentValue, firstChange = _a.firstChange;
            /** @type {?} */
            var hadPreviousValue = !!prev;
            /** @type {?} */
            var hasNewValue = !!current;
            // something -> null       =>  teardown only
            // something -> something  =>  teardown, then setup
            //      null -> something  =>  setup only
            //
            //      null -> null (precluded by fact of change being present)
            if (hadPreviousValue) {
                this.teardown(prev);
            }
            if (hasNewValue) {
                this.setup();
            }
        }
        else if (changes && changes.dragulaModel) {
            var _b = changes.dragulaModel, prev = _b.previousValue, current = _b.currentValue, firstChange = _b.firstChange;
            var drake = this.group.drake;
            if (this.dragula && drake) {
                drake.models = drake.models || [];
                /** @type {?} */
                var prevIndex = drake.models.indexOf(prev);
                if (prevIndex !== -1) {
                    // delete the previous
                    drake.models.splice(prevIndex, 1);
                    // maybe insert a new one at the same spot
                    if (!!current) {
                        drake.models.splice(prevIndex, 0, current);
                    }
                }
                else if (!!current) {
                    // no previous one to remove; just push this one.
                    drake.models.push(current);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    DragulaDirective.prototype.setup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var checkModel = function (group) {
            if (_this.dragulaModel) {
                if (group.drake.models) {
                    group.drake.models.push(_this.dragulaModel);
                }
                else {
                    group.drake.models = [_this.dragulaModel];
                }
            }
        };
        /** @type {?} */
        var group = this.dragulaService.find(this.dragula);
        if (!group) {
            /** @type {?} */
            var options = {};
            group = this.dragulaService.createGroup(this.dragula, options);
        }
        // ensure model and container element are pushed
        checkModel(group);
        group.drake.containers.push(this.container);
        this.subscribe(this.dragula);
        this.group = group;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaDirective.prototype.subscribe = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        this.subs = new external__rxjs_["Subscription"]();
        this.subs.add(this.dragulaService
            .dropModel(name)
            .subscribe(function (_a) {
            var source = _a.source, target = _a.target, sourceModel = _a.sourceModel, targetModel = _a.targetModel;
            if (source === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(sourceModel);
            }
            else if (target === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(targetModel);
            }
        }));
        this.subs.add(this.dragulaService
            .removeModel(name)
            .subscribe(function (_a) {
            var source = _a.source, sourceModel = _a.sourceModel;
            if (source === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(sourceModel);
            }
        }));
    };
    /**
     * @param {?} groupName
     * @return {?}
     */
    DragulaDirective.prototype.teardown = /**
     * @param {?} groupName
     * @return {?}
     */
    function (groupName) {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        /** @type {?} */
        var group = this.dragulaService.find(groupName);
        if (group) {
            /** @type {?} */
            var itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
            if (itemToRemove !== -1) {
                group.drake.containers.splice(itemToRemove, 1);
            }
            if (this.dragulaModel && group.drake && group.drake.models) {
                /** @type {?} */
                var modelIndex = group.drake.models.indexOf(this.dragulaModel);
                if (modelIndex !== -1) {
                    group.drake.models.splice(modelIndex, 1);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    DragulaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.teardown(this.dragula);
    };
    DragulaDirective.decorators = [
        { type: core_["Directive"], args: [{ selector: '[dragula]' },] },
    ];
    /** @nocollapse */
    DragulaDirective.ctorParameters = function () { return [
        { type: core_["ElementRef"] },
        { type: ng2_dragula_DragulaService }
    ]; };
    DragulaDirective.propDecorators = {
        dragula: [{ type: core_["Input"] }],
        dragulaModel: [{ type: core_["Input"] }],
        dragulaModelChange: [{ type: core_["Output"] }]
    };
    return DragulaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ng2_dragula_DragulaModule = /** @class */ (function () {
    function DragulaModule() {
    }
    /**
     * @return {?}
     */
    DragulaModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DragulaModule,
            providers: [ng2_dragula_DragulaService]
        };
    };
    DragulaModule.decorators = [
        { type: core_["NgModule"], args: [{
                    exports: [ng2_dragula_DragulaDirective],
                    declarations: [ng2_dragula_DragulaDirective],
                },] },
    ];
    return DragulaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MockDrakeFactory = new DrakeFactory(function (containers, options) {
    return new ng2_dragula_MockDrake(containers, options);
});
/**
 * You can use MockDrake to simulate Drake events.
 *
 * The three methods that actually do anything are `on(event, listener)`,
 * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
 * events, and if you injected MockDrake properly with MockDrakeFactory or
 * mocked the DragulaService.find() method, then you can make ng2-dragula think
 * drags and drops are happening.
 *
 * Caveats:
 *
 * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
 * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
 *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
 * 3. None of the other methods do anything.
 *    That's ok, because ng2-dragula doesn't use them.
 */
var  /**
 * You can use MockDrake to simulate Drake events.
 *
 * The three methods that actually do anything are `on(event, listener)`,
 * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
 * events, and if you injected MockDrake properly with MockDrakeFactory or
 * mocked the DragulaService.find() method, then you can make ng2-dragula think
 * drags and drops are happening.
 *
 * Caveats:
 *
 * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
 * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
 *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
 * 3. None of the other methods do anything.
 *    That's ok, because ng2-dragula doesn't use them.
 */
ng2_dragula_MockDrake = /** @class */ (function () {
    /**
     * @param containers A list of container elements.
     * @param options These will NOT be used. At all.
     * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
     *               Note, default value is undefined, like a real Drake. Don't change that.
     */
    function MockDrake(containers, options, models) {
        if (containers === void 0) { containers = []; }
        if (options === void 0) { options = {}; }
        this.containers = containers;
        this.options = options;
        this.models = models;
        /* Doesn't represent anything meaningful. */
        this.dragging = false;
        this.emitter$ = new external__rxjs_["Subject"]();
        this.subs = new external__rxjs_["Subscription"]();
    }
    /* Does nothing useful. */
    /**
     * @param {?} item
     * @return {?}
     */
    MockDrake.prototype.start = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.dragging = true;
    };
    /* Does nothing useful. */
    /**
     * @return {?}
     */
    MockDrake.prototype.end = /**
     * @return {?}
     */
    function () {
        this.dragging = false;
    };
    /**
     * @param {?=} revert
     * @return {?}
     */
    MockDrake.prototype.cancel = /**
     * @param {?=} revert
     * @return {?}
     */
    function (revert) {
        this.dragging = false;
    };
    /* Does nothing useful. */
    /**
     * @return {?}
     */
    MockDrake.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.dragging = false;
    };
    /**
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    MockDrake.prototype.on = /**
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    function (event, callback) {
        this.subs.add(this.emitter$
            .pipe(Object(operators_["filter"])(function (_a) {
            var eventType = _a.eventType;
            return eventType === event;
        }))
            .subscribe(function (_a) {
            var args = _a.args;
            callback.apply(void 0, __spread(args));
        }));
    };
    /**
     * @return {?}
     */
    MockDrake.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
    /**
     * This is the most useful method. You can use it to manually fire events that would normally
     * be fired by a real drake.
     *
     * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
     * DragulaService uses to implement [dragulaModel].
     *
     * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
     *
     * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
     */
    /**
     * This is the most useful method. You can use it to manually fire events that would normally
     * be fired by a real drake.
     *
     * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
     * DragulaService uses to implement [dragulaModel].
     *
     * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
     *
     * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
     * @param {?} eventType
     * @param {...?} args
     * @return {?}
     */
    MockDrake.prototype.emit = /**
     * This is the most useful method. You can use it to manually fire events that would normally
     * be fired by a real drake.
     *
     * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
     * DragulaService uses to implement [dragulaModel].
     *
     * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
     *
     * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
     * @param {?} eventType
     * @param {...?} args
     * @return {?}
     */
    function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.emitter$.next({ eventType: eventType, args: args });
    };
    return MockDrake;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWRyYWd1bGEuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi1kcmFndWxhL0dyb3VwLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9FdmVudFR5cGVzLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9EcmFrZUZhY3RvcnkudHMiLCJuZzovL25nMi1kcmFndWxhL2NvbXBvbmVudHMvZHJhZ3VsYS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9jb21wb25lbnRzL2RyYWd1bGEuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9jb21wb25lbnRzL2RyYWd1bGEubW9kdWxlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9zcGVjL01vY2tEcmFrZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFrZVdpdGhNb2RlbHMgfSBmcm9tIFwiLi9EcmFrZVdpdGhNb2RlbHNcIjtcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSBcIi4vRHJhZ3VsYU9wdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcbiAgcHVibGljIGluaXRFdmVudHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgZHJha2U6IERyYWtlV2l0aE1vZGVscyxcbiAgICBwdWJsaWMgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnNcbiAgKSB7fVxufVxuIiwiZXhwb3J0IGVudW0gRXZlbnRUeXBlcyB7XG4gICAgQ2FuY2VsID0gXCJjYW5jZWxcIixcbiAgICBDbG9uZWQgPSBcImNsb25lZFwiLFxuICAgIERyYWcgPSBcImRyYWdcIixcbiAgICBEcmFnRW5kID0gXCJkcmFnZW5kXCIsXG4gICAgRHJvcCA9IFwiZHJvcFwiLFxuICAgIE91dCA9IFwib3V0XCIsXG4gICAgT3ZlciA9IFwib3ZlclwiLFxuICAgIFJlbW92ZSA9IFwicmVtb3ZlXCIsXG4gICAgU2hhZG93ID0gXCJzaGFkb3dcIixcbiAgICBEcm9wTW9kZWwgPSBcImRyb3BNb2RlbFwiLFxuICAgIFJlbW92ZU1vZGVsID0gXCJyZW1vdmVNb2RlbFwiLFxufVxuXG5leHBvcnQgY29uc3QgQWxsRXZlbnRzOiBFdmVudFR5cGVzW10gPSBPYmplY3Qua2V5cyhFdmVudFR5cGVzKS5tYXAoayA9PiBFdmVudFR5cGVzW2sgYXMgYW55XSBhcyBFdmVudFR5cGVzKTtcblxuXG4iLCJpbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4vRHJhZ3VsYU9wdGlvbnMnO1xuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi9EcmFrZVdpdGhNb2RlbHMnO1xuaW1wb3J0ICogYXMgZHJhZ3VsYUV4cHQgZnJvbSAnZHJhZ3VsYSc7XG5leHBvcnQgY29uc3QgZHJhZ3VsYTogKGNvbnRhaW5lcnM/OiBhbnksIG9wdGlvbnM/OiBhbnkpID0+IGFueSA9IChkcmFndWxhRXhwdCBhcyBhbnkpLmRlZmF1bHQgfHwgZHJhZ3VsYUV4cHQ7XG5cbmV4cG9ydCB0eXBlIERyYWtlQnVpbGRlciA9IChjb250YWluZXJzOiBhbnlbXSwgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnMpID0+IERyYWtlV2l0aE1vZGVscztcblxuZXhwb3J0IGNsYXNzIERyYWtlRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgYnVpbGQ6IERyYWtlQnVpbGRlciA9IGRyYWd1bGEpIHt9XG59XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4uL0RyYWtlV2l0aE1vZGVscyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwJztcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSAnLi4vRHJhZ3VsYU9wdGlvbnMnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFdmVudFR5cGVzLCBBbGxFdmVudHMgfSBmcm9tICcuLi9FdmVudFR5cGVzJztcbmltcG9ydCB7IERyYWtlRmFjdG9yeSB9IGZyb20gJy4uL0RyYWtlRmFjdG9yeSc7XG5cbnR5cGUgRmlsdGVyUHJvamVjdG9yPFQgZXh0ZW5kcyB7IG5hbWU6IHN0cmluZzsgfT4gPSAobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4gVDtcbnR5cGUgRGlzcGF0Y2ggPSB7IGV2ZW50OiBFdmVudFR5cGVzOyBuYW1lOiBzdHJpbmc7IGFyZ3M6IGFueVtdOyB9O1xuXG5jb25zdCBmaWx0ZXJFdmVudCA9IDxUIGV4dGVuZHMgeyBuYW1lOiBzdHJpbmc7IH0+KFxuICBldmVudFR5cGU6IEV2ZW50VHlwZXMsXG4gIGZpbHRlckRyYWdUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIHByb2plY3RvcjogRmlsdGVyUHJvamVjdG9yPFQ+XG4pID0+IChpbnB1dDogT2JzZXJ2YWJsZTxEaXNwYXRjaD4pOiBPYnNlcnZhYmxlPFQ+ID0+IHtcbiAgcmV0dXJuIGlucHV0LnBpcGUoXG4gICAgZmlsdGVyKCh7IGV2ZW50LCBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiBldmVudCA9PT0gZXZlbnRUeXBlXG4gICAgICAgICAgJiYgKGZpbHRlckRyYWdUeXBlID09PSB1bmRlZmluZWQgfHwgbmFtZSA9PT0gZmlsdGVyRHJhZ1R5cGUpO1xuICAgIH0pLFxuICAgIG1hcCgoeyBuYW1lLCBhcmdzIH0pID0+IHByb2plY3RvcihuYW1lLCBhcmdzKSlcbiAgKTtcbn1cblxuY29uc3QgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IgPVxuICAobmFtZTogc3RyaW5nLCBbZWwsIGNvbnRhaW5lciwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PlxuICAgICh7IG5hbWUsIGVsLCBjb250YWluZXIsIHNvdXJjZSB9KTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWd1bGFTZXJ2aWNlIHtcblxuICAvKiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyAqL1xuXG4gIHByaXZhdGUgZGlzcGF0Y2gkID0gbmV3IFN1YmplY3Q8RGlzcGF0Y2g+KCk7XG5cbiAgcHVibGljIGRyYWcgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxuICAgIGZpbHRlckV2ZW50KFxuICAgICAgRXZlbnRUeXBlcy5EcmFnLFxuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgKG5hbWUsIFtlbCwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnRdKSA9PiAoeyBuYW1lLCBlbCwgc291cmNlIH0pXG4gICAgKVxuICApO1xuXG4gIHB1YmxpYyBkcmFnZW5kID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuRHJhZ0VuZCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbZWxdOiBbRWxlbWVudF0pID0+ICh7IG5hbWUsIGVsIH0pXG4gICAgKVxuICApO1xuXG4gIHB1YmxpYyBkcm9wID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuRHJvcCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZ1xuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZyB9O1xuICAgICAgfSlcbiAgKTtcblxuICBwcml2YXRlIGVsQ29udGFpbmVyU291cmNlID1cbiAgICAoZXZlbnRUeXBlOiBFdmVudFR5cGVzKSA9PlxuICAgIChncm91cE5hbWU/OiBzdHJpbmcpID0+XG4gICAgdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICAgIGZpbHRlckV2ZW50KGV2ZW50VHlwZSwgZ3JvdXBOYW1lLCBlbENvbnRhaW5lclNvdXJjZVByb2plY3RvcilcbiAgICApO1xuXG4gIHB1YmxpYyBjYW5jZWwgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuQ2FuY2VsKTtcbiAgcHVibGljIHJlbW92ZSA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5SZW1vdmUpO1xuICBwdWJsaWMgc2hhZG93ID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLlNoYWRvdyk7XG4gIHB1YmxpYyBvdmVyID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLk92ZXIpO1xuICBwdWJsaWMgb3V0ID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLk91dCk7XG5cbiAgcHVibGljIGNsb25lZCA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXG4gICAgZmlsdGVyRXZlbnQoXG4gICAgICBFdmVudFR5cGVzLkNsb25lZCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbXG4gICAgICAgIGNsb25lLCBvcmlnaW5hbCwgY2xvbmVUeXBlXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgJ21pcnJvcicgfCAnY29weSddKSA9PiB7XG4gICAgICAgIHJldHVybiB7IG5hbWUsIGNsb25lLCBvcmlnaW5hbCwgY2xvbmVUeXBlIH1cbiAgICAgIH0pXG4gICk7XG5cbiAgcHVibGljIGRyb3BNb2RlbCA9IDxUID0gYW55Pihncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXG4gICAgZmlsdGVyRXZlbnQoXG4gICAgICBFdmVudFR5cGVzLkRyb3BNb2RlbCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgVCwgVFtdLCBUW11dKSA9PiB7XG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsIH1cbiAgICAgIH0pXG4gICk7XG5cbiAgcHVibGljIHJlbW92ZU1vZGVsID0gPFQgPSBhbnk+KGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXG4gICAgICBncm91cE5hbWUsXG4gICAgICAobmFtZSwgW1xuICAgICAgICBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgVCwgVFtdXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBuYW1lLCBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsIH1cbiAgICAgIH1cbiAgICApXG4gICk7XG5cbiAgcHJpdmF0ZSBncm91cHM6IHsgW2s6IHN0cmluZ106IEdyb3VwIH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvciAoQE9wdGlvbmFsKCkgcHJpdmF0ZSBkcmFrZUZhY3Rvcnk6IERyYWtlRmFjdG9yeSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5kcmFrZUZhY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJha2VGYWN0b3J5ID0gbmV3IERyYWtlRmFjdG9yeSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBQdWJsaWMgbWFpbmx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLiBQcmVmZXIgYGNyZWF0ZUdyb3VwKClgLiAqL1xuICBwdWJsaWMgYWRkKGdyb3VwOiBHcm91cCk6IEdyb3VwIHtcbiAgICBsZXQgZXhpc3RpbmdHcm91cCA9IHRoaXMuZmluZChncm91cC5uYW1lKTtcbiAgICBpZiAoZXhpc3RpbmdHcm91cCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBuYW1lZDogXCInICsgZ3JvdXAubmFtZSArICdcIiBhbHJlYWR5IGV4aXN0cy4nKTtcbiAgICB9XG4gICAgdGhpcy5ncm91cHNbZ3JvdXAubmFtZV0gPSBncm91cDtcbiAgICB0aGlzLmhhbmRsZU1vZGVscyhncm91cCk7XG4gICAgdGhpcy5zZXR1cEV2ZW50cyhncm91cCk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgcHVibGljIGZpbmQobmFtZTogc3RyaW5nKTogR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmdyb3Vwc1tuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBncm91cCA9IHRoaXMuZmluZChuYW1lKTtcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGdyb3VwLmRyYWtlICYmIGdyb3VwLmRyYWtlLmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5ncm91cHNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdyb3VwIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBOb3RlOiBmb3JtZXJseSBrbm93biBhcyBgc2V0T3B0aW9uc2BcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVHcm91cDxUID0gYW55PihuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IERyYWd1bGFPcHRpb25zPFQ+KTogR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmFkZChuZXcgR3JvdXAoXG4gICAgICBuYW1lLFxuICAgICAgdGhpcy5kcmFrZUZhY3RvcnkuYnVpbGQoW10sIG9wdGlvbnMpLFxuICAgICAgb3B0aW9uc1xuICAgICkpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVNb2RlbHMoeyBuYW1lLCBkcmFrZSwgb3B0aW9ucyB9OiBHcm91cCk6IHZvaWQge1xuICAgIGxldCBkcmFnRWxtOiBhbnk7XG4gICAgbGV0IGRyYWdJbmRleDogbnVtYmVyO1xuICAgIGxldCBkcm9wSW5kZXg6IG51bWJlcjtcbiAgICBkcmFrZS5vbigncmVtb3ZlJywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcbiAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMCk7IC8vIGNsb25lIGl0XG4gICAgICBjb25zdCBpdGVtID0gc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSlbMF07XG4gICAgICAvLyBjb25zb2xlLmxvZygnUkVNT1ZFJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzb3VyY2VNb2RlbCk7XG4gICAgICB0aGlzLmRpc3BhdGNoJC5uZXh0KHtcbiAgICAgICAgZXZlbnQ6IEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFyZ3M6IFsgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCBdXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZHJhZ0VsbSA9IGVsO1xuICAgICAgZHJhZ0luZGV4ID0gdGhpcy5kb21JbmRleE9mKGVsLCBzb3VyY2UpO1xuICAgIH0pO1xuICAgIGRyYWtlLm9uKCdkcm9wJywgKGRyb3BFbG06IGFueSwgdGFyZ2V0OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQsIHNpYmxpbmc/OiBFbGVtZW50KSA9PiB7XG4gICAgICBpZiAoIWRyYWtlLm1vZGVscyB8fCAhdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRyb3BJbmRleCA9IHRoaXMuZG9tSW5kZXhPZihkcm9wRWxtLCB0YXJnZXQpO1xuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcbiAgICAgIGxldCB0YXJnZXRNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2YodGFyZ2V0KV07XG4gICAgICAvLyBjb25zb2xlLmxvZygnRFJPUCcpO1xuICAgICAgLy8gY29uc29sZS5sb2coc291cmNlTW9kZWwpO1xuICAgICAgbGV0IGl0ZW06IGFueTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHNvdXJjZSkge1xuICAgICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApXG4gICAgICAgIGl0ZW0gPSBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKVswXTtcbiAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIC8vIHRoaXMgd2FzIHRydWUgYmVmb3JlIHdlIGNsb25lZCBhbmQgdXBkYXRlZCBzb3VyY2VNb2RlbCxcbiAgICAgICAgLy8gYnV0IHRhcmdldE1vZGVsIHN0aWxsIGhhcyB0aGUgb2xkIHZhbHVlXG4gICAgICAgIHRhcmdldE1vZGVsID0gc291cmNlTW9kZWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaXNDb3B5aW5nID0gZHJhZ0VsbSAhPT0gZHJvcEVsbTtcbiAgICAgICAgaXRlbSA9IHNvdXJjZU1vZGVsW2RyYWdJbmRleF07XG4gICAgICAgIGlmIChpc0NvcHlpbmcpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMuY29weUl0ZW0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklmIHlvdSBoYXZlIGVuYWJsZWQgYGNvcHlgIG9uIGEgZ3JvdXAsIHlvdSBtdXN0IHByb3ZpZGUgYSBgY29weUl0ZW1gIGZ1bmN0aW9uLlwiKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtID0gb3B0aW9ucy5jb3B5SXRlbShpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNDb3B5aW5nKSB7XG4gICAgICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKVxuICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldE1vZGVsID0gdGFyZ2V0TW9kZWwuc2xpY2UoMClcbiAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIGlmIChpc0NvcHlpbmcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKGRyb3BFbG0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoe1xuICAgICAgICBldmVudDogRXZlbnRUeXBlcy5Ecm9wTW9kZWwsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFyZ3M6IFsgZHJvcEVsbSwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCBdXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBFdmVudHMoZ3JvdXA6IEdyb3VwKTogdm9pZCB7XG4gICAgaWYgKGdyb3VwLmluaXRFdmVudHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ3JvdXAuaW5pdEV2ZW50cyA9IHRydWU7XG4gICAgY29uc3QgbmFtZSA9IGdyb3VwLm5hbWU7XG4gICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XG4gICAgbGV0IGVtaXR0ZXIgPSAoZXZlbnQ6IEV2ZW50VHlwZXMpID0+IHtcbiAgICAgIGdyb3VwLmRyYWtlLm9uKGV2ZW50LCAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7IGV2ZW50LCBuYW1lLCBhcmdzIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBBbGxFdmVudHMuZm9yRWFjaChlbWl0dGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgZG9tSW5kZXhPZihjaGlsZDogYW55LCBwYXJlbnQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkcmVuLCBjaGlsZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnLi9kcmFndWxhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi4vRHJha2VXaXRoTW9kZWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cCc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2RyYWd1bGFdJ30pXG5leHBvcnQgY2xhc3MgRHJhZ3VsYURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIGRyYWd1bGE6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbDogYW55W107XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJhZ3VsYU1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuICBwcml2YXRlIGdyb3VwOiBHcm91cDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkcmFndWxhU2VydmljZTogRHJhZ3VsYVNlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7ZHJhZ3VsYT86IFNpbXBsZUNoYW5nZSwgZHJhZ3VsYU1vZGVsPzogU2ltcGxlQ2hhbmdlfSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYSkge1xuICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2LCBjdXJyZW50VmFsdWU6IGN1cnJlbnQsIGZpcnN0Q2hhbmdlIH0gPSBjaGFuZ2VzLmRyYWd1bGE7XG4gICAgICBsZXQgaGFkUHJldmlvdXNWYWx1ZSA9ICEhcHJldjtcbiAgICAgIGxldCBoYXNOZXdWYWx1ZSA9ICEhY3VycmVudDtcbiAgICAgIC8vIHNvbWV0aGluZyAtPiBudWxsICAgICAgID0+ICB0ZWFyZG93biBvbmx5XG4gICAgICAvLyBzb21ldGhpbmcgLT4gc29tZXRoaW5nICA9PiAgdGVhcmRvd24sIHRoZW4gc2V0dXBcbiAgICAgIC8vICAgICAgbnVsbCAtPiBzb21ldGhpbmcgID0+ICBzZXR1cCBvbmx5XG4gICAgICAvL1xuICAgICAgLy8gICAgICBudWxsIC0+IG51bGwgKHByZWNsdWRlZCBieSBmYWN0IG9mIGNoYW5nZSBiZWluZyBwcmVzZW50KVxuICAgICAgaWYgKGhhZFByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgdGhpcy50ZWFyZG93bihwcmV2KTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNOZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYU1vZGVsKSB7XG4gICAgICAvLyB0aGlzIGNvZGUgb25seSBydW5zIHdoZW4geW91J3JlIG5vdCBjaGFuZ2luZyB0aGUgZ3JvdXAgbmFtZVxuICAgICAgLy8gYmVjYXVzZSBpZiB5b3UncmUgY2hhbmdpbmcgdGhlIGdyb3VwIG5hbWUsIHlvdSdsbCBiZSBkb2luZyBzZXR1cCBvciB0ZWFyZG93blxuICAgICAgLy8gaXQgYWxzbyBvbmx5IHJ1bnMgaWYgdGhlcmUgaXMgYSBncm91cCBuYW1lIHRvIGF0dGFjaCB0by5cbiAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldiwgY3VycmVudFZhbHVlOiBjdXJyZW50LCBmaXJzdENoYW5nZSB9ID0gY2hhbmdlcy5kcmFndWxhTW9kZWw7XG4gICAgICBjb25zdCB7IGRyYWtlIH0gPSB0aGlzLmdyb3VwO1xuICAgICAgaWYgKHRoaXMuZHJhZ3VsYSAmJiBkcmFrZSkge1xuICAgICAgICBkcmFrZS5tb2RlbHMgPSBkcmFrZS5tb2RlbHMgfHwgW107XG4gICAgICAgIGxldCBwcmV2SW5kZXggPSBkcmFrZS5tb2RlbHMuaW5kZXhPZihwcmV2KTtcbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBkZWxldGUgdGhlIHByZXZpb3VzXG4gICAgICAgICAgZHJha2UubW9kZWxzLnNwbGljZShwcmV2SW5kZXgsIDEpO1xuICAgICAgICAgIC8vIG1heWJlIGluc2VydCBhIG5ldyBvbmUgYXQgdGhlIHNhbWUgc3BvdFxuICAgICAgICAgIGlmICghIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIGRyYWtlLm1vZGVscy5zcGxpY2UocHJldkluZGV4LCAwLCBjdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoISFjdXJyZW50KSB7XG4gICAgICAgICAgLy8gbm8gcHJldmlvdXMgb25lIHRvIHJlbW92ZTsganVzdCBwdXNoIHRoaXMgb25lLlxuICAgICAgICAgIGRyYWtlLm1vZGVscy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gY2FsbCBuZ09uSW5pdCAnc2V0dXAnIGJlY2F1c2Ugd2Ugd2FudCB0byBjYWxsIGl0IGluIG5nT25DaGFuZ2VzXG4gIC8vIGFuZCBpdCB3b3VsZCBvdGhlcndpc2UgcnVuIHR3aWNlXG4gIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICBsZXQgY2hlY2tNb2RlbCA9IChncm91cDogR3JvdXApID0+IHtcbiAgICAgIGlmICh0aGlzLmRyYWd1bGFNb2RlbCkge1xuICAgICAgICBpZiAoZ3JvdXAuZHJha2UubW9kZWxzKSB7XG4gICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzLnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyb3VwLmRyYWtlLm1vZGVscyA9IFt0aGlzLmRyYWd1bGFNb2RlbF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZmluZCBvciBjcmVhdGUgYSBncm91cFxuICAgIGxldCBncm91cCA9IHRoaXMuZHJhZ3VsYVNlcnZpY2UuZmluZCh0aGlzLmRyYWd1bGEpO1xuICAgIGlmICghZ3JvdXApIHtcbiAgICAgIGxldCBvcHRpb25zID0ge307XG4gICAgICBncm91cCA9IHRoaXMuZHJhZ3VsYVNlcnZpY2UuY3JlYXRlR3JvdXAodGhpcy5kcmFndWxhLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgbW9kZWwgYW5kIGNvbnRhaW5lciBlbGVtZW50IGFyZSBwdXNoZWRcbiAgICBjaGVja01vZGVsKGdyb3VwKTtcbiAgICBncm91cC5kcmFrZS5jb250YWluZXJzLnB1c2godGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuc3Vic2NyaWJlKHRoaXMuZHJhZ3VsYSk7XG5cbiAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc3VicyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnMuYWRkKFxuICAgICAgdGhpcy5kcmFndWxhU2VydmljZVxuICAgICAgLmRyb3BNb2RlbChuYW1lKVxuICAgICAgLnN1YnNjcmliZSgoeyBzb3VyY2UsIHRhcmdldCwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsIH0pID0+IHtcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdChzb3VyY2VNb2RlbCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmRyYWd1bGFNb2RlbENoYW5nZS5lbWl0KHRhcmdldE1vZGVsKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vicy5hZGQoXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlXG4gICAgICAucmVtb3ZlTW9kZWwobmFtZSlcbiAgICAgIC5zdWJzY3JpYmUoKHsgc291cmNlLCBzb3VyY2VNb2RlbCB9KSA9PiB7XG4gICAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQoc291cmNlTW9kZWwpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgdGVhcmRvd24oZ3JvdXBOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQoZ3JvdXBOYW1lKTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGNvbnN0IGl0ZW1Ub1JlbW92ZSA9IGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGl0ZW1Ub1JlbW92ZSAhPT0gLTEpIHtcbiAgICAgICAgZ3JvdXAuZHJha2UuY29udGFpbmVycy5zcGxpY2UoaXRlbVRvUmVtb3ZlLCAxKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRyYWd1bGFNb2RlbCAmJiBncm91cC5kcmFrZSAmJiBncm91cC5kcmFrZS5tb2RlbHMpIHtcbiAgICAgICAgbGV0IG1vZGVsSW5kZXggPSBncm91cC5kcmFrZS5tb2RlbHMuaW5kZXhPZih0aGlzLmRyYWd1bGFNb2RlbCk7XG4gICAgICAgIGlmIChtb2RlbEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGdyb3VwLmRyYWtlLm1vZGVscy5zcGxpY2UobW9kZWxJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy50ZWFyZG93bih0aGlzLmRyYWd1bGEpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFndWxhRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFndWxhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFndWxhU2VydmljZSB9IGZyb20gJy4vZHJhZ3VsYS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0RyYWd1bGFEaXJlY3RpdmVdLFxuICBkZWNsYXJhdGlvbnM6IFtEcmFndWxhRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ3VsYU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRHJhZ3VsYU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0RyYWd1bGFTZXJ2aWNlXVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi4vRHJha2VXaXRoTW9kZWxzJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXZlbnRUeXBlcyB9IGZyb20gJy4uL0V2ZW50VHlwZXMnO1xuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuLi9EcmFndWxhT3B0aW9ucyc7XG5pbXBvcnQgeyBEcmFrZUZhY3RvcnkgfSBmcm9tICcuLi9EcmFrZUZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgTW9ja0RyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKGNvbnRhaW5lcnMsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIG5ldyBNb2NrRHJha2UoY29udGFpbmVycywgb3B0aW9ucyk7XG59KTtcblxuLyoqIFlvdSBjYW4gdXNlIE1vY2tEcmFrZSB0byBzaW11bGF0ZSBEcmFrZSBldmVudHMuXG4gKlxuICogVGhlIHRocmVlIG1ldGhvZHMgdGhhdCBhY3R1YWxseSBkbyBhbnl0aGluZyBhcmUgYG9uKGV2ZW50LCBsaXN0ZW5lcilgLFxuICogYGRlc3Ryb3koKWAsIGFuZCBhIG5ldyBtZXRob2QsIGBlbWl0KClgLiBVc2UgYGVtaXQoKWAgdG8gbWFudWFsbHkgZW1pdCBEcmFrZVxuICogZXZlbnRzLCBhbmQgaWYgeW91IGluamVjdGVkIE1vY2tEcmFrZSBwcm9wZXJseSB3aXRoIE1vY2tEcmFrZUZhY3Rvcnkgb3JcbiAqIG1vY2tlZCB0aGUgRHJhZ3VsYVNlcnZpY2UuZmluZCgpIG1ldGhvZCwgdGhlbiB5b3UgY2FuIG1ha2UgbmcyLWRyYWd1bGEgdGhpbmtcbiAqIGRyYWdzIGFuZCBkcm9wcyBhcmUgaGFwcGVuaW5nLlxuICpcbiAqIENhdmVhdHM6XG4gKlxuICogMS4gWU9VIE1VU1QgTUFLRSBUSEUgRE9NIENIQU5HRVMgWU9VUlNFTEYuXG4gKiAyLiBSRVBFQVQ6IFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxuICogICAgVGhhdCBtZWFucyBgc291cmNlLnJlbW92ZUNoaWxkKGVsKWAsIGFuZCBgdGFyZ2V0Lmluc2VydEJlZm9yZShlbClgLlxuICogMy4gTm9uZSBvZiB0aGUgb3RoZXIgbWV0aG9kcyBkbyBhbnl0aGluZy5cbiAqICAgIFRoYXQncyBvaywgYmVjYXVzZSBuZzItZHJhZ3VsYSBkb2Vzbid0IHVzZSB0aGVtLlxuICovXG5leHBvcnQgY2xhc3MgTW9ja0RyYWtlIGltcGxlbWVudHMgRHJha2VXaXRoTW9kZWxzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSBjb250YWluZXJzIEEgbGlzdCBvZiBjb250YWluZXIgZWxlbWVudHMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZXNlIHdpbGwgTk9UIGJlIHVzZWQuIEF0IGFsbC5cbiAgICogQHBhcmFtIG1vZGVscyBOb25zdGFuZGFyZCwgYnV0IHVzZWZ1bCBmb3IgdGVzdGluZyB1c2luZyBgbmV3IE1vY2tEcmFrZSgpYCBkaXJlY3RseS5cbiAgICogICAgICAgICAgICAgICBOb3RlLCBkZWZhdWx0IHZhbHVlIGlzIHVuZGVmaW5lZCwgbGlrZSBhIHJlYWwgRHJha2UuIERvbid0IGNoYW5nZSB0aGF0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbnRhaW5lcnM6IEVsZW1lbnRbXSA9IFtdLFxuICAgIHB1YmxpYyBvcHRpb25zOiBEcmFndWxhT3B0aW9ucyA9IHt9LFxuICAgIHB1YmxpYyBtb2RlbHM/OiBhbnlbXVtdXG4gICkge31cblxuICAvKiBEb2Vzbid0IHJlcHJlc2VudCBhbnl0aGluZyBtZWFuaW5nZnVsLiAqL1xuICBkcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXG4gIHN0YXJ0KGl0ZW06IEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgfVxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICBlbmQoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICB9XG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXG4gIGNhbmNlbChyZXZlcnQ6IGJvb2xlYW4pOiB2b2lkO1xuICBjYW5jZWwoKTogdm9pZDtcbiAgY2FuY2VsKHJldmVydD86IGFueSkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICByZW1vdmUoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQmFzaWMgYnV0IGZ1bGx5IGZ1bmN0aW9uYWwgZXZlbnQgZW1pdHRlciBzaGltXG4gIHByaXZhdGUgZW1pdHRlciQgPSBuZXcgU3ViamVjdDx7IGV2ZW50VHlwZTogRXZlbnRUeXBlcywgYXJnczogYW55W10gfT4oKTtcblxuICBwcml2YXRlIHN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzLmFkZCh0aGlzLmVtaXR0ZXIkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IGV2ZW50VHlwZSB9KSA9PiBldmVudFR5cGUgPT09IGV2ZW50KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBhcmdzIH0pID0+IHtcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncyk7XG4gICAgICB9KSk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIG1vc3QgdXNlZnVsIG1ldGhvZC4gWW91IGNhbiB1c2UgaXQgdG8gbWFudWFsbHkgZmlyZSBldmVudHMgdGhhdCB3b3VsZCBub3JtYWxseVxuICAgKiBiZSBmaXJlZCBieSBhIHJlYWwgZHJha2UuXG4gICAqXG4gICAqIFlvdSdyZSBsaWtlbHkgbW9zdCBpbnRlcmVzdGVkIGluIGZpcmluZyBgZHJhZ2AsIGByZW1vdmVgIGFuZCBgZHJvcGAsIHRoZSB0aHJlZSBldmVudHNcbiAgICogRHJhZ3VsYVNlcnZpY2UgdXNlcyB0byBpbXBsZW1lbnQgW2RyYWd1bGFNb2RlbF0uXG4gICAqXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyBmb3Igd2hhdCB5b3Ugc2hvdWxkIGVtaXQgKGFuZCBpbiB3aGF0IG9yZGVyKS5cbiAgICpcbiAgICogKE5vdGUgYWxzbywgZmlyaW5nIGRyb3BNb2RlbCBhbmQgcmVtb3ZlTW9kZWwgd29uJ3Qgd29yay4gWW91IHdvdWxkIGhhdmUgdG8gbW9jayBEcmFndWxhU2VydmljZSBmb3IgdGhhdC4pXG4gICAqL1xuICBlbWl0KGV2ZW50VHlwZTogRXZlbnRUeXBlcywgLi4uYXJnczogYW55W10pIHtcbiAgICB0aGlzLmVtaXR0ZXIkLm5leHQoeyBldmVudFR5cGUsIGFyZ3MgfSlcbiAgfVxuXG59XG4iXSwibmFtZXMiOlsiKC8qKiBAdHlwZSB7P30gKi8gKGRyYWd1bGFFeHB0KSkuZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxJQUFBO0lBRUUsZUFDUyxNQUNBLE9BQ0E7UUFGQSxTQUFJLEdBQUosSUFBSTtRQUNKLFVBQUssR0FBTCxLQUFLO1FBQ0wsWUFBTyxHQUFQLE9BQU87MEJBSmEsS0FBSztLQUs5QjtnQkFUTjtJQVVDOzs7Ozs7OztJQ1RHLFFBQVMsUUFBUTtJQUNqQixRQUFTLFFBQVE7SUFDakIsTUFBTyxNQUFNO0lBQ2IsU0FBVSxTQUFTO0lBQ25CLE1BQU8sTUFBTTtJQUNiLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTtJQUNiLFFBQVMsUUFBUTtJQUNqQixRQUFTLFFBQVE7SUFDakIsV0FBWSxXQUFXO0lBQ3ZCLGFBQWMsYUFBYTs7O0FBRy9CLElBQWEsU0FBUyxHQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsWUFBSSxVQUFVLG1CQUFDLENBQVEsRUFBZSxJQUFBLENBQUMsQ0FBQzs7Ozs7O0FDWjVHO0FBQ0EsSUFBYSxPQUFPLEdBQTZDQSxvQkFBNEIsSUFBSSxXQUFXLENBQUM7SUFJN0c7SUFDRSxzQkFBb0IsS0FBNkI7K0NBQUE7UUFBN0IsVUFBSyxHQUFMLEtBQUssQ0FBd0I7S0FBSTt1QkFSdkQ7SUFTQzs7Ozs7OztBQ0dELElBQU0sV0FBVyxHQUFHLFVBQ2xCLFNBQXFCLEVBQ3JCLGNBQWtDLEVBQ2xDLFNBQTZCLElBQzFCLE9BQUEsVUFBQyxLQUEyQjtJQUMvQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQ2YsTUFBTSxDQUFDLFVBQUMsRUFBZTtZQUFiLGdCQUFLLEVBQUUsY0FBSTtRQUNuQixPQUFPLEtBQUssS0FBSyxTQUFTO2dCQUNsQixjQUFjLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztLQUNsRSxDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQUMsRUFBYztZQUFaLGNBQUksRUFBRSxjQUFJO1FBQU8sT0FBQSxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztLQUFBLENBQUMsQ0FDL0MsQ0FBQztDQUNILEdBQUEsQ0FBQTs7QUFFRCxJQUFNLDBCQUEwQixHQUM5QixVQUFDLElBQVksRUFBRSxFQUFvRDtRQUFwRCxrQkFBb0QsRUFBbkQsVUFBRSxFQUFFLGlCQUFTLEVBQUUsY0FBTTtJQUNuQyxRQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUU7Q0FBQyxDQUFDOztJQXFGcEMsd0JBQWlDLFlBQWlDOzBEQUFBO1FBQWxFLGlCQUlDO1FBSmdDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjt5QkE5RTlDLElBQUksT0FBTyxFQUFZO29CQUU3QixVQUFDLFNBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDdkQsV0FBVyxDQUNULFVBQVUsQ0FBQyxJQUFJLEVBQ2YsU0FBUyxFQUNULFVBQUMsSUFBSSxFQUFFLEVBQWdDO2dCQUFoQyxrQkFBZ0MsRUFBL0IsVUFBRSxFQUFFLGNBQU07WUFBMEIsUUFBQyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsSUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFO1NBQUMsQ0FDbkUsQ0FDRixHQUFBO3VCQUVnQixVQUFDLFNBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDMUQsV0FBVyxDQUNULFVBQVUsQ0FBQyxPQUFPLEVBQ2xCLFNBQVMsRUFDVCxVQUFDLElBQUksRUFBRSxFQUFlO2dCQUFmLGtCQUFlLEVBQWQsVUFBRTtZQUFpQixRQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUU7U0FBQyxDQUMxQyxDQUNGLEdBQUE7b0JBRWEsVUFBQyxTQUFrQixJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ3ZELFdBQVcsQ0FDVCxVQUFVLENBQUMsSUFBSSxFQUNmLFNBQVMsRUFDVCxVQUFDLElBQUksRUFBRSxFQUVnQztnQkFGaEMsa0JBRWdDLEVBRHJDLFVBQUUsRUFBRSxjQUFNLEVBQUUsY0FBTSxFQUFFLGVBQU87WUFFM0IsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsSUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUM7U0FDOUMsQ0FBQyxDQUNMLEdBQUE7aUNBR0MsVUFBQyxTQUFxQjtZQUN0QixPQUFBLFVBQUMsU0FBa0I7Z0JBQ25CLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLFdBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQzlEO2FBQUE7U0FBQTtzQkFFYSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztzQkFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7c0JBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO29CQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzttQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7c0JBRW5DLFVBQUMsU0FBa0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN6RCxXQUFXLENBQ1QsVUFBVSxDQUFDLE1BQU0sRUFDakIsU0FBUyxFQUNULFVBQUMsSUFBSSxFQUFFLEVBRWlDO2dCQUZqQyxrQkFFaUMsRUFEdEMsYUFBSyxFQUFFLGdCQUFRLEVBQUUsaUJBQVM7WUFFMUIsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUE7U0FDNUMsQ0FBQyxDQUNMLEdBQUE7eUJBRWtCLFVBQVUsU0FBa0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNyRSxXQUFXLENBQ1QsVUFBVSxDQUFDLFNBQVMsRUFDcEIsU0FBUyxFQUNULFVBQUMsSUFBSSxFQUFFLEVBRTZDO2dCQUY3QyxrQkFFNkMsRUFEbEQsVUFBRSxFQUFFLGNBQU0sRUFBRSxjQUFNLEVBQUUsZUFBTyxFQUFFLFlBQUksRUFBRSxtQkFBVyxFQUFFLG1CQUFXO1lBRTNELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLElBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFBO1NBQzdFLENBQUMsQ0FDTCxHQUFBOzJCQUVvQixVQUFVLFNBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDdkUsV0FBVyxDQUNULFVBQVUsQ0FBQyxXQUFXLEVBQ3RCLFNBQVMsRUFDVCxVQUFDLElBQUksRUFBRSxFQUUrQjtnQkFGL0Isa0JBRStCLEVBRHBDLFVBQUUsRUFBRSxpQkFBUyxFQUFFLGNBQU0sRUFBRSxZQUFJLEVBQUUsbUJBQVc7WUFFeEMsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsSUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUE7U0FDMUQsQ0FDRixDQUNGLEdBQUE7c0JBRXdDLEVBQUU7UUFHekMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7U0FDeEM7S0FDRjs7Ozs7O0lBR00sNEJBQUc7Ozs7O2NBQUMsS0FBWTs7UUFDckIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxhQUFhLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sS0FBSyxDQUFDOzs7Ozs7SUFHUiw2QkFBSTs7OztjQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFHcEIsZ0NBQU87Ozs7Y0FBQyxJQUFZOztRQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPO1NBQ1I7UUFDRCxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVFwQixvQ0FBVzs7Ozs7Ozs7O2NBQVUsSUFBWSxFQUFFLE9BQTBCO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FDdkIsSUFBSSxFQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFDcEMsT0FBTyxDQUNSLENBQUMsQ0FBQzs7Ozs7O0lBR0cscUNBQVk7Ozs7Y0FBQyxFQUErQjs7WUFBN0IsY0FBSSxFQUFFLGdCQUFLLEVBQUUsb0JBQU87O1FBQ3pDLElBQUksT0FBTyxDQUFNOztRQUNqQixJQUFJLFNBQVMsQ0FBUzs7UUFDdEIsSUFBSSxTQUFTLENBQVM7UUFDdEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxFQUFPLEVBQUUsU0FBYyxFQUFFLE1BQVc7WUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjs7WUFDRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakUsV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ25DLElBQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztZQUdqRCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDbEIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxXQUFXO2dCQUM3QixJQUFJLE1BQUE7Z0JBQ0osSUFBSSxFQUFFLENBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBRTthQUNuRCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQU8sRUFBRSxNQUFXO1lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsU0FBUyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsT0FBWSxFQUFFLE1BQWUsRUFBRSxNQUFlLEVBQUUsT0FBaUI7WUFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzVCLE9BQU87YUFDUjtZQUNELFNBQVMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7WUFDN0MsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztZQUNqRSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBR2pFLElBQUksSUFBSSxDQUFNO1lBQ2QsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO2dCQUNyQixXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7OztnQkFHdkMsV0FBVyxHQUFHLFdBQVcsQ0FBQzthQUMzQjtpQkFBTTs7Z0JBQ0wsSUFBSSxTQUFTLEdBQUcsT0FBTyxLQUFLLE9BQU8sQ0FBQztnQkFDcEMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7d0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQTtxQkFDbEc7b0JBQ0QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2dCQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2xDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsQztnQkFDRCxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDbEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFNBQVMsRUFBRTtvQkFDYixJQUFJO3dCQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQzdCO29CQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7aUJBQ2Y7YUFDRjtZQUNELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNsQixLQUFLLEVBQUUsVUFBVSxDQUFDLFNBQVM7Z0JBQzNCLElBQUksTUFBQTtnQkFDSixJQUFJLEVBQUUsQ0FBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUU7YUFDM0UsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7SUFHRyxvQ0FBVzs7OztjQUFDLEtBQVk7O1FBQzlCLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFDRCxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7UUFDeEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs7UUFFeEIsSUFBSSxPQUFPLEdBQUcsVUFBQyxLQUFpQjtZQUM5QixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQUMsY0FBYztxQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO29CQUFkLHlCQUFjOztnQkFDbkMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFHckIsbUNBQVU7Ozs7O2NBQUMsS0FBVSxFQUFFLE1BQVc7UUFDeEMsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7O2dCQXhOL0QsVUFBVTs7OztnQkF2QkYsWUFBWSx1QkEwR0wsUUFBUTs7eUJBakh4Qjs7Ozs7OztBQ0FBOzhCQW1CNkIsRUFBYyxFQUFVLGNBQThCO1FBQXRELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7a0NBVDNDLElBQUksWUFBWSxFQUFTOzswQkFJbkQsdUNBQVM7Ozs7O1lBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7O0lBT25DLHNDQUFXOzs7O2NBQUMsT0FBOEQ7UUFDL0UsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM5QiwwQkFBUSx1QkFBbUIsRUFBRSx5QkFBcUIsRUFBRSw0QkFBVyxDQUFxQjs7WUFDcEYsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDOztZQUM5QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDOzs7Ozs7WUFNNUIsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjtZQUNELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1NBQ0Y7YUFBTSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBSTFDLCtCQUFRLHVCQUFtQixFQUFFLHlCQUFxQixFQUFFLDRCQUFXLENBQTBCO1lBQ2pGLElBQUEsd0JBQUssQ0FBZ0I7WUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBRTtnQkFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQzs7Z0JBQ2xDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTs7b0JBRXBCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7b0JBRWxDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTt3QkFDYixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QztpQkFDRjtxQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7O29CQUVwQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtTQUNGOzs7OztJQUtJLGdDQUFLOzs7Ozs7UUFDVixJQUFJLFVBQVUsR0FBRyxVQUFDLEtBQVk7WUFDNUIsSUFBSSxLQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDTCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDMUM7YUFDRjtTQUNGLENBQUM7O1FBR0YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7O1lBQ1YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2hFOztRQUdELFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFHZCxvQ0FBUzs7OztjQUFDLElBQVk7O1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDWCxJQUFJLENBQUMsY0FBYzthQUNsQixTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ2YsU0FBUyxDQUFDLFVBQUMsRUFBNEM7Z0JBQTFDLGtCQUFNLEVBQUUsa0JBQU0sRUFBRSw0QkFBVyxFQUFFLDRCQUFXO1lBQ3BELElBQUksTUFBTSxLQUFLLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO2dCQUNwQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzNDO2lCQUFNLElBQUksTUFBTSxLQUFLLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO2dCQUMzQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzNDO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDWCxJQUFJLENBQUMsY0FBYzthQUNsQixXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxVQUFDLEVBQXVCO2dCQUFyQixrQkFBTSxFQUFFLDRCQUFXO1lBQy9CLElBQUksTUFBTSxLQUFLLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO2dCQUNwQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzNDO1NBQ0YsQ0FBQyxDQUNILENBQUM7Ozs7OztJQUdHLG1DQUFROzs7O2NBQUMsU0FBaUI7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN6Qjs7UUFDRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLEtBQUssRUFBRTs7WUFDVCxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoRDtZQUNELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFOztnQkFDMUQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO2FBQ0Y7U0FDRjs7Ozs7SUFHSSxzQ0FBVzs7OztRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O2dCQWhJL0IsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQzs7OztnQkFOQyxVQUFVO2dCQUNwQyxjQUFjOzs7MEJBT3BCLEtBQUs7K0JBQ0wsS0FBSztxQ0FDTCxNQUFNOzsyQkFWVDs7Ozs7OztBQ0FBOzs7Ozs7SUFTUyxxQkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzVCLENBQUE7S0FDRjs7Z0JBVkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDakM7O3dCQVBEOzs7Ozs7OztBQ09BLElBQWEsZ0JBQWdCLEdBQUcsSUFBSSxZQUFZLENBQUMsVUFBQyxVQUFVLEVBQUUsT0FBTztJQUNuRSxPQUFPLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUMzQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCSDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQU9FLG1CQUNTLFlBQ0EsU0FDQTs7O1FBRkEsZUFBVSxHQUFWLFVBQVU7UUFDVixZQUFPLEdBQVAsT0FBTztRQUNQLFdBQU0sR0FBTixNQUFNOzt3QkFJSyxLQUFLO3dCQXNCTixJQUFJLE9BQU8sRUFBMEM7b0JBRXpELElBQUksWUFBWSxFQUFFO0tBM0I3Qjs7Ozs7O0lBTUoseUJBQUs7Ozs7SUFBTCxVQUFNLElBQWE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDdEI7Ozs7O0lBRUQsdUJBQUc7OztJQUFIO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7O0lBSUQsMEJBQU07Ozs7SUFBTixVQUFPLE1BQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7O0lBRUQsMEJBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7OztJQU9ELHNCQUFFOzs7OztJQUFGLFVBQUcsS0FBYSxFQUFFLFFBQWtCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3hCLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxFQUFhO2dCQUFYLHdCQUFTO1lBQU8sT0FBQSxTQUFTLEtBQUssS0FBSztTQUFBLENBQUMsQ0FDL0M7YUFDQSxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFOLGNBQUk7WUFDaEIsUUFBUSx3QkFBSSxJQUFJLEdBQUU7U0FDbkIsQ0FBQyxDQUFDLENBQUM7S0FDUDs7OztJQUVELDJCQUFPOzs7SUFBUDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUQsd0JBQUk7Ozs7Ozs7Ozs7Ozs7O0lBQUosVUFBSyxTQUFxQjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFBO0tBQ3hDO29CQTlGSDtJQWdHQzs7Ozs7Ozs7Ozs7Ozs7In0=

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/ticky/ticky-browser.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/body/body-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableBodyCellComponent = /** @class */ (function () {
    function DataTableBodyCellComponent(element, cd) {
        this.cd = cd;
        this.activate = new core_1.EventEmitter();
        this.treeAction = new core_1.EventEmitter();
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.cellContext = {
            onCheckboxChangeFn: this.onCheckboxChangeFn,
            activateFn: this.activateFn,
            row: this.row,
            group: this.group,
            value: this.value,
            column: this.column,
            rowHeight: this.rowHeight,
            isSelected: this.isSelected,
            rowIndex: this.rowIndex,
            treeStatus: this.treeStatus,
            onTreeAction: this.onTreeAction.bind(this),
        };
        this._element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (group) {
            this._group = group;
            this.cellContext.group = group;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowHeight", {
        get: function () {
            return this._rowHeight;
        },
        set: function (val) {
            this._rowHeight = val;
            this.cellContext.rowHeight = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (val) {
            this._isSelected = val;
            this.cellContext.isSelected = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (val) {
            this._expanded = val;
            this.cellContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (val) {
            this._rowIndex = val;
            this.cellContext.rowIndex = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (row) {
            this._row = row;
            this.cellContext.row = row;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.calcSortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "treeStatus", {
        get: function () {
            return this._treeStatus;
        },
        set: function (status) {
            if (status !== 'collapsed' &&
                status !== 'expanded' &&
                status !== 'loading' &&
                status !== 'disabled') {
                this._treeStatus = 'collapsed';
            }
            else {
                this._treeStatus = status;
            }
            this.cellContext.treeStatus = this._treeStatus;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            if (this.column.cellClass) {
                if (typeof this.column.cellClass === 'string') {
                    cls += ' ' + this.column.cellClass;
                }
                else if (typeof this.column.cellClass === 'function') {
                    var res = this.column.cellClass({
                        row: this.row,
                        group: this.group,
                        column: this.column,
                        value: this.value,
                        rowHeight: this.rowHeight
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
            if (!this.sortDir)
                cls += ' sort-active';
            if (this.isFocused)
                cls += ' active';
            if (this.sortDir === types_1.SortDirection.asc)
                cls += ' sort-asc';
            if (this.sortDir === types_1.SortDirection.desc)
                cls += ' sort-desc';
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "height", {
        get: function () {
            var height = this.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.ngDoCheck = function () {
        this.checkValueUpdates();
    };
    DataTableBodyCellComponent.prototype.ngOnDestroy = function () {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    };
    DataTableBodyCellComponent.prototype.checkValueUpdates = function () {
        var value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            var val = this.column.$$valueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            if (userPipe) {
                value = userPipe.transform(val);
            }
            else if (value !== undefined) {
                value = val;
            }
        }
        if (this.value !== value) {
            this.value = value;
            this.cellContext.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
            this.cd.markForCheck();
        }
    };
    DataTableBodyCellComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyCellComponent.prototype.onClick = function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this._element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element,
            treeStatus: 'collapsed'
        });
    };
    DataTableBodyCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (!sorts)
            return;
        var sort = sorts.find(function (s) {
            return s.prop === _this.column.prop;
        });
        if (sort)
            return sort.dir;
    };
    DataTableBodyCellComponent.prototype.stripHtml = function (html) {
        if (!html.replace)
            return html;
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    };
    DataTableBodyCellComponent.prototype.onTreeAction = function (row) {
        this.treeAction.emit();
    };
    DataTableBodyCellComponent.prototype.calcLeftMargin = function (column, row) {
        var levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], DataTableBodyCellComponent.prototype, "displayCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "group", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyCellComponent.prototype, "rowHeight", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DataTableBodyCellComponent.prototype, "isSelected", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DataTableBodyCellComponent.prototype, "expanded", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyCellComponent.prototype, "rowIndex", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "column", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "row", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyCellComponent.prototype, "sorts", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DataTableBodyCellComponent.prototype, "treeStatus", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyCellComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyCellComponent.prototype, "treeAction", void 0);
    __decorate([
        core_1.ViewChild('cellTemplate', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], DataTableBodyCellComponent.prototype, "cellTemplate", void 0);
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "columnCssClasses", null);
    __decorate([
        core_1.HostBinding('style.width.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "width", null);
    __decorate([
        core_1.HostBinding('style.minWidth.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "minWidth", null);
    __decorate([
        core_1.HostBinding('style.maxWidth.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "maxWidth", null);
    __decorate([
        core_1.HostBinding('style.height'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "height", null);
    __decorate([
        core_1.HostListener('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('dblclick', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onDblClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onKeyDown", null);
    DataTableBodyCellComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"datatable-body-cell-label\"\n      [style.margin-left.px]=\"calcLeftMargin(column, row)\">\n      <label\n        *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n        class=\"datatable-checkbox\">\n        <input\n          type=\"checkbox\"\n          [checked]=\"isSelected\"\n          (click)=\"onCheckboxChange($event)\"\n        />\n      </label>\n      <ng-container *ngIf=\"column.isTreeColumn\">\n        <button *ngIf=\"!column.treeToggleTemplate\"\n          class=\"datatable-tree-button\"\n          [disabled]=\"treeStatus==='disabled'\"\n          (click)=\"onTreeAction()\">\n          <span>\n            <i *ngIf=\"treeStatus==='loading'\"\n              class=\"icon datatable-icon-collapse\"></i>\n            <i *ngIf=\"treeStatus==='collapsed'\"\n              class=\"icon datatable-icon-up\"></i>\n            <i *ngIf=\"treeStatus==='expanded' ||\n                      treeStatus==='disabled'\"\n              class=\"icon datatable-icon-down\"></i>\n          </span>\n        </button>\n        <ng-template *ngIf=\"column.treeToggleTemplate\"\n          [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n          [ngTemplateOutletContext]=\"{ cellContext: cellContext }\">\n        </ng-template>\n      </ng-container>\n\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [title]=\"sanitizedValue\"\n        [innerHTML]=\"value\">\n      </span>\n      <ng-template #cellTemplate\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\">\n      </ng-template>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], DataTableBodyCellComponent);
    return DataTableBodyCellComponent;
}());
exports.DataTableBodyCellComponent = DataTableBodyCellComponent;


/***/ }),

/***/ "./src/components/body/body-group-header-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DatatableGroupHeaderTemplateDirective = /** @class */ (function () {
    function DatatableGroupHeaderTemplateDirective(template) {
        this.template = template;
    }
    DatatableGroupHeaderTemplateDirective = __decorate([
        core_1.Directive({
            selector: '[ngx-datatable-group-header-template]'
        }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DatatableGroupHeaderTemplateDirective);
    return DatatableGroupHeaderTemplateDirective;
}());
exports.DatatableGroupHeaderTemplateDirective = DatatableGroupHeaderTemplateDirective;


/***/ }),

/***/ "./src/components/body/body-group-header.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var body_group_header_template_directive_1 = __webpack_require__("./src/components/body/body-group-header-template.directive.ts");
var DatatableGroupHeaderDirective = /** @class */ (function () {
    function DatatableGroupHeaderDirective() {
        /**
         * Row height is required when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Track toggling of group visibility
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of a group
     */
    DatatableGroupHeaderDirective.prototype.toggleExpandGroup = function (group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    };
    /**
     * Expand all groups
     */
    DatatableGroupHeaderDirective.prototype.expandAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all groups
     */
    DatatableGroupHeaderDirective.prototype.collapseAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableGroupHeaderDirective.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(body_group_header_template_directive_1.DatatableGroupHeaderTemplateDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DatatableGroupHeaderDirective.prototype, "template", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableGroupHeaderDirective.prototype, "toggle", void 0);
    DatatableGroupHeaderDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-group-header' })
    ], DatatableGroupHeaderDirective);
    return DatatableGroupHeaderDirective;
}());
exports.DatatableGroupHeaderDirective = DatatableGroupHeaderDirective;


/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableRowWrapperComponent = /** @class */ (function () {
    function DataTableRowWrapperComponent(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (val) {
            this._rowIndex = val;
            this.rowContext.rowIndex = val;
            this.groupContext.rowIndex = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (val) {
            this._expanded = val;
            this.groupContext.expanded = val;
            this.rowContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DataTableRowWrapperComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    };
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    DataTableRowWrapperComponent.prototype.getGroupHeaderStyle = function () {
        var styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "groupHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "groupedRows", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableRowWrapperComponent.prototype, "rowIndex", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DataTableRowWrapperComponent.prototype, "expanded", null);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
    DataTableRowWrapperComponent = __decorate([
        core_1.Component({
            selector: 'datatable-row-wrapper',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div \n      *ngIf=\"groupHeader && groupHeader.template\"\n      class=\"datatable-group-header\"\n      [ngStyle]=\"getGroupHeaderStyle()\">\n      <ng-template\n        *ngIf=\"groupHeader && groupHeader.template\"\n        [ngTemplateOutlet]=\"groupHeader.template\"\n        [ngTemplateOutletContext]=\"groupContext\">\n      </ng-template>\n    </div>\n    <ng-content \n      *ngIf=\"(groupHeader && groupHeader.template && expanded) || \n             (!groupHeader || !groupHeader.template)\">\n    </ng-content>\n    <div\n      *ngIf=\"rowDetail && rowDetail.template && expanded\"\n      [style.height.px]=\"detailRowHeight\"\n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngTemplateOutletContext]=\"rowContext\">\n      </ng-template>\n    </div>\n  ",
            host: {
                class: 'datatable-row-wrapper'
            }
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.KeyValueDiffers])
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;


/***/ }),

/***/ "./src/components/body/body-row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableBodyRowComponent = /** @class */ (function () {
    function DataTableBodyRowComponent(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.treeStatus = 'collapsed';
        this.activate = new core_1.EventEmitter();
        this.treeAction = new core_1.EventEmitter();
        this._groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        this._element = element.nativeElement;
        this._rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this.recalculateColumns(val);
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            if (this._columns) {
                var colByPin = utils_1.columnsByPin(this._columns);
                this._columnGroupWidths = utils_1.columnGroupWidths(colByPin, colByPin);
            }
            this._innerWidth = val;
            this.recalculateColumns();
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "offsetX", {
        get: function () { return this._offsetX; },
        set: function (val) {
            this._offsetX = val;
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "cssClass", {
        get: function () {
            var cls = 'datatable-body-row';
            if (this.isSelected)
                cls += ' active';
            if (this.rowIndex % 2 !== 0)
                cls += ' datatable-row-odd';
            if (this.rowIndex % 2 === 0)
                cls += ' datatable-row-even';
            if (this.rowClass) {
                var res = this.rowClass(this.row);
                if (typeof res === 'string') {
                    cls += " " + res;
                }
                else if (typeof res === 'object') {
                    var keys = Object.keys(res);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        if (res[k] === true)
                            cls += " " + k;
                    }
                }
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columnsTotalWidths", {
        get: function () {
            return this._columnGroupWidths.total;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.ngDoCheck = function () {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    };
    DataTableBodyRowComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableBodyRowComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableBodyRowComponent.prototype.buildStylesByGroup = function () {
        this._groupStyles['left'] = this.calcStylesByGroup('left');
        this._groupStyles['center'] = this.calcStylesByGroup('center');
        this._groupStyles['right'] = this.calcStylesByGroup('right');
        this.cd.markForCheck();
    };
    DataTableBodyRowComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this._columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this._element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this._element
            });
        }
    };
    DataTableBodyRowComponent.prototype.onMouseenter = function (event) {
        this.activate.emit({
            type: 'mouseenter',
            event: event,
            row: this.row,
            rowElement: this._element
        });
    };
    DataTableBodyRowComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        this._columns = val;
        var colsByPin = utils_1.columnsByPin(this._columns);
        this._columnsByPin = utils_1.columnsByPinArr(this._columns);
        this._columnGroupWidths = utils_1.columnGroupWidths(colsByPin, this._columns);
    };
    DataTableBodyRowComponent.prototype.onTreeAction = function () {
        this.treeAction.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyRowComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyRowComponent.prototype, "innerWidth", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyRowComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "group", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyRowComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyRowComponent.prototype, "rowIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyRowComponent.prototype, "treeStatus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyRowComponent.prototype, "offsetX", null);
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], DataTableBodyRowComponent.prototype, "cssClass", null);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.HostBinding('style.width.px'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyRowComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyRowComponent.prototype, "treeAction", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyRowComponent.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyRowComponent.prototype, "onMouseenter", null);
    DataTableBodyRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div\n      *ngFor=\"let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"_groupStyles[colGroup.type]\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [group]=\"group\"\n        [expanded]=\"expanded\"\n        [isSelected]=\"isSelected\"\n        [rowIndex]=\"rowIndex\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        [displayCheck]=\"displayCheck\"\n        [treeStatus]=\"treeStatus\"\n        (activate)=\"onActivate($event, ii)\"\n        (treeAction)=\"onTreeAction()\">\n      </datatable-body-cell>\n    </div>\n  "
        }),
        __param(1, core_1.SkipSelf()),
        __metadata("design:paramtypes", [core_1.KeyValueDiffers,
            services_1.ScrollbarHelper,
            core_1.ChangeDetectorRef,
            core_1.ElementRef])
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}());
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;


/***/ }),

/***/ "./src/components/body/body.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var scroller_component_1 = __webpack_require__("./src/components/body/scroller.component.ts");
var ng2_dragula_1 = __webpack_require__("./node_modules/ng2-dragula/dist/fesm5/ng2-dragula.js");
var DataTableBodyComponent = /** @class */ (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    function DataTableBodyComponent(cd, dragulaService) {
        var _this = this;
        this.cd = cd;
        this.dragulaService = dragulaService;
        this.selected = [];
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.treeAction = new core_1.EventEmitter();
        this.onRowDrop = new core_1.EventEmitter();
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = new Map();
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = function (row, index) {
            if (!_this.rowDetail)
                return 0;
            var rowHeight = _this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
        };
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            var idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return idx + "-" + this.trackByProp;
            }
            else {
                return idx;
            }
        }.bind(this);
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.rowExpansions.clear();
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        set: function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: function () {
            return this._bodyHeight;
        },
        set: function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         */
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: function () {
            if (this.scrollbarV && this.virtualization && this.rowCount) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
            // avoid TS7030: Not all code paths return a value.
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.dragulaName) {
            /**
             * Sets handle to all rows
             */
            if (!this.dragulaService.find(this.dragulaName)) {
                this.dragulaService.createGroup(this.dragulaName, {
                    moves: function (el, container, handle) {
                        return handle.className === 'handle';
                    }
                });
            }
            /**
             * Subscribes for dropModel event and emit onRowDrop event to fire it outside the ngx-datatable
             */
            this.dragulaService.dropModel(this.dragulaName)
                .subscribe(function (_a) {
                var el = _a.el, target = _a.target, source = _a.source, sourceModel = _a.sourceModel, targetModel = _a.targetModel, item = _a.item;
                _this.rows = sourceModel.slice();
                _this.onRowDrop.emit(_this.rows);
                _this.updateRows();
            });
        }
    };
    /**
     * Called after the constructor, initializing input properties
     */
    DataTableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'group')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     */
    DataTableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.dragulaService.find('newBag'))
            this.dragulaService.destroy('newBag');
        if (this.rowDetail)
            this.listener.unsubscribe();
        if (this.groupHeader)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    DataTableBodyComponent.prototype.onBodyScroll = function (event) {
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(event.direction);
        this.updateRows();
    };
    /**
     * Updates the page given a direction.
     */
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            var maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                var group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                var row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return this.rowHeight;
    };
    /**
     * @param group the group with all rows
     */
    DataTableBodyComponent.prototype.getGroupHeight = function (group) {
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = function (row) {
        var rowHeight = this.getRowHeight(row);
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} rows The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowsStyles = function (rows) {
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            var idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                var row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getBottomSummaryRowStyles = function () {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        var styles = { position: 'absolute' };
        var pos = this.rowHeightsCache.query(this.rows.length - 1);
        utils_1.translateXY(styles, 0, pos);
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     */
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                var height = parseInt(this.bodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization))
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: this.rowExpansions
            });
        }
    };
    /**
     * Gets the index for the view port
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            var detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            var idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            this.rowExpansions.set(row, rowExpanded);
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Recalculates the table
     */
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    /**
     * Tracks the column
     */
    DataTableBodyComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    DataTableBodyComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = offsetDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    DataTableBodyComponent.prototype.getRowExpanded = function (row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (var _i = 0, _a = this.groupedRows; _i < _a.length; _i++) {
                var group = _a[_i];
                this.rowExpansions.set(group, 1);
            }
        }
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    DataTableBodyComponent.prototype.getRowIndex = function (row) {
        return this.rowIndexes.get(row) || 0;
    };
    DataTableBodyComponent.prototype.onTreeAction = function (row) {
        this.treeAction.emit({ row: row });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "externalPaging", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "displayCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "trackByProp", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupedRows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "groupExpansionDefault", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "groupRowsBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "virtualization", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "summaryRow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "summaryPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "summaryHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "dragulaName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "offset", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "rowCount", null);
    __decorate([
        core_1.HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DataTableBodyComponent.prototype, "bodyWidth", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('style.height'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableBodyComponent.prototype, "bodyHeight", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "treeAction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "onRowDrop", void 0);
    __decorate([
        core_1.ViewChild(scroller_component_1.ScrollerComponent),
        __metadata("design:type", scroller_component_1.ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths?.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'top'\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n        <div\n          [dragula]=\"dragulaName\"\n          [(dragulaModel)]=\"rows\">\n          <datatable-row-wrapper\n            [groupedRows]=\"groupedRows\"\n            *ngFor=\"let group of temp; let i = index;\"\n            [innerWidth]=\"innerWidth\"\n            [ngStyle]=\"getRowsStyles(group)\"\n            [rowDetail]=\"rowDetail\"\n            [groupHeader]=\"groupHeader\"\n            [offsetX]=\"offsetX\"\n            [detailRowHeight]=\"getDetailRowHeight(group[i],i)\"\n            [row]=\"group\"\n            [expanded]=\"getRowExpanded(group)\"\n            [rowIndex]=\"getRowIndex(group[i])\"\n            (rowContextmenu)=\"rowContextmenu.emit($event)\">\n            <datatable-body-row\n              *ngIf=\"!groupedRows; else groupedRowsTemplate\"\n              tabindex=\"-1\"\n              [isSelected]=\"selector.getRowSelected(group)\"\n              [innerWidth]=\"innerWidth\"\n              [offsetX]=\"offsetX\"\n              [columns]=\"columns\"\n              [rowHeight]=\"getRowHeight(group)\"\n              [row]=\"group\"\n              [rowIndex]=\"getRowIndex(group)\"\n              [expanded]=\"getRowExpanded(group)\"\n              [rowClass]=\"rowClass\"\n              [displayCheck]=\"displayCheck\"\n              [treeStatus]=\"group.treeStatus\"\n              (treeAction)=\"onTreeAction(group)\"\n              (activate)=\"selector.onActivate($event, indexes.first + i)\">\n            </datatable-body-row>\n            <ng-template #groupedRowsTemplate>\n              <datatable-body-row\n                *ngFor=\"let row of group.value; let i = index;\"\n                tabindex=\"-1\"\n                [isSelected]=\"selector.getRowSelected(row)\"\n                [innerWidth]=\"innerWidth\"\n                [offsetX]=\"offsetX\"\n                [columns]=\"columns\"\n                [rowHeight]=\"getRowHeight(row)\"\n                [row]=\"row\"\n                [group]=\"group.value\"\n                [rowIndex]=\"getRowIndex(row)\"\n                [expanded]=\"getRowExpanded(row)\"\n                [rowClass]=\"rowClass\"\n                (activate)=\"selector.onActivate($event, i)\">\n              </datatable-body-row>\n            </ng-template>\n          </datatable-row-wrapper>\n        </div>\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'bottom'\"\n          [ngStyle]=\"getBottomSummaryRowStyles()\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows?.length && !loadingIndicator\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                class: 'datatable-body'
            }
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, ng2_dragula_1.DragulaService])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;


/***/ }),

/***/ "./src/components/body/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/body/body.component.ts"));
__export(__webpack_require__("./src/components/body/body-cell.component.ts"));
__export(__webpack_require__("./src/components/body/body-row.component.ts"));
__export(__webpack_require__("./src/components/body/progress-bar.component.ts"));
__export(__webpack_require__("./src/components/body/scroller.component.ts"));
__export(__webpack_require__("./src/components/body/body-row-wrapper.component.ts"));
__export(__webpack_require__("./src/components/body/selection.component.ts"));
__export(__webpack_require__("./src/components/body/body-group-header.directive.ts"));
__export(__webpack_require__("./src/components/body/body-group-header-template.directive.ts"));
__export(__webpack_require__("./src/components/body/summary/index.ts"));


/***/ }),

/***/ "./src/components/body/progress-bar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
    }
    ProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'datatable-progress',
            template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());
exports.ProgressBarComponent = ProgressBarComponent;


/***/ }),

/***/ "./src/components/body/scroller.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var ScrollerComponent = /** @class */ (function () {
    function ScrollerComponent(ngZone, element, renderer) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            var renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var _this = this;
        var dom = event.currentTarget;
        requestAnimationFrame(function () {
            _this.scrollYPos = dom.scrollTop;
            _this.scrollXPos = dom.scrollLeft;
            _this.updateOffset();
        });
    };
    ScrollerComponent.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(),
        __metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.HostBinding('style.width.px'),
        core_1.Input(),
        __metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ScrollerComponent.prototype, "scroll", void 0);
    ScrollerComponent = __decorate([
        core_1.Component({
            selector: 'datatable-scroller',
            template: "\n      <ng-content></ng-content>\n  ",
            host: {
                class: 'datatable-scroll'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.NgZone, core_1.ElementRef, core_1.Renderer2])
    ], ScrollerComponent);
    return ScrollerComponent;
}());
exports.ScrollerComponent = ScrollerComponent;


/***/ }),

/***/ "./src/components/body/selection.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var DataTableSelectionComponent = /** @class */ (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = utils_1.selectRows(this.selected.slice(), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
        var _a;
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (rowElement, keyCode) {
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "select", void 0);
    DataTableSelectionComponent = __decorate([
        core_1.Component({
            selector: 'datatable-selection',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;


/***/ }),

/***/ "./src/components/body/summary/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/body/summary/summary-row.component.ts"));


/***/ }),

/***/ "./src/components/body/summary/summary-row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
function defaultSumFunc(cells) {
    var cellsWithValues = cells.filter(function (cell) { return !!cell; });
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some(function (cell) { return typeof cell !== 'number'; })) {
        return null;
    }
    return cellsWithValues.reduce(function (res, cell) { return res + cell; });
}
function noopSumFunc(cells) {
    return null;
}
var DataTableSummaryRowComponent = /** @class */ (function () {
    function DataTableSummaryRowComponent() {
        this.summaryRow = {};
    }
    DataTableSummaryRowComponent.prototype.ngOnChanges = function () {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    };
    DataTableSummaryRowComponent.prototype.updateInternalColumns = function () {
        this._internalColumns = this.columns.map(function (col) { return (__assign({}, col, { cellTemplate: col.summaryTemplate })); });
    };
    DataTableSummaryRowComponent.prototype.updateValues = function () {
        var _this = this;
        this.summaryRow = {};
        this.columns
            .filter(function (col) { return !col.summaryTemplate; })
            .forEach(function (col) {
            var cellsFromSingleColumn = _this.rows.map(function (row) { return row[col.prop]; });
            var sumFunc = _this.getSummaryFunction(col);
            _this.summaryRow[col.prop] = col.pipe ?
                col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
                sumFunc(cellsFromSingleColumn);
        });
    };
    DataTableSummaryRowComponent.prototype.getSummaryFunction = function (column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "innerWidth", void 0);
    DataTableSummaryRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-summary-row',
            template: "\n  <datatable-body-row\n    *ngIf=\"summaryRow && _internalColumns\"\n    tabindex=\"-1\"\n    [innerWidth]=\"innerWidth\"\n    [offsetX]=\"offsetX\"\n    [columns]=\"_internalColumns\"\n    [rowHeight]=\"rowHeight\"\n    [row]=\"summaryRow\"\n    [rowIndex]=\"-1\">\n  </datatable-body-row>\n  ",
            host: {
                class: 'datatable-summary-row'
            }
        })
    ], DataTableSummaryRowComponent);
    return DataTableSummaryRowComponent;
}());
exports.DataTableSummaryRowComponent = DataTableSummaryRowComponent;


/***/ }),

/***/ "./src/components/columns/column-cell.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DataTableColumnCellDirective = /** @class */ (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    DataTableColumnCellDirective = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-cell-template]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DataTableColumnCellDirective);
    return DataTableColumnCellDirective;
}());
exports.DataTableColumnCellDirective = DataTableColumnCellDirective;


/***/ }),

/***/ "./src/components/columns/column-header.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DataTableColumnHeaderDirective = /** @class */ (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    DataTableColumnHeaderDirective = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-header-template]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DataTableColumnHeaderDirective);
    return DataTableColumnHeaderDirective;
}());
exports.DataTableColumnHeaderDirective = DataTableColumnHeaderDirective;


/***/ }),

/***/ "./src/components/columns/column.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var column_header_directive_1 = __webpack_require__("./src/components/columns/column-header.directive.ts");
var column_cell_directive_1 = __webpack_require__("./src/components/columns/column-cell.directive.ts");
var tree_directive_1 = __webpack_require__("./src/components/columns/tree.directive.ts");
var column_changes_service_1 = __webpack_require__("./src/services/column-changes.service.ts");
var DataTableColumnDirective = /** @class */ (function () {
    function DataTableColumnDirective(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    DataTableColumnDirective.prototype.ngOnChanges = function () {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "prop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "frozenLeft", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "frozenRight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "flexGrow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "resizeable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "comparator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "pipe", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "canAutoResize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "checkboxable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "headerClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "cellClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "isTreeColumn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "treeLevelIndent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], DataTableColumnDirective.prototype, "summaryFunc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "summaryTemplate", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_cell_directive_1.DataTableColumnCellDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "cellTemplate", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_header_directive_1.DataTableColumnHeaderDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "headerTemplate", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(tree_directive_1.DataTableColumnCellTreeToggle, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "treeToggleTemplate", void 0);
    DataTableColumnDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-column' }),
        __metadata("design:paramtypes", [column_changes_service_1.ColumnChangesService])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;


/***/ }),

/***/ "./src/components/columns/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/columns/column.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-header.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-cell.directive.ts"));
__export(__webpack_require__("./src/components/columns/tree.directive.ts"));


/***/ }),

/***/ "./src/components/columns/tree.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DataTableColumnCellTreeToggle = /** @class */ (function () {
    function DataTableColumnCellTreeToggle(template) {
        this.template = template;
    }
    DataTableColumnCellTreeToggle = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-tree-toggle]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DataTableColumnCellTreeToggle);
    return DataTableColumnCellTreeToggle;
}());
exports.DataTableColumnCellTreeToggle = DataTableColumnCellTreeToggle;


/***/ }),

/***/ "./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js??ref--3-4!./src/components/datatable.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/components/datatable.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var body_1 = __webpack_require__("./src/components/body/index.ts");
var body_group_header_directive_1 = __webpack_require__("./src/components/body/body-group-header.directive.ts");
var columns_1 = __webpack_require__("./src/components/columns/index.ts");
var row_detail_1 = __webpack_require__("./src/components/row-detail/index.ts");
var footer_1 = __webpack_require__("./src/components/footer/index.ts");
var header_1 = __webpack_require__("./src/components/header/index.ts");
var rxjs_1 = __webpack_require__("rxjs");
var DatatableComponent = /** @class */ (function () {
    function DatatableComponent(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService) {
        this.scrollbarHelper = scrollbarHelper;
        this.dimensionsHelper = dimensionsHelper;
        this.cd = cd;
        this.columnChangesService = columnChangesService;
        /**
         * Enable rows dragging
         * @type {string}
         */
        this.dragulaName = null;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         */
        this.columnMode = types_1.ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         */
        this.externalSorting = false;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         */
        this.reorderable = true;
        /**
         * Swap columns on re-order columns or
         * move them.
         */
        this.swapColumns = true;
        /**
         * The type of sorting
         */
        this.sortType = types_1.SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         */
        this.sorts = [];
        /**
         * Css class overrides
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         */
        this.rowIdentity = (function (x) { return x; });
        /**
         * A boolean you can use to set the detault behaviour of rows and groups
         * whether they will start expanded or not. If ommited the default is NOT expanded.
         *
         */
        this.groupExpansionDefault = false;
        /**
         * Property to which you can use for determining select all
         * rows on current page or not.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.selectAllRowsOnPage = false;
        /**
         * A flag for row virtualization on / off
         */
        this.virtualization = true;
        /**
         * A flag for switching summary row on / off
         */
        this.summaryRow = false;
        /**
         * A height of summary row
         */
        this.summaryHeight = 30;
        /**
         * A property holds a summary row position: top/bottom
         */
        this.summaryPosition = 'top';
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         */
        this.scroll = new core_1.EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         */
        this.activate = new core_1.EventEmitter();
        /**
         * A cell or row was selected.
         */
        this.select = new core_1.EventEmitter();
        /**
         * Column sort was invoked.
         */
        this.sort = new core_1.EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         */
        this.page = new core_1.EventEmitter();
        /**
         * Columns were re-ordered.
         */
        this.reorder = new core_1.EventEmitter();
        /**
         * Column was resized.
         */
        this.resize = new core_1.EventEmitter();
        /**
         * Fires event when row was dragged and dropped
         */
        this.onRowDrop = new core_1.EventEmitter();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         */
        this.tableContextmenu = new core_1.EventEmitter(false);
        /**
         * A row was expanded ot collapsed for tree
         */
        this.treeAction = new core_1.EventEmitter();
        this.rowCount = 0;
        this._offsetX = new rxjs_1.BehaviorSubject(0);
        this._count = 0;
        this._offset = 0;
        this._subscriptions = [];
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         */
        get: function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         */
        set: function (val) {
            this._rows = val;
            if (val) {
                this._internalRows = val.slice();
            }
            // auto sort on new updates
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            // auto group by parent on new update
            this._internalRows = utils_1.groupRowsByParents(this._internalRows, utils_1.optionalGetterForProp(this.treeFromRelation), utils_1.optionalGetterForProp(this.treeToRelation));
            // recalculate sizes/etc
            this.recalculate();
            if (this._rows && this._groupRowsBy) {
                // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "groupRowsBy", {
        get: function () {
            return this._groupRowsBy;
        },
        /**
         * This attribute allows the user to set the name of the column to group the data with
         */
        set: function (val) {
            if (val) {
                this._groupRowsBy = val;
                if (this._rows && this._groupRowsBy) {
                    // cretes a new array with the data grouped
                    this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         */
        get: function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         */
        set: function (val) {
            if (val) {
                this._internalColumns = val.slice();
                utils_1.setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "limit", {
        /**
         * Gets the limit.
         */
        get: function () {
            return this._limit;
        },
        /**
         * The page size to be shown.
         * Default value: `undefined`
         */
        set: function (val) {
            this._limit = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         */
        get: function () {
            return this._count;
        },
        /**
         * The total count of all rows.
         * Default value: `0`
         */
        set: function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "offset", {
        get: function () {
            return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
        },
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         */
        set: function (val) {
            this._offset = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         */
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         */
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVirtualized", {
        /**
         * CSS class applied to root element if
         * virtualization is enabled.
         */
        get: function () {
            return this.virtualization;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         */
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         */
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         */
        get: function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         */
        set: function (val) {
            this._columnTemplates = val;
            this.translateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         */
        get: function () {
            var allRowsSelected = (this.rows && this.selected && this.selected.length === this.rows.length);
            if (this.selectAllRowsOnPage) {
                var indexes = this.bodyComponent.indexes;
                var rowsOnPage = indexes.last - indexes.first;
                allRowsSelected = (this.selected.length === rowsOnPage);
            }
            return this.selected && this.rows &&
                this.rows.length !== 0 && allRowsSelected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    DatatableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     */
    DatatableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        if (typeof requestAnimationFrame === 'undefined') {
            return;
        }
        requestAnimationFrame(function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.page.emit({
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: 0
                });
            }
        });
    };
    DatatableComponent.prototype.onRowDropSuccess = function (event) {
        this.onRowDrop.emit(event);
    };
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     */
    DatatableComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.columnTemplates.changes.subscribe(function (v) {
            return _this.translateColumns(v);
        });
        this.listenForColumnInputChanges();
    };
    /**
     * Translates the templates to the column objects
     */
    DatatableComponent.prototype.translateColumns = function (val) {
        if (val) {
            var arr = val.toArray();
            if (arr.length) {
                this._internalColumns = utils_1.translateTemplates(arr);
                utils_1.setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
                this.sortInternalRows();
                this.cd.markForCheck();
            }
        }
    };
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    DatatableComponent.prototype.groupArrayBy = function (originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        var map = new Map();
        var i = 0;
        originalArray.forEach(function (item) {
            var key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        });
        var addGroup = function (key, value) {
            return { key: key, value: value };
        };
        // convert map back to a simple array of objects
        return Array.from(map, function (x) { return addGroup(x[0], x[1]); });
    };
    /*
    * Lifecycle hook that is called when Angular dirty checks a directive.
    */
    DatatableComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            else {
                this._internalRows = this.rows.slice();
            }
            // auto group by parent on new update
            this._internalRows = utils_1.groupRowsByParents(this._internalRows, utils_1.optionalGetterForProp(this.treeFromRelation), utils_1.optionalGetterForProp(this.treeToRelation));
            this.recalculatePages();
            this.cd.markForCheck();
        }
    };
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     */
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Window resize handler to update sizes.
     */
    DatatableComponent.prototype.onWindowResize = function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this._internalColumns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return undefined;
        var width = this._innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    DatatableComponent.prototype.recalculateDims = function () {
        var dims = this.dimensionsHelper.getDimensions(this.element);
        this._innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            var height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     */
    DatatableComponent.prototype.recalculatePages = function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     */
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        // Avoid pagination caming from body events like scroll when the table 
        // has no virtualization and the external paging is enable. 
        // This means, let's the developer handle pagination by my him(her) self
        if (this.externalPaging && !this.virtualization) {
            return;
        }
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * The body triggered a scroll event.
     */
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this._offsetX.next(event.offsetX);
        this.scroll.emit(event);
        this.cd.detectChanges();
    };
    /**
     * The footer triggered a page event.
     */
    DatatableComponent.prototype.onFooterPage = function (event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
    };
    /**
     * Recalculates the sizes of the page
     */
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return this.limit;
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     */
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupedRows) {
                return this.groupedRows.length;
            }
            else if (this.treeFromRelation != null && this.treeToRelation != null) {
                return this._internalRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    };
    /**
     * The header triggered a contextmenu event.
     */
    DatatableComponent.prototype.onColumnContextmenu = function (_a) {
        var event = _a.event, column = _a.column;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     */
    DatatableComponent.prototype.onRowContextmenu = function (_a) {
        var event = _a.event, row = _a.row;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     */
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        var idx;
        var cols = this._internalColumns.map(function (c, i) {
            c = __assign({}, c);
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(cols, idx);
        this._internalColumns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     */
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this._internalColumns.map(function (c) {
            return __assign({}, c);
        });
        if (this.swapColumns) {
            var prevCol = cols[newValue];
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this._internalColumns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     */
    DatatableComponent.prototype.onColumnSort = function (event) {
        // clean selected rows
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
        this.sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = utils_1.groupRowsByParents(this._internalRows, utils_1.optionalGetterForProp(this.treeFromRelation), utils_1.optionalGetterForProp(this.treeToRelation));
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     */
    DatatableComponent.prototype.onHeaderSelect = function (event) {
        if (this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            var first = this.bodyComponent.indexes.first;
            var last = this.bodyComponent.indexes.last;
            var allSelected = this.selected.length === (last - first);
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_a = this.selected).push.apply(_a, this._internalRows.slice(first, last));
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            var allSelected = this.selected.length === this.rows.length;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_b = this.selected).push.apply(_b, this.rows);
            }
        }
        this.select.emit({
            selected: this.selected
        });
        var _a, _b;
    };
    /**
     * A row was selected from body
     */
    DatatableComponent.prototype.onBodySelect = function (event) {
        this.select.emit(event);
    };
    /**
     * A row was expanded or collapsed for tree
     */
    DatatableComponent.prototype.onTreeAction = function (event) {
        var _this = this;
        var row = event.row;
        // TODO: For duplicated items this will not work
        var rowIndex = this._rows.findIndex(function (r) {
            return r[_this.treeToRelation] === event.row[_this.treeToRelation];
        });
        this.treeAction.emit({ row: row, rowIndex: rowIndex });
    };
    DatatableComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
    DatatableComponent.prototype.listenForColumnInputChanges = function () {
        var _this = this;
        this._subscriptions.push(this.columnChangesService
            .columnInputChanges$
            .subscribe(function () {
            if (_this.columnTemplates) {
                _this.columnTemplates.notifyOnChanges();
            }
        }));
    };
    DatatableComponent.prototype.sortInternalRows = function () {
        this._internalRows = utils_1.sortRows(this._internalRows, this._internalColumns, this.sorts);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "dragulaName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatatableComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DatatableComponent.prototype, "groupRowsBy", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "groupedRows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DatatableComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "columnMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalPaging", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalSorting", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "limit", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "count", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "offset", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "reorderable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "swapColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "cssClasses", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "messages", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], DatatableComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], DatatableComponent.prototype, "displayCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "groupExpansionDefault", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "trackByProp", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "selectAllRowsOnPage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "virtualization", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "treeFromRelation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "treeToRelation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "summaryRow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "summaryHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "summaryPosition", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "resize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "onRowDrop", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "tableContextmenu", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "treeAction", void 0);
    __decorate([
        core_1.HostBinding('class.fixed-header'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.virtualized'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isVirtualized", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isSelectable", null);
    __decorate([
        core_1.HostBinding('class.checkbox-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isCheckboxSelection", null);
    __decorate([
        core_1.HostBinding('class.cell-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isCellSelection", null);
    __decorate([
        core_1.HostBinding('class.single-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isSingleSelection", null);
    __decorate([
        core_1.HostBinding('class.multi-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isMultiSelection", null);
    __decorate([
        core_1.HostBinding('class.multi-click-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isMultiClickSelection", null);
    __decorate([
        core_1.ContentChildren(columns_1.DataTableColumnDirective),
        __metadata("design:type", core_1.QueryList),
        __metadata("design:paramtypes", [core_1.QueryList])
    ], DatatableComponent.prototype, "columnTemplates", null);
    __decorate([
        core_1.ContentChild(row_detail_1.DatatableRowDetailDirective),
        __metadata("design:type", row_detail_1.DatatableRowDetailDirective)
    ], DatatableComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.ContentChild(body_group_header_directive_1.DatatableGroupHeaderDirective),
        __metadata("design:type", body_group_header_directive_1.DatatableGroupHeaderDirective)
    ], DatatableComponent.prototype, "groupHeader", void 0);
    __decorate([
        core_1.ContentChild(footer_1.DatatableFooterDirective),
        __metadata("design:type", footer_1.DatatableFooterDirective)
    ], DatatableComponent.prototype, "footer", void 0);
    __decorate([
        core_1.ViewChild(body_1.DataTableBodyComponent),
        __metadata("design:type", body_1.DataTableBodyComponent)
    ], DatatableComponent.prototype, "bodyComponent", void 0);
    __decorate([
        core_1.ViewChild(header_1.DataTableHeaderComponent),
        __metadata("design:type", header_1.DataTableHeaderComponent)
    ], DatatableComponent.prototype, "headerComponent", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        utils_1.throttleable(5),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onWindowResize", null);
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'ngx-datatable',
            template: "\n    <div\n      visibilityObserver\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"_innerWidth\"\n        [offsetX]=\"_offsetX | async\"\n        [dealsWithGroup]=\"groupedRows\"\n        [columns]=\"_internalColumns\"\n        [headerHeight]=\"headerHeight\"\n        [reorderable]=\"reorderable\"\n        [targetMarkerTemplate]=\"targetMarkerTemplate\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        [allRowsSelected]=\"allRowsSelected\"\n        [selectionType]=\"selectionType\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\"\n        (select)=\"onHeaderSelect($event)\"\n        (columnContextmenu)=\"onColumnContextmenu($event)\">\n      </datatable-header>\n      <datatable-body\n        (onRowDrop)=\"onRowDropSuccess($event)\"\n        [dragulaName]=\"dragulaName\"\n        [groupRowsBy]=\"groupRowsBy\"\n        [groupedRows]=\"groupedRows\"\n        [rows]=\"_internalRows\"\n        [groupExpansionDefault]=\"groupExpansionDefault\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [virtualization]=\"virtualization\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [externalPaging]=\"externalPaging\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"_internalColumns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"_offsetX | async\"\n        [rowDetail]=\"rowDetail\"\n        [groupHeader]=\"groupHeader\"\n        [selected]=\"selected\"\n        [innerWidth]=\"_innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [rowClass]=\"rowClass\"\n        [selectCheck]=\"selectCheck\"\n        [displayCheck]=\"displayCheck\"\n        [summaryRow]=\"summaryRow\"\n        [summaryHeight]=\"summaryHeight\"\n        [summaryPosition]=\"summaryPosition\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (rowContextmenu)=\"onRowContextmenu($event)\"\n        (select)=\"onBodySelect($event)\"\n        (scroll)=\"onBodyScroll($event)\"\n        (treeAction)=\"onTreeAction($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [footerTemplate]=\"footer\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [selectedCount]=\"selected.length\"\n        [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/components/datatable.component.scss")],
            host: {
                class: 'ngx-datatable'
            }
        }),
        __param(0, core_1.SkipSelf()),
        __param(1, core_1.SkipSelf()),
        __metadata("design:paramtypes", [services_1.ScrollbarHelper,
            services_1.DimensionsHelper,
            core_1.ChangeDetectorRef,
            core_1.ElementRef,
            core_1.KeyValueDiffers,
            services_1.ColumnChangesService])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;


/***/ }),

/***/ "./src/components/footer/footer-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DataTableFooterTemplateDirective = /** @class */ (function () {
    function DataTableFooterTemplateDirective(template) {
        this.template = template;
    }
    DataTableFooterTemplateDirective = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-footer-template]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DataTableFooterTemplateDirective);
    return DataTableFooterTemplateDirective;
}());
exports.DataTableFooterTemplateDirective = DataTableFooterTemplateDirective;


/***/ }),

/***/ "./src/components/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var footer_directive_1 = __webpack_require__("./src/components/footer/footer.directive.ts");
var DataTableFooterComponent = /** @class */ (function () {
    function DataTableFooterComponent() {
        this.selectedCount = 0;
        this.page = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "rowCount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "totalMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", footer_directive_1.DatatableFooterDirective)
    ], DataTableFooterComponent.prototype, "footerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "selectedCount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableFooterComponent.prototype, "selectedMessage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableFooterComponent.prototype, "page", void 0);
    DataTableFooterComponent = __decorate([
        core_1.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      class=\"datatable-footer-inner\"\n      [ngClass]=\"{'selected-count': selectedMessage}\"\n      [style.height.px]=\"footerHeight\">\n      <ng-template\n        *ngIf=\"footerTemplate\"\n        [ngTemplateOutlet]=\"footerTemplate.template\"\n        [ngTemplateOutletContext]=\"{ \n          rowCount: rowCount, \n          pageSize: pageSize, \n          selectedCount: selectedCount,\n          curPage: curPage,\n          offset: offset\n        }\">\n      </ng-template>\n      <div class=\"page-count\" *ngIf=\"!footerTemplate\">\n        <span *ngIf=\"selectedMessage\">\n          {{selectedCount?.toLocaleString()}} {{selectedMessage}} / \n        </span>\n        {{rowCount?.toLocaleString()}} {{totalMessage}}\n      </div>\n      <datatable-pager *ngIf=\"!footerTemplate\"\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n      </datatable-pager>\n    </div>\n  ",
            host: {
                class: 'datatable-footer'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DataTableFooterComponent);
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;


/***/ }),

/***/ "./src/components/footer/footer.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var footer_template_directive_1 = __webpack_require__("./src/components/footer/footer-template.directive.ts");
var DatatableFooterDirective = /** @class */ (function () {
    function DatatableFooterDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableFooterDirective.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "totalMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableFooterDirective.prototype, "selectedMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(footer_template_directive_1.DataTableFooterTemplateDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DatatableFooterDirective.prototype, "template", void 0);
    DatatableFooterDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-footer' })
    ], DatatableFooterDirective);
    return DatatableFooterDirective;
}());
exports.DatatableFooterDirective = DatatableFooterDirective;


/***/ }),

/***/ "./src/components/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/footer/footer.component.ts"));
__export(__webpack_require__("./src/components/footer/pager.component.ts"));
__export(__webpack_require__("./src/components/footer/footer.directive.ts"));
__export(__webpack_require__("./src/components/footer/footer-template.directive.ts"));


/***/ }),

/***/ "./src/components/footer/pager.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DataTablePagerComponent = /** @class */ (function () {
    function DataTablePagerComponent() {
        this.change = new core_1.EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    Object.defineProperty(DataTablePagerComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (val) {
            this._size = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagerComponent.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePagerComponent.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePagerComponent.prototype.prevPage = function () {
        this.selectPage(this.page - 1);
    };
    DataTablePagerComponent.prototype.nextPage = function () {
        this.selectPage(this.page + 1);
    };
    DataTablePagerComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page: page
            });
        }
    };
    DataTablePagerComponent.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "count", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "page", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTablePagerComponent.prototype, "change", void 0);
    DataTablePagerComponent = __decorate([
        core_1.Component({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to first page\"\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to previous page\"\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        role=\"button\"\n        [attr.aria-label]=\"'page ' + pg.number\"\n        class=\"pages\"\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to next page\"\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to last page\"\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
            host: {
                class: 'datatable-pager'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}());
exports.DataTablePagerComponent = DataTablePagerComponent;


/***/ }),

/***/ "./src/components/header/header-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableHeaderCellComponent = /** @class */ (function () {
    function DataTableHeaderCellComponent(cd) {
        this.cd = cd;
        this.sort = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.columnContextmenu = new core_1.EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "allRowsSelected", {
        get: function () {
            return this._allRowsSelected;
        },
        set: function (value) {
            this._allRowsSelected = value;
            this.cellContext.allRowsSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.cellContext.sortDir = this.sortDir;
            this.sortClass = this.calcSortClass(this.sortDir);
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            if (this.column.headerClass) {
                if (typeof this.column.headerClass === 'string') {
                    cls += ' ' + this.column.headerClass;
                }
                else if (typeof this.column.headerClass === 'function') {
                    var res = this.column.headerClass({
                        column: this.column
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: function () {
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: function () {
            return this.column.checkboxable &&
                this.column.headerCheckboxable &&
                this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.onContextmenu = function ($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    };
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            var sort = sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (sortDir === types_1.SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === types_1.SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderCellComponent.prototype, "isTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "targetMarkerContext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableHeaderCellComponent.prototype, "allRowsSelected", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableHeaderCellComponent.prototype, "column", null);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableHeaderCellComponent.prototype, "sorts", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderCellComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderCellComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "columnContextmenu", void 0);
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
    __decorate([
        core_1.HostBinding('attr.title'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "name", null);
    __decorate([
        core_1.HostBinding('style.minWidth.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "minWidth", null);
    __decorate([
        core_1.HostBinding('style.maxWidth.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "maxWidth", null);
    __decorate([
        core_1.HostBinding('style.width.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "width", null);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderCellComponent.prototype, "onContextmenu", null);
    DataTableHeaderCellComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header-cell',
            template: "\n    <div class=\"datatable-header-cell-template-wrap\">\n      <ng-template\n        *ngIf=\"isTarget\"\n        [ngTemplateOutlet]=\"targetMarkerTemplate\"\n        [ngTemplateOutletContext]=\"targetMarkerContext\">\n      </ng-template>\n      <label\n        *ngIf=\"isCheckboxable\"\n        class=\"datatable-checkbox\">\n        <input\n          type=\"checkbox\"\n          [checked]=\"allRowsSelected\"\n          (change)=\"select.emit(!allRowsSelected)\"\n        />\n      </label>\n      <span\n        *ngIf=\"!column.headerTemplate\"\n        class=\"datatable-header-cell-wrapper\">\n        <span\n          class=\"datatable-header-cell-label draggable\"\n          (click)=\"onSort()\"\n          [innerHTML]=\"name\">\n        </span>\n      </span>\n      <ng-template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\">\n      </ng-template>\n      <span\n        (click)=\"onSort()\"\n        [class]=\"sortClass\">\n      </span>\n    </div>\n  ",
            host: {
                class: 'datatable-header-cell'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}());
exports.DataTableHeaderCellComponent = DataTableHeaderCellComponent;


/***/ }),

/***/ "./src/components/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var DataTableHeaderComponent = /** @class */ (function () {
    function DataTableHeaderComponent(cd) {
        this.cd = cd;
        this.sort = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.columnContextmenu = new core_1.EventEmitter(false);
        this._styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            this._innerWidth = val;
            if (this._columns) {
                var colByPin = utils_1.columnsByPin(this._columns);
                this._columnGroupWidths = utils_1.columnGroupWidths(colByPin, this._columns);
                this.setStylesByGroup();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: function () {
            return this._headerHeight;
        },
        set: function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this._columnsByPin = utils_1.columnsByPinArr(val);
            this._columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
            this.setStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "offsetX", {
        get: function () { return this._offsetX; },
        set: function (val) {
            this._offsetX = val;
            this.setStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onLongPressStart = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    DataTableHeaderComponent.prototype.onLongPressEnd = function (_a) {
        var _this = this;
        var event = _a.event, model = _a.model;
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout(function () {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            var column = _this._columns.find(function (c) { return c.$$id === model.$$id; });
            if (column) {
                column.dragging = false;
            }
        }, 5);
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableHeaderComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        var column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onTargetChanged = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, initialIndex = _a.initialIndex;
        if (prevIndex || prevIndex === 0) {
            var oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            var newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = { class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft') };
            }
        }
    };
    DataTableHeaderComponent.prototype.getColumn = function (index) {
        var leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        var centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        // if we are dragging don't sort!
        if (column.dragging)
            return;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        var sorts = this.sorts.map(function (s, i) {
            s = __assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === types_1.SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.setStylesByGroup = function () {
        this._styleByGroup['left'] = this.calcStylesByGroup('left');
        this._styleByGroup['center'] = this.calcStylesByGroup('center');
        this._styleByGroup['right'] = this.calcStylesByGroup('right');
        this.cd.detectChanges();
    };
    DataTableHeaderComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this._columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "dealsWithGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableHeaderComponent.prototype, "innerWidth", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableHeaderComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "reorderable", void 0);
    __decorate([
        core_1.HostBinding('style.height'),
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableHeaderComponent.prototype, "headerHeight", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableHeaderComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableHeaderComponent.prototype, "offsetX", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "resize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "columnContextmenu", void 0);
    __decorate([
        core_1.HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DataTableHeaderComponent.prototype, "headerWidth", null);
    DataTableHeaderComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      (targetChanged)=\"onTargetChanged($event)\"\n      [style.width.px]=\"_columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of _columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"_styleByGroup[colGroup.type]\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [isTarget]=\"column.isTarget\"\n          [targetMarkerTemplate]=\"targetMarkerTemplate\"\n          [targetMarkerContext]=\"column.targetMarkerContext\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                class: 'datatable-header'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}());
exports.DataTableHeaderComponent = DataTableHeaderComponent;


/***/ }),

/***/ "./src/components/header/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/header/header.component.ts"));
__export(__webpack_require__("./src/components/header/header-cell.component.ts"));


/***/ }),

/***/ "./src/components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/datatable.component.ts"));
__export(__webpack_require__("./src/components/header/index.ts"));
__export(__webpack_require__("./src/components/body/index.ts"));
__export(__webpack_require__("./src/components/footer/index.ts"));
__export(__webpack_require__("./src/components/columns/index.ts"));
__export(__webpack_require__("./src/components/row-detail/index.ts"));


/***/ }),

/***/ "./src/components/row-detail/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/row-detail/row-detail.directive.ts"));
__export(__webpack_require__("./src/components/row-detail/row-detail-template.directive.ts"));


/***/ }),

/***/ "./src/components/row-detail/row-detail-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var DatatableRowDetailTemplateDirective = /** @class */ (function () {
    function DatatableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    DatatableRowDetailTemplateDirective = __decorate([
        core_1.Directive({
            selector: '[ngx-datatable-row-detail-template]'
        }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], DatatableRowDetailTemplateDirective);
    return DatatableRowDetailTemplateDirective;
}());
exports.DatatableRowDetailTemplateDirective = DatatableRowDetailTemplateDirective;


/***/ }),

/***/ "./src/components/row-detail/row-detail.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var row_detail_template_directive_1 = __webpack_require__("./src/components/row-detail/row-detail-template.directive.ts");
var DatatableRowDetailDirective = /** @class */ (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of the row
     */
    DatatableRowDetailDirective.prototype.toggleExpandRow = function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     */
    DatatableRowDetailDirective.prototype.expandAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     */
    DatatableRowDetailDirective.prototype.collapseAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableRowDetailDirective.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(row_detail_template_directive_1.DatatableRowDetailTemplateDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], DatatableRowDetailDirective.prototype, "template", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableRowDetailDirective.prototype, "toggle", void 0);
    DatatableRowDetailDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-row-detail' })
    ], DatatableRowDetailDirective);
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;


/***/ }),

/***/ "./src/datatable.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var ng2_dragula_1 = __webpack_require__("./node_modules/ng2-dragula/dist/fesm5/ng2-dragula.js");
var components_1 = __webpack_require__("./src/components/index.ts");
var directives_1 = __webpack_require__("./src/directives/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng2_dragula_1.DragulaModule
            ],
            providers: [
                services_1.ScrollbarHelper,
                services_1.DimensionsHelper,
                services_1.ColumnChangesService,
                ng2_dragula_1.DragulaService
            ],
            declarations: [
                components_1.DataTableFooterTemplateDirective,
                directives_1.VisibilityDirective,
                directives_1.DraggableDirective,
                directives_1.ResizeableDirective,
                directives_1.OrderableDirective,
                directives_1.LongPressDirective,
                components_1.ScrollerComponent,
                components_1.DatatableComponent,
                components_1.DataTableColumnDirective,
                components_1.DataTableHeaderComponent,
                components_1.DataTableHeaderCellComponent,
                components_1.DataTableBodyComponent,
                components_1.DataTableFooterComponent,
                components_1.DataTablePagerComponent,
                components_1.ProgressBarComponent,
                components_1.DataTableBodyRowComponent,
                components_1.DataTableRowWrapperComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DatatableGroupHeaderDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableBodyCellComponent,
                components_1.DataTableSelectionComponent,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective,
                components_1.DataTableColumnCellTreeToggle,
                components_1.DatatableFooterDirective,
                components_1.DatatableGroupHeaderTemplateDirective,
                components_1.DataTableSummaryRowComponent,
            ],
            exports: [
                components_1.DatatableComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DatatableGroupHeaderDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableColumnDirective,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective,
                components_1.DataTableColumnCellTreeToggle,
                components_1.DataTableFooterTemplateDirective,
                components_1.DatatableFooterDirective,
                components_1.DataTablePagerComponent,
                components_1.DatatableGroupHeaderTemplateDirective
            ]
        })
    ], NgxDatatableModule);
    return NgxDatatableModule;
}());
exports.NgxDatatableModule = NgxDatatableModule;


/***/ }),

/***/ "./src/directives/draggable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var rxjs_1 = __webpack_require__("rxjs");
var operators_1 = __webpack_require__("rxjs/operators");
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new core_1.EventEmitter();
        this.dragging = new core_1.EventEmitter();
        this.dragEnd = new core_1.EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    DraggableDirective.prototype.onMouseup = function (event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        // we only want to drag the inner header text
        var isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            var mouseup = rxjs_1.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(ev); });
            var mouseMoveSub = rxjs_1.fromEvent(document, 'mousemove')
                .pipe(operators_1.takeUntil(mouseup))
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.move = function (event, mouseDownPos) {
        if (!this.isDragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        this.element.classList.add('dragging');
        this.dragging.emit({
            event: event,
            element: this.element,
            model: this.dragModel
        });
    };
    DraggableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DraggableDirective.prototype, "dragEventTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DraggableDirective.prototype, "dragModel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DraggableDirective.prototype, "dragX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DraggableDirective.prototype, "dragY", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragging", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragEnd", void 0);
    DraggableDirective = __decorate([
        core_1.Directive({ selector: '[draggable]' }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DraggableDirective);
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;


/***/ }),

/***/ "./src/directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/directives/draggable.directive.ts"));
__export(__webpack_require__("./src/directives/long-press.directive.ts"));
__export(__webpack_require__("./src/directives/orderable.directive.ts"));
__export(__webpack_require__("./src/directives/resizeable.directive.ts"));
__export(__webpack_require__("./src/directives/visibility.directive.ts"));


/***/ }),

/***/ "./src/directives/long-press.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var rxjs_1 = __webpack_require__("rxjs");
var operators_1 = __webpack_require__("rxjs/operators");
var events_1 = __webpack_require__("./src/events.ts");
var LongPressDirective = /** @class */ (function () {
    function LongPressDirective() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new core_1.EventEmitter();
        this.longPressing = new core_1.EventEmitter();
        this.longPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "isLongPress", {
        get: function () {
            return this.isLongPressing;
        },
        enumerable: true,
        configurable: true
    });
    LongPressDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        var target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        var mouseup = rxjs_1.fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe(function (ev) { return _this.onMouseup(); });
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.longPressStart.emit({
                event: event,
                model: _this.pressModel
            });
            _this.subscription.add(rxjs_1.fromEvent(document, 'mousemove')
                .pipe(operators_1.takeUntil(mouseup))
                .subscribe(function (mouseEvent) { return _this.onMouseMove(mouseEvent); }));
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPressDirective.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.isLongPressing) {
            var xThres = Math.abs(event.clientX - this.mouseX) > 10;
            var yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressDirective.prototype.loop = function (event) {
        var _this = this;
        if (this.isLongPressing) {
            this.timeout = setTimeout(function () {
                _this.longPressing.emit({
                    event: event,
                    model: _this.pressModel
                });
                _this.loop(event);
            }, 50);
        }
    };
    LongPressDirective.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    };
    LongPressDirective.prototype.onMouseup = function () {
        this.endPress();
    };
    LongPressDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    LongPressDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LongPressDirective.prototype, "pressEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LongPressDirective.prototype, "pressModel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LongPressDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressing", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressEnd", void 0);
    __decorate([
        core_1.HostBinding('class.press'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "isLongPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    LongPressDirective = __decorate([
        core_1.Directive({ selector: '[long-press]' })
    ], LongPressDirective);
    return LongPressDirective;
}());
exports.LongPressDirective = LongPressDirective;


/***/ }),

/***/ "./src/directives/orderable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var draggable_directive_1 = __webpack_require__("./src/directives/draggable.directive.ts");
var platform_browser_1 = __webpack_require__("@angular/platform-browser");
var OrderableDirective = /** @class */ (function () {
    function OrderableDirective(differs, document) {
        this.document = document;
        this.reorder = new core_1.EventEmitter();
        this.targetChanged = new core_1.EventEmitter();
        this.differ = differs.find({}).create();
    }
    OrderableDirective.prototype.ngAfterContentInit = function () {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    };
    OrderableDirective.prototype.ngOnDestroy = function () {
        this.draggables.forEach(function (d) {
            d.dragStart.unsubscribe();
            d.dragging.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    };
    OrderableDirective.prototype.updateSubscriptions = function () {
        var _this = this;
        var diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            var subscribe = function (_a) {
                var currentValue = _a.currentValue, previousValue = _a.previousValue;
                unsubscribe_1({ previousValue: previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(_this.onDragStart.bind(_this));
                    currentValue.dragging.subscribe(_this.onDragging.bind(_this));
                    currentValue.dragEnd.subscribe(_this.onDragEnd.bind(_this));
                }
            };
            var unsubscribe_1 = function (_a) {
                var previousValue = _a.previousValue;
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragging.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe.bind(this));
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe_1.bind(this));
        }
    };
    OrderableDirective.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.draggables.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            var left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left: left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    };
    OrderableDirective.prototype.onDragging = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.targetChanged.emit({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.targetChanged.emit({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    };
    OrderableDirective.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model: model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    };
    OrderableDirective.prototype.isTarget = function (model, event) {
        var i = 0;
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
        var targets = this.document.elementsFromPoint(x, y);
        var _loop_1 = function (prop) {
            // current column position which throws event.
            var pos = this_1.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find(function (el) { return el === pos.element; })) {
                return { value: {
                        pos: pos,
                        i: i
                    } };
            }
            i++;
        };
        var this_1 = this;
        for (var prop in this.positions) {
            var state_1 = _loop_1(prop);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    OrderableDirective.prototype.createMapDiffs = function () {
        return this.draggables.toArray()
            .reduce(function (acc, curr) {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OrderableDirective.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OrderableDirective.prototype, "targetChanged", void 0);
    __decorate([
        core_1.ContentChildren(draggable_directive_1.DraggableDirective, { descendants: true }),
        __metadata("design:type", core_1.QueryList)
    ], OrderableDirective.prototype, "draggables", void 0);
    OrderableDirective = __decorate([
        core_1.Directive({ selector: '[orderable]' }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [core_1.KeyValueDiffers, Object])
    ], OrderableDirective);
    return OrderableDirective;
}());
exports.OrderableDirective = OrderableDirective;


/***/ }),

/***/ "./src/directives/resizeable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var rxjs_1 = __webpack_require__("rxjs");
var events_1 = __webpack_require__("./src/events.ts");
var operators_1 = __webpack_require__("rxjs/operators");
var ResizeableDirective = /** @class */ (function () {
    function ResizeableDirective(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new core_1.EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ResizeableDirective.prototype.ngAfterViewInit = function () {
        var renderer2 = this.renderer;
        var node = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(node, 'resize-handle');
        }
        else {
            renderer2.addClass(node, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, node);
    };
    ResizeableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    };
    ResizeableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = (event.target).classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            var mouseup = rxjs_1.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(); });
            var mouseMoveSub = rxjs_1.fromEvent(document, 'mousemove')
                .pipe(operators_1.takeUntil(mouseup))
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
            this.subscription.add(mouseMoveSub);
        }
    };
    ResizeableDirective.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    ResizeableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ResizeableDirective.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ResizeableDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ResizeableDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ResizeableDirective.prototype, "resize", void 0);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ResizeableDirective.prototype, "onMousedown", null);
    ResizeableDirective = __decorate([
        core_1.Directive({
            selector: '[resizeable]',
            host: {
                '[class.resizeable]': 'resizeEnabled'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], ResizeableDirective);
    return ResizeableDirective;
}());
exports.ResizeableDirective = ResizeableDirective;


/***/ }),

/***/ "./src/directives/visibility.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = /** @class */ (function () {
    function VisibilityDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
    }
    VisibilityDirective.prototype.ngOnInit = function () {
        this.runCheck();
    };
    VisibilityDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityDirective.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityDirective.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 50);
                });
            }
        };
        this.timeout = setTimeout(function () { return check(); });
    };
    __decorate([
        core_1.HostBinding('class.visible'),
        __metadata("design:type", Boolean)
    ], VisibilityDirective.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VisibilityDirective.prototype, "visible", void 0);
    VisibilityDirective = __decorate([
        core_1.Directive({ selector: '[visibilityObserver]' }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
    ], VisibilityDirective);
    return VisibilityDirective;
}());
exports.VisibilityDirective = VisibilityDirective;


/***/ }),

/***/ "./src/events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
exports.MouseEvent = ((typeof window !== 'undefined' && window) || global).MouseEvent;
exports.KeyboardEvent = ((typeof window !== 'undefined' && window) || global).KeyboardEvent;
exports.Event = ((typeof window !== 'undefined' && window) || global).Event;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/datatable.module.ts"));
__export(__webpack_require__("./src/types/index.ts"));
__export(__webpack_require__("./src/components/index.ts"));
__export(__webpack_require__("./src/services/index.ts"));


/***/ }),

/***/ "./src/services/column-changes.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var rxjs_1 = __webpack_require__("rxjs");
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
var ColumnChangesService = /** @class */ (function () {
    function ColumnChangesService() {
        this.columnInputChanges = new rxjs_1.Subject();
    }
    Object.defineProperty(ColumnChangesService.prototype, "columnInputChanges$", {
        get: function () {
            return this.columnInputChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ColumnChangesService.prototype.onInputChange = function () {
        this.columnInputChanges.next();
    };
    ColumnChangesService = __decorate([
        core_1.Injectable()
    ], ColumnChangesService);
    return ColumnChangesService;
}());
exports.ColumnChangesService = ColumnChangesService;


/***/ }),

/***/ "./src/services/dimensions-helper.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var DimensionsHelper = /** @class */ (function () {
    function DimensionsHelper() {
    }
    DimensionsHelper.prototype.getDimensions = function (element) {
        return element.getBoundingClientRect();
    };
    DimensionsHelper = __decorate([
        core_1.Injectable()
    ], DimensionsHelper);
    return DimensionsHelper;
}());
exports.DimensionsHelper = DimensionsHelper;


/***/ }),

/***/ "./src/services/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/services/scrollbar-helper.service.ts"));
__export(__webpack_require__("./src/services/dimensions-helper.service.ts"));
__export(__webpack_require__("./src/services/column-changes.service.ts"));


/***/ }),

/***/ "./src/services/scrollbar-helper.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var platform_browser_1 = __webpack_require__("@angular/platform-browser");
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var ScrollbarHelper = /** @class */ (function () {
    function ScrollbarHelper(document) {
        this.document = document;
        this.width = this.getWidth();
    }
    ScrollbarHelper.prototype.getWidth = function () {
        var outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    ScrollbarHelper = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], ScrollbarHelper);
    return ScrollbarHelper;
}());
exports.ScrollbarHelper = ScrollbarHelper;


/***/ }),

/***/ "./src/types/click.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClickType;
(function (ClickType) {
    ClickType["single"] = "single";
    ClickType["double"] = "double";
})(ClickType = exports.ClickType || (exports.ClickType = {}));


/***/ }),

/***/ "./src/types/column-mode.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColumnMode;
(function (ColumnMode) {
    ColumnMode["standard"] = "standard";
    ColumnMode["flex"] = "flex";
    ColumnMode["force"] = "force";
})(ColumnMode = exports.ColumnMode || (exports.ColumnMode = {}));


/***/ }),

/***/ "./src/types/contextmenu.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContextmenuType;
(function (ContextmenuType) {
    ContextmenuType["header"] = "header";
    ContextmenuType["body"] = "body";
})(ContextmenuType = exports.ContextmenuType || (exports.ContextmenuType = {}));


/***/ }),

/***/ "./src/types/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/types/column-mode.type.ts"));
__export(__webpack_require__("./src/types/sort.type.ts"));
__export(__webpack_require__("./src/types/sort-direction.type.ts"));
__export(__webpack_require__("./src/types/selection.type.ts"));
__export(__webpack_require__("./src/types/click.type.ts"));
__export(__webpack_require__("./src/types/contextmenu.type.ts"));


/***/ }),

/***/ "./src/types/selection.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType = exports.SelectionType || (exports.SelectionType = {}));


/***/ }),

/***/ "./src/types/sort-direction.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));


/***/ }),

/***/ "./src/types/sort.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortType;
(function (SortType) {
    SortType["single"] = "single";
    SortType["multi"] = "multi";
})(SortType = exports.SortType || (exports.SortType = {}));


/***/ }),

/***/ "./src/utils/camel-case.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 */
function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, function (match) { return " " + match; })
        .replace(/^./, function (match) { return match.toUpperCase(); });
}
exports.deCamelCase = deCamelCase;


/***/ }),

/***/ "./src/utils/column-helper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var column_prop_getters_1 = __webpack_require__("./src/utils/column-prop-getters.ts");
/**
 * Sets the column defaults
 */
function setColumnDefaults(columns) {
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    var treeColumnFound = false;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        if (!column.$$id) {
            column.$$id = id_1.id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (isNullOrUndefined(column.prop) && column.name) {
            column.prop = camel_case_1.camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = column_prop_getters_1.getterForProp(column.prop);
        }
        // format props if no name passed
        if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = camel_case_1.deCamelCase(String(column.prop));
        }
        if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = ''; // Fixes IE and Edge displaying `null`
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
        if (!column.hasOwnProperty('isTreeColumn')) {
            column.isTreeColumn = false;
        }
        else {
            if (column.isTreeColumn && !treeColumnFound) {
                // If the first column with isTreeColumn is true found
                // we mark that treeCoulmn is found
                treeColumnFound = true;
            }
            else {
                // After that isTreeColumn property for any other column
                // will be set as false
                column.isTreeColumn = false;
            }
        }
    }
}
exports.setColumnDefaults = setColumnDefaults;
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * Translates templates definitions to objects
 */
function translateTemplates(templates) {
    var result = [];
    for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
        var temp = templates_1[_i];
        var col = {};
        var props = Object.getOwnPropertyNames(temp);
        for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {
            var prop = props_1[_a];
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        if (temp.summaryFunc) {
            col.summaryFunc = temp.summaryFunc;
        }
        if (temp.summaryTemplate) {
            col.summaryTemplate = temp.summaryTemplate;
        }
        result.push(col);
    }
    return result;
}
exports.translateTemplates = translateTemplates;


/***/ }),

/***/ "./src/utils/column-prop-getters.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// maybe rename this file to prop-getters.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Always returns the empty string ''
 * @returns {string}
 */
function emptyStringGetter() {
    return '';
}
exports.emptyStringGetter = emptyStringGetter;
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
function getterForProp(prop) {
    if (prop == null)
        return emptyStringGetter;
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
exports.getterForProp = getterForProp;
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
function numericIndexGetter(row, index) {
    if (row == null)
        return '';
    // mimic behavior of deepValueGetter
    if (!row || index == null)
        return row;
    var value = row[index];
    if (value == null)
        return '';
    return value;
}
exports.numericIndexGetter = numericIndexGetter;
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
function shallowValueGetter(obj, fieldName) {
    if (obj == null)
        return '';
    if (!obj || !fieldName)
        return obj;
    var value = obj[fieldName];
    if (value == null)
        return '';
    return value;
}
exports.shallowValueGetter = shallowValueGetter;
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (obj == null)
        return '';
    if (!obj || !path)
        return obj;
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    var current = obj[path];
    if (current !== undefined)
        return current;
    current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;


/***/ }),

/***/ "./src/utils/column.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the columns by pin.
 */
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
exports.columnsByPin = columnsByPin;
/**
 * Returns the widths of all group sets of a column
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: Math.floor(columnTotalWidth(all))
    };
}
exports.columnGroupWidths = columnGroupWidths;
/**
 * Calculates the total width of all columns and their groups
 */
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            var has = prop && c[prop];
            var width = has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
/**
 * Calculates the total width of all columns and their groups
 */
function columnsTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var column = columns_2[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
exports.columnsTotalWidth = columnsTotalWidth;
function columnsByPinArr(val) {
    var colsByPinArr = [];
    var colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
exports.columnsByPinArr = columnsByPinArr;


/***/ }),

/***/ "./src/utils/elm-from-point.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
if (typeof document !== 'undefined' && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
function elementsFromPoint(x, y) {
    var elements = [];
    var previousPointerEvents = [];
    var current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    var i;
    var d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
exports.elementsFromPoint = elementsFromPoint;
/*tslint:enable*/


/***/ }),

/***/ "./src/utils/id.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;


/***/ }),

/***/ "./src/utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/utils/id.ts"));
__export(__webpack_require__("./src/utils/column.ts"));
__export(__webpack_require__("./src/utils/column-prop-getters.ts"));
__export(__webpack_require__("./src/utils/camel-case.ts"));
__export(__webpack_require__("./src/utils/keys.ts"));
__export(__webpack_require__("./src/utils/math.ts"));
__export(__webpack_require__("./src/utils/prefixes.ts"));
__export(__webpack_require__("./src/utils/selection.ts"));
__export(__webpack_require__("./src/utils/translate.ts"));
__export(__webpack_require__("./src/utils/throttle.ts"));
__export(__webpack_require__("./src/utils/sort.ts"));
__export(__webpack_require__("./src/utils/row-height-cache.ts"));
__export(__webpack_require__("./src/utils/column-helper.ts"));
__export(__webpack_require__("./src/utils/elm-from-point.ts"));
__export(__webpack_require__("./src/utils/tree.ts"));


/***/ }),

/***/ "./src/utils/keys.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
})(Keys = exports.Keys || (exports.Keys = {}));


/***/ }),

/***/ "./src/utils/math.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = __webpack_require__("./src/utils/column.ts");
/**
 * Calculates the Total Flex Grow
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
exports.getTotalFlexGrow = getTotalFlexGrow;
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = column_1.columnsTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
exports.adjustColumnWidths = adjustColumnWidths;
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var columnsToResize = allColumns
        .slice(startIdx + 1, allColumns.length)
        .filter(function (c) {
        return c.canAutoResize !== false;
    });
    for (var _i = 0, columnsToResize_1 = columnsToResize; _i < columnsToResize_1.length; _i++) {
        var column = columnsToResize_1[_i];
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
    }
    var additionWidthPerColumn = 0;
    var exceedsWindow = false;
    var contentWidth = getContentWidth(allColumns, defaultColWidth);
    var remainingWidth = expectedWidth - contentWidth;
    var columnsProcessed = [];
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (var _a = 0, columnsToResize_2 = columnsToResize; _a < columnsToResize_2.length; _a++) {
            var column = columnsToResize_2[_a];
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                var newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > 0 && columnsToResize.length !== 0);
}
exports.forceFillColumnWidths = forceFillColumnWidths;
/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (var _i = 0, columnsProcessed_1 = columnsProcessed; _i < columnsProcessed_1.length; _i++) {
        var column = columnsProcessed_1[_i];
        var index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var contentWidth = 0;
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        contentWidth += (column.width || defaultColWidth);
    }
    return contentWidth;
}


/***/ }),

/***/ "./src/utils/prefixes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
var cache = {};
var testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = function () {
    var styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    var match = typeof styles !== 'undefined' ?
        Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) : null;
    var pre = match !== null ? match[1] : undefined;
    var dom = typeof pre !== 'undefined' ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
}();
function getVendorPrefixedName(property) {
    var name = camel_case_1.camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
exports.getVendorPrefixedName = getVendorPrefixedName;


/***/ }),

/***/ "./src/utils/row-height-cache.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = /** @class */ (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this.treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    RowHeightCache.prototype.clearCache = function () {
        this.treeArray = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    RowHeightCache.prototype.initCache = function (details) {
        var rows = details.rows, rowHeight = details.rowHeight, detailRowHeight = details.detailRowHeight, externalVirtual = details.externalVirtual, rowCount = details.rowCount, rowIndexes = details.rowIndexes, rowExpansions = details.rowExpansions;
        var isFn = typeof rowHeight === 'function';
        var isDetailFn = typeof detailRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(detailRowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number or function value: (" + detailRowHeight + ") when 'scrollbarV' is enabled.");
        }
        var n = externalVirtual ? rowCount : rows.length;
        this.treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            var row = rows[i];
            var currentRowHeight = rowHeight;
            if (isFn) {
                currentRowHeight = rowHeight(row);
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            var expanded = rowExpansions.get(row);
            if (row && expanded === 1) {
                if (isDetailFn) {
                    var index = rowIndexes.get(row);
                    currentRowHeight += detailRowHeight(row, index);
                }
                else {
                    currentRowHeight += detailRowHeight;
                }
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    RowHeightCache.prototype.update = function (atRowIndex, byRowHeight) {
        if (!this.treeArray.length) {
            throw new Error("Update at index " + atRowIndex + " with value " + byRowHeight + " failed:\n        Row Height cache not initialized.");
        }
        var n = this.treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this.treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= (atRowIndex + 1);
        }
    };
    /**
     * Range Sum query from 1 to the rowIndex
     */
    RowHeightCache.prototype.query = function (atIndex) {
        if (!this.treeArray.length) {
            throw new Error("query at index " + atIndex + " failed: Fenwick tree array not initialized.");
        }
        var sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this.treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    };
    /**
     * Find the total height between 2 row indexes
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    RowHeightCache.prototype.calcRowIndex = function (sum) {
        if (!this.treeArray.length)
            return 0;
        var pos = -1;
        var dataLength = this.treeArray.length;
        // Get the highest bit for the block size.
        var highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (var blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            var nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
                sum -= this.treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    };
    return RowHeightCache;
}());
exports.RowHeightCache = RowHeightCache;


/***/ }),

/***/ "./src/utils/selection.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function selectRows(selected, row, comparefn) {
    var selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;


/***/ }),

/***/ "./src/utils/sort.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__("./src/types/index.ts");
var column_prop_getters_1 = __webpack_require__("./src/utils/column-prop-getters.ts");
/**
 * Gets the next sort direction
 */
function nextSortDir(sortType, current) {
    if (sortType === types_1.SortType.single) {
        if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else {
            return types_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return types_1.SortDirection.asc;
        }
        else if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else if (current === types_1.SortDirection.desc) {
            return undefined;
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
}
exports.nextSortDir = nextSortDir;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
exports.orderByComparator = orderByComparator;
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return rows.slice();
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     */
    var rowToIndexMap = new Map();
    rows.forEach(function (row, index) { return rowToIndexMap.set(row, index); });
    var temp = rows.slice();
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    var cachedDirs = dirs.map(function (dir) {
        var prop = dir.prop;
        return {
            prop: prop,
            dir: dir.dir,
            valueGetter: column_prop_getters_1.getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (rowA, rowB) {
        for (var _i = 0, cachedDirs_1 = cachedDirs; _i < cachedDirs_1.length; _i++) {
            var cachedDir = cachedDirs_1[_i];
            // Get property and valuegetters for column to be sorted
            var prop = cachedDir.prop, valueGetter = cachedDir.valueGetter;
            // Get A and B cell values from rows based on properties of the columns
            var propA = valueGetter(rowA, prop);
            var propB = valueGetter(rowB, prop);
            // Compare function gets five parameters:
            // Two cell values to be compared as propA and propB
            // Two rows corresponding to the cells as rowA and rowB
            // Direction of the sort for this column as SortDirection
            // Compare can be a standard JS comparison function (a,b) => -1|0|1
            // as additional parameters are silently ignored. The whole row and sort
            // direction enable more complex sort logic.
            var comparison = cachedDir.dir !== types_1.SortDirection.desc ?
                cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir) :
                -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    });
}
exports.sortRows = sortRows;


/***/ }),

/***/ "./src/utils/throttle.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Throttle a function
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
exports.throttleable = throttleable;


/***/ }),

/***/ "./src/utils/translate.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var prefixes_1 = __webpack_require__("./src/utils/prefixes.ts");
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
// browser detection and prefixing tools
var transform = typeof window !== 'undefined' ? prefixes_1.getVendorPrefixedName('transform') : undefined;
var backfaceVisibility = typeof window !== 'undefined' ? prefixes_1.getVendorPrefixedName('backfaceVisibility') : undefined;
var hasCSSTransforms = typeof window !== 'undefined' ? !!prefixes_1.getVendorPrefixedName('transform') : undefined;
var hasCSS3DTransforms = typeof window !== 'undefined' ? !!prefixes_1.getVendorPrefixedName('perspective') : undefined;
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camel_case_1.camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}
exports.translateXY = translateXY;


/***/ }),

/***/ "./src/utils/tree.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__("./src/utils/index.ts");
function optionalGetterForProp(prop) {
    return prop && (function (row) { return _1.getterForProp(prop)(row, prop); });
}
exports.optionalGetterForProp = optionalGetterForProp;
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
function groupRowsByParents(rows, from, to) {
    if (from && to) {
        var nodeById = {};
        var l = rows.length;
        var node = null;
        nodeById[0] = new TreeNode(); // that's the root node
        var uniqIDs = rows.reduce(function (arr, item) {
            var toValue = to(item);
            if (arr.indexOf(toValue) === -1) {
                arr.push(toValue);
            }
            return arr;
        }, []);
        for (var i = 0; i < l; i++) {
            nodeById[to(rows[i])] = new TreeNode(rows[i]);
        }
        for (var i = 0; i < l; i++) {
            node = nodeById[to(rows[i])];
            var parent_1 = 0;
            var fromValue = from(node.row);
            if (!!fromValue && (uniqIDs.indexOf(fromValue) > -1)) {
                parent_1 = fromValue;
            }
            node.parent = nodeById[parent_1];
            node.row['level'] = node.parent.row['level'] + 1;
            node.parent.children.push(node);
        }
        var resolvedRows_1 = [];
        nodeById[0].flatten(function () {
            resolvedRows_1 = resolvedRows_1.concat([this.row]);
        }, true);
        return resolvedRows_1;
    }
    else {
        return rows;
    }
}
exports.groupRowsByParents = groupRowsByParents;
var TreeNode = /** @class */ (function () {
    function TreeNode(row) {
        if (row === void 0) { row = null; }
        if (!row) {
            row = {
                level: -1,
                treeStatus: 'expanded'
            };
        }
        this.row = row;
        this.parent = null;
        this.children = [];
    }
    TreeNode.prototype.flatten = function (f, recursive) {
        if (this.row['treeStatus'] === 'expanded') {
            for (var i = 0, l = this.children.length; i < l; i++) {
                var child = this.children[i];
                f.apply(child, Array.prototype.slice.call(arguments, 2));
                if (recursive)
                    child.flatten.apply(child, arguments);
            }
        }
    };
    return TreeNode;
}());


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ }),

/***/ "@angular/platform-browser":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_platform_browser__;

/***/ }),

/***/ "rxjs":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

/***/ }),

/***/ "rxjs/operators":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_operators__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map