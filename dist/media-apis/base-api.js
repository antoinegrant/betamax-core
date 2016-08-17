(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.baseApi = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var BetaMaxBaseMediaAPI = function () {
    function BetaMaxBaseMediaAPI(_ref) {
      var $mediaObj = _ref.$mediaObj;
      var events = _ref.events;

      _classCallCheck(this, BetaMaxBaseMediaAPI);

      this.eventsListeners = this.eventsListeners || {};
      this.$mediaObj = $mediaObj;
      this.events = events;
      this.registerEvents();
    }

    _createClass(BetaMaxBaseMediaAPI, [{
      key: 'registerEvents',
      value: function registerEvents() {/* The child object must implement this method */}
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
        var _this = this;

        if (this.eventsListeners[eventName]) {
          (function () {
            var eventObj = {
              type: evt.type,
              currentTime: _this.state.currentTime,
              volume: _this.state.volume
            };
            _this.eventsListeners[eventName].forEach(function (callback) {
              return callback(eventObj);
            });
          })();
        }
      }
    }, {
      key: 'play',
      value: function play() {/* The child object must implement this method */}
    }, {
      key: 'pause',
      value: function pause() {/* The child object must implement this method */}
    }, {
      key: 'volume',
      value: function volume() {/* The child object must implement this method */}
    }, {
      key: 'seek',
      value: function seek() {/* The child object must implement this method */}
    }, {
      key: 'state',
      get: function get() {
        /* The child object must implement this method */
        /*
        return {
          autoplay,
          buffered,
          controls,
          crossOrigin,
          currentSrc,
          currentTime,
          defaultMuted,
          duration,
          ended,
          loop,
          mediaGroup,
          muted,
          networkState,
          paused,
          playbackRate,
          played,
          preload,
          readyState,
          seekable,
          seeking,
          src,
          textTracks,
          volume,
           // Maybe
          defaultPlaybackRate,
           // Not supported
          audioTracks,
          controller,
          error,
          startDate,
          videoTracks,
        }
        */
      }
    }]);

    return BetaMaxBaseMediaAPI;
  }();

  exports.default = BetaMaxBaseMediaAPI;
  exports.BetaMaxBaseMediaAPI = BetaMaxBaseMediaAPI;
});