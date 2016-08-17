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
      var $mediaObj = _ref.$mediaObj;

      _classCallCheck(this, BetaMaxCore);

      // validate the options
      this.eventsListeners = this.eventsListeners || {};
      this.mediaAPI = this.mediaAPI($mediaObj);
      this.bindEvents();
    }

    _createClass(BetaMaxCore, [{
      key: 'mediaAPI',
      value: function mediaAPI($mediaObj) {
        var type = void 0;
        switch ($mediaObj.tagName.toLowerCase()) {
          case 'audio':
            type = 'audio';
            break;
          default:
            type = 'video';
        }
        return new _betamaxMediaApi2.default({ type: type, $mediaObj: $mediaObj, events: this.events });
      }
    }, {
      key: 'bindEvents',
      value: function bindEvents() {
        var _this = this;

        this.mediaAPI.addEventListener(this.events.PLAY, function (evt) {
          return _this.trigger(_this.events.PLAY, evt);
        });
        this.mediaAPI.addEventListener(this.events.PAUSE, function (evt) {
          return _this.trigger(_this.events.PAUSE, evt);
        });
        this.mediaAPI.addEventListener(this.events.STOP, function (evt) {
          return _this.trigger(_this.events.STOP, evt);
        });
        this.mediaAPI.addEventListener(this.events.TIME_UPDATE, function (evt) {
          return _this.trigger(_this.events.TIME_UPDATE, evt);
        });
        this.mediaAPI.addEventListener(this.events.VOLUME_CHANGE, function (evt) {
          return _this.trigger(_this.events.VOLUME_CHANGE, evt);
        });
        this.mediaAPI.addEventListener(this.events.LOADED_DATA, function (evt) {
          return _this.trigger(_this.events.LOADED_DATA, evt);
        });
      }
    }, {
      key: 'addEventListener',
      value: function addEventListener(eventName, callback) {
        if (typeof callback === 'function') {
          this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
          this.eventsListeners[eventName].push(callback);
        }
      }
    }, {
      key: 'removeEventListener',
      value: function removeEventListener(eventName, callback) {
        if (this.eventsListeners[eventName]) {
          delete this.eventsListeners[eventName];
        }
      }
    }, {
      key: 'trigger',
      value: function trigger(eventName, evt) {
        var _this2 = this;

        if (this.eventsListeners[eventName]) {
          (function () {
            var eventObj = {
              type: evt.type,
              currentTime: _this2.mediaAPI.state.currentTime,
              volume: _this2.mediaAPI.state.volume
            };
            _this2.eventsListeners[eventName].forEach(function (callback) {
              return callback(eventObj);
            });
          })();
        }
        if (this.eventsListeners.stateChange.length > 0 && typeof this.eventsListeners.stateChange[0] === 'function') {
          this.eventsListeners.stateChange[0](this.mediaAPI.state);
        }
      }
    }, {
      key: 'play',
      value: function play() {
        this.mediaAPI.play();
      }
    }, {
      key: 'pause',
      value: function pause() {
        this.mediaAPI.pause();
      }
    }, {
      key: 'volume',
      value: function volume(value) {
        this.mediaAPI.volume(value);
      }
    }, {
      key: 'mute',
      value: function mute() {
        this.mediaAPI.mute();
      }
    }, {
      key: 'seek',
      value: function seek(value) {
        this.mediaAPI.seek(value);
      }
    }, {
      key: 'requestFullscreen',
      value: function requestFullscreen() {
        this.mediaAPI.requestFullscreen();
      }
    }, {
      key: 'exitFullscreen',
      value: function exitFullscreen() {
        this.mediaAPI.exitFullscreen();
      }
    }, {
      key: 'api',
      get: function get() {
        return {
          addEventListener: this.addEventListener.bind(this),
          removeEventListener: this.removeEventListener.bind(this),
          play: this.play.bind(this),
          pause: this.pause.bind(this),
          volume: this.volume.bind(this),
          mute: this.mute.bind(this),
          seek: this.seek.bind(this),
          requestFullscreen: this.requestFullscreen.bind(this)
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