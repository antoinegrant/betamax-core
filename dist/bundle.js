(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _betamaxCore = __webpack_require__(1);
	
	var _betamaxCore2 = _interopRequireDefault(_betamaxCore);
	
	var _betamaxDom = __webpack_require__(2);
	
	var _betamaxDom2 = _interopRequireDefault(_betamaxDom);
	
	var _betamaxFoo = __webpack_require__(3);
	
	var _betamaxFoo2 = _interopRequireDefault(_betamaxFoo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var betamaxCore = new _betamaxCore2.default({
	  renderer: new _betamaxDom2.default(document.querySelector('#betamax-foo'))
	});
	
	betamaxCore.render();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BetaMaxCore = function () {
	  function BetaMaxCore(options) {
	    var _this = this;
	
	    _classCallCheck(this, BetaMaxCore);
	
	    this.onBeforeLoad = function (eventName, evt) {
	      console.log('Get the event in core', evt.type);
	      _this.renderer.onLoadMedia();
	    };
	
	    this.onPlay = function (eventName, evt) {
	      return console.log('Get the event in core', evt.type);
	    };
	
	    this.onPause = function (eventName, evt) {
	      return console.log('Get the event in core', evt.type);
	    };
	
	    this.onProgress = function (eventName, evt) {
	      return console.log('Get the event in core', evt.type);
	    };
	
	    this.renderer = options.renderer;
	  }
	
	  _createClass(BetaMaxCore, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.renderer.on(this.renderer.events.BEFORE_LOAD, this.onBeforeLoad);
	      this.renderer.on(this.renderer.events.PLAY, this.onPlay);
	      this.renderer.on(this.renderer.events.PAUSE, this.onPause);
	      this.renderer.on(this.renderer.events.PROGRESS, this.onProgress);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.bindEvents();
	      this.renderer.render();
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return VHSCore.version;
	    }
	  }, {
	    key: 'renderer',
	    get: function get() {
	      return this._renderer;
	    },
	    set: function set(renderer) {
	      if (!renderer.type || renderer.type === '' || typeof renderer.render !== 'function') {
	        throw new Error('The renderer signature is not conform.');
	      }
	      return this._renderer = renderer;
	    }
	  }]);
	
	  return BetaMaxCore;
	}();
	
	BetaMaxCore.version = '3.0.0';
	exports.default = BetaMaxCore;
	exports.BetaMaxCore = BetaMaxCore;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BetaMaxDom = function () {
	  function BetaMaxDom($el) {
	    _classCallCheck(this, BetaMaxDom);
	
	    this.$media = $el;
	  }
	
	  _createClass(BetaMaxDom, [{
	    key: 'on',
	    value: function on(eventName, callback) {
	      this.eventsListeners = this.eventsListeners || {};
	      this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
	      this.eventsListeners[eventName].push(callback);
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(eventName, evt) {
	      this.eventsListeners = this.eventsListeners || {};
	      if (this.eventsListeners[eventName]) {
	        this.eventsListeners[eventName].forEach(function (callback) {
	          return callback(eventName, {
	            type: evt.type,
	            timeStamp: evt.timeStamp
	          });
	        });
	      }
	    }
	  }, {
	    key: 'bindMediaEvents',
	    value: function bindMediaEvents() {
	      var _this = this;
	
	      this.$media.addEventListener('play', function (evt) {
	        return _this.trigger(_this.events.PLAY, evt);
	      });
	      this.$media.addEventListener('pause', function (evt) {
	        return _this.trigger(_this.events.PAUSE, evt);
	      });
	      this.$media.addEventListener('progress', function (evt) {
	        return _this.trigger(_this.events.PROGRESS, evt);
	      });
	    }
	  }, {
	    key: 'onLoadMedia',
	    value: function onLoadMedia() {
	      console.log('onLoadMedia');
	      this.$media.setAttribute('src', 'https://vp.nyt.com/video/2015/07/07/33763_1_out-there-pluto_wg_480p.mp4');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.trigger(this.events.BEFORE_LOAD, {
	        type: 'vhs-dom-custom'
	      });
	      this.bindMediaEvents();
	      this.$media.setAttribute('controls', true);
	      return this;
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return BetaMaxDom.version;
	    }
	  }, {
	    key: 'type',
	    get: function get() {
	      return BetaMaxDom.type;
	    }
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        BEFORE_LOAD: 'before_load',
	        PLAY: 'play',
	        PAUSE: 'pause',
	        PROGRESS: 'progress'
	      };
	    }
	  }]);
	
	  return BetaMaxDom;
	}();
	
	BetaMaxDom.version = '3.0.0';
	BetaMaxDom.type = 'DOM';
	exports.default = BetaMaxDom;
	exports.BetaMaxDom = BetaMaxDom;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MediaFoo = {
	  addEventListener: function addEventListener(eventName, callback) {
	    this.eventsListeners = this.eventsListeners || {};
	    this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
	    this.eventsListeners[eventName].push(callback);
	  },
	  trigger: function trigger(eventName, evt) {
	    this.eventsListeners = this.eventsListeners || {};
	    this.eventsListeners[eventName].forEach(function (callback) {
	      return callback(evt);
	    });
	  },
	  render: function render($media) {
	    var _this = this;
	
	    $media.setAttribute('style', ['background-color: #ccc', 'width: 200px', 'height: 100px'].join(';'));
	
	    var state = 'pause';
	    $media.addEventListener('click', function () {
	      state = state === 'pause' ? 'play' : 'pause';
	      _this.trigger(state, {
	        type: state,
	        timeStamp: 1
	      });
	      $media.innerHTML = state;
	    });
	
	    return $media;
	  }
	};
	
	var BetaMaxFoo = function () {
	  function BetaMaxFoo($el) {
	    _classCallCheck(this, BetaMaxFoo);
	
	    this.$el = $el;
	  }
	
	  _createClass(BetaMaxFoo, [{
	    key: 'on',
	    value: function on(eventName, callback) {
	      this.eventsListeners = this.eventsListeners || {};
	      this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
	      this.eventsListeners[eventName].push(callback);
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(eventName, evt) {
	      this.eventsListeners[eventName].forEach(function (callback) {
	        return callback(eventName, {
	          type: evt.type,
	          timeStamp: evt.timeStamp
	        });
	      });
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this2 = this;
	
	      this.$media.addEventListener('play', function (evt) {
	        return _this2.trigger(_this2.events.PLAY, evt);
	      });
	      this.$media.addEventListener('pause', function (evt) {
	        return _this2.trigger(_this2.events.PAUSE, evt);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var $media = MediaFoo.render(this.$el);
	      this.$media = MediaFoo;
	
	      this.bindEvents();
	
	      return this;
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return VHSFoo.version;
	    }
	  }, {
	    key: 'type',
	    get: function get() {
	      return VHSFoo.type;
	    }
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        PLAY: 'play',
	        PAUSE: 'pause'
	      };
	    }
	  }]);
	
	  return BetaMaxFoo;
	}();
	
	BetaMaxFoo.version = '3.0.0';
	BetaMaxFoo.type = 'FOO';
	exports.default = BetaMaxFoo;
	exports.BetaMaxFoo = BetaMaxFoo;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map