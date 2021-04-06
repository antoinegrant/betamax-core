(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './betamax-media-api'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./betamax-media-api'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.betamaxMediaApi);
    global.betamaxCore = mod.exports;
  }
})(this, function (exports, _betamaxMediaApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxCoreFactory = exports.default = undefined;

  var _betamaxMediaApi2 = _interopRequireDefault(_betamaxMediaApi);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var BetaMaxCore = function () {
    function BetaMaxCore(_ref) {
      var _this = this;

      var $mediaObj = _ref.$mediaObj;

      _classCallCheck(this, BetaMaxCore);

      this.play = function () {
        return _this.mediaAPI.play();
      };

      this.pause = function () {
        return _this.mediaAPI.pause();
      };

      this.volume = function (value) {
        return _this.mediaAPI.volume(value);
      };

      this.mute = function () {
        return _this.mediaAPI.mute();
      };

      this.seek = function (value) {
        return _this.mediaAPI.seek(value);
      };

      this.requestFullscreen = function () {
        return _this.mediaAPI.requestFullscreen();
      };

      this.exitFullscreen = function () {
        return _this.mediaAPI.exitFullscreen();
      };

      this.addEventListener = function (eventName, callback) {
        if (typeof callback === 'function') {
          _this.eventsListeners[eventName] = _this.eventsListeners[eventName] || [];
          _this.eventsListeners[eventName].push(callback);
        }
      };

      this.removeEventListener = function (eventName, callback) {
        if (_this.eventsListeners[eventName]) {
          delete _this.eventsListeners[eventName];
        }
      };

      this.useEventMiddleware = function (eventMiddleware) {
        _this.eventMiddlewares.push(eventMiddleware);
      };

      // validate the options
      this.eventsListeners = this.eventsListeners || {};
      this.eventMiddlewares = this.eventMiddlewares || [];
      this.mediaAPI = this.mediaAPI($mediaObj);
      this.bindEvents();
    }

    _createClass(BetaMaxCore, [{
      key: 'mediaAPI',
      value: function mediaAPI($mediaObj) {
        return new _betamaxMediaApi2.default({ $mediaObj: $mediaObj, events: this.events });
      }
    }, {
      key: 'bindEvents',
      value: function bindEvents() {
        var _this2 = this;

        this.mediaAPI.addEventListener(this.events.PLAY, function (evt) {
          return _this2.trigger(_this2.events.PLAY, evt);
        });
        this.mediaAPI.addEventListener(this.events.PAUSE, function (evt) {
          return _this2.trigger(_this2.events.PAUSE, evt);
        });
        this.mediaAPI.addEventListener(this.events.STOP, function (evt) {
          return _this2.trigger(_this2.events.STOP, evt);
        });
        this.mediaAPI.addEventListener(this.events.TIME_UPDATE, function (evt) {
          return _this2.trigger(_this2.events.TIME_UPDATE, evt);
        });
        this.mediaAPI.addEventListener(this.events.VOLUME_CHANGE, function (evt) {
          return _this2.trigger(_this2.events.VOLUME_CHANGE, evt);
        });
        this.mediaAPI.addEventListener(this.events.LOADED_DATA, function (evt) {
          return _this2.trigger(_this2.events.LOADED_DATA, evt);
        });
      }
    }, {
      key: 'trigger',
      value: function trigger(eventName, eventObj) {
        var _this3 = this;

        if (this.eventsListeners[eventName]) {
          this.eventsListeners[eventName].forEach(function (callback) {
            return callback(eventObj);
          });
        }

        this.eventMiddlewares.forEach(function (eventMiddleware) {
          return eventMiddleware({
            type: eventObj.type,
            api: _this3.api,
            state: _this3.mediaAPI.state
          });
        });

        if (this.eventsListeners.stateChange.length > 0 && typeof this.eventsListeners.stateChange[0] === 'function') {
          this.eventsListeners.stateChange[0](this.mediaAPI.state);
        }
      }
    }, {
      key: 'api',
      get: function get() {
        return {
          addEventListener: this.addEventListener,
          removeEventListener: this.removeEventListener,
          play: this.play,
          pause: this.pause,
          volume: this.volume,
          mute: this.mute,
          seek: this.seek,
          requestFullscreen: this.requestFullscreen,
          useEventMiddleware: this.useEventMiddleware
        };
      }
    }, {
      key: 'events',
      get: function get() {
        return {
          BEFORE_LOAD: 'before_load',
          PLAY: 'play',
          PAUSE: 'pause',
          TIME_UPDATE: 'timeupdate',
          ENDED: 'ended',
          VOLUME_CHANGE: 'volumechange',
          PROGRESS: 'progress'
        };
      }
    }]);

    return BetaMaxCore;
  }();

  var BetaMaxCoreFactory = function BetaMaxCoreFactory(options) {
    return new BetaMaxCore(options).api;
  };

  exports.default = BetaMaxCoreFactory;
  exports.BetaMaxCoreFactory = BetaMaxCoreFactory;
});