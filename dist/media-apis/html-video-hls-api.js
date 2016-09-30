(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './html-video-api', 'hls.js/src/hls.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./html-video-api'), require('hls.js/src/hls.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.htmlVideoApi, global.hls);
    global.htmlVideoHlsApi = mod.exports;
  }
})(this, function (exports, _htmlVideoApi, _hls) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxHtmlVideoHlsAPI = exports.default = undefined;

  var _htmlVideoApi2 = _interopRequireDefault(_htmlVideoApi);

  var _hls2 = _interopRequireDefault(_hls);

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

  var BetaMaxHtmlVideoHlsAPI = function (_BetaMaxHtmlVideoAPI) {
    _inherits(BetaMaxHtmlVideoHlsAPI, _BetaMaxHtmlVideoAPI);

    function BetaMaxHtmlVideoHlsAPI(_ref) {
      var $mediaObj = _ref.$mediaObj;
      var events = _ref.events;
      var currentSrc = _ref.currentSrc;

      _classCallCheck(this, BetaMaxHtmlVideoHlsAPI);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BetaMaxHtmlVideoHlsAPI).call(this, { $mediaObj: $mediaObj, events: events }));

      console.warn("THIS IS HLS");

      if (_hls2.default.isSupported()) {
        var hls = new _hls2.default();
        hls.attachMedia($mediaObj);
        hls.on(_hls2.default.Events.MEDIA_ATTACHED, function () {
          console.warn("video and hls.js are now bound together !");
          window.setTimeout(function () {
            return hls.loadSource(currentSrc);
          }, 5000);
          hls.on(_hls2.default.Events.MANIFEST_PARSED, function (event, data) {
            console.warn("manifest loaded, found " + data.levels.length + " quality level");
            $mediaObj.play();
          });
        });
      }

      return _this;
    }

    return BetaMaxHtmlVideoHlsAPI;
  }(_htmlVideoApi2.default);

  exports.default = BetaMaxHtmlVideoHlsAPI;
  exports.BetaMaxHtmlVideoHlsAPI = BetaMaxHtmlVideoHlsAPI;
});