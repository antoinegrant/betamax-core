(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './base-api'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./base-api'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.baseApi);
    global.htmlBaseApi = mod.exports;
  }
})(this, function (exports, _baseApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxHtmlBaseMediaAPI = exports.default = undefined;

  var _baseApi2 = _interopRequireDefault(_baseApi);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var BetaMaxHtmlBaseMediaAPI = function (_BetaMaxBaseMediaAPI) {
    _inherits(BetaMaxHtmlBaseMediaAPI, _BetaMaxBaseMediaAPI);

    function BetaMaxHtmlBaseMediaAPI(_ref) {
      var $mediaObj = _ref.$mediaObj;
      var events = _ref.events;

      _classCallCheck(this, BetaMaxHtmlBaseMediaAPI);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(BetaMaxHtmlBaseMediaAPI).call(this, { $mediaObj: $mediaObj, events: events }));
    }

    _createClass(BetaMaxHtmlBaseMediaAPI, [{
      key: 'registerEvents',
      value: function registerEvents() {
        var _this2 = this;

        this.$mediaObj.addEventListener('play', function (evt) {
          return _this2.trigger(_this2.events.PLAY, evt);
        });
        this.$mediaObj.addEventListener('pause', function (evt) {
          return _this2.trigger(_this2.events.PAUSE, evt);
        });
        this.$mediaObj.addEventListener('timeupdate', function (evt) {
          return _this2.trigger(_this2.events.TIME_UPDATE, evt);
        });
        this.$mediaObj.addEventListener('ended', function (evt) {
          return _this2.trigger(_this2.events.ENDED, evt);
        });
        this.$mediaObj.addEventListener('volumechange', function (evt) {
          return _this2.trigger(_this2.events.VOLUME_CHANGE, evt);
        });
        this.$mediaObj.addEventListener('loadeddata', function (evt) {
          return _this2.trigger(_this2.events.LOADED_DATA, evt);
        });
      }
    }, {
      key: 'play',
      value: function play() {
        this.$mediaObj.play();
      }
    }, {
      key: 'pause',
      value: function pause() {
        this.$mediaObj.pause();
      }
    }, {
      key: 'volume',
      value: function volume(value) {
        this.$mediaObj.volume = value;
      }
    }, {
      key: 'mute',
      value: function mute() {
        this.$mediaObj.muted = !this.$mediaObj.muted;
      }
    }, {
      key: 'seek',
      value: function seek(value) {
        this.$mediaObj.currentTime = value;
      }
    }, {
      key: 'state',
      get: function get() {
        // See here for more info: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
        return {
          autoplay: this.$mediaObj.autoplay,
          buffered: this.$mediaObj.buffered,
          controls: this.$mediaObj.controls,
          crossOrigin: this.$mediaObj.crossOrigin,
          currentSrc: this.$mediaObj.currentSrc,
          currentTime: this.$mediaObj.currentTime,
          defaultMuted: this.$mediaObj.defaultMuted,
          duration: this.$mediaObj.duration,
          ended: this.$mediaObj.ended,
          loop: this.$mediaObj.loop,
          mediaGroup: this.$mediaObj.mediaGroup,
          muted: this.$mediaObj.muted,
          networkState: this.$mediaObj.networkState,
          paused: this.$mediaObj.paused,
          playbackRate: this.$mediaObj.playbackRate,
          played: this.$mediaObj.played,
          preload: this.$mediaObj.preload,
          readyState: this.$mediaObj.readyState,
          seekable: this.$mediaObj.seekable,
          seeking: this.$mediaObj.seeking,
          src: this.$mediaObj.src,
          textTracks: this.$mediaObj.textTracks,
          volume: this.$mediaObj.volume
        };
      }
    }]);

    return BetaMaxHtmlBaseMediaAPI;
  }(_baseApi2.default);

  exports.default = BetaMaxHtmlBaseMediaAPI;
  exports.BetaMaxHtmlBaseMediaAPI = BetaMaxHtmlBaseMediaAPI;
});