(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './html-base-api'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./html-base-api'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.htmlBaseApi);
    global.htmlAudioApi = mod.exports;
  }
})(this, function (exports, _htmlBaseApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxHtmlAudioAPI = exports.default = undefined;

  var _htmlBaseApi2 = _interopRequireDefault(_htmlBaseApi);

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

  var BetaMaxHtmlAudioAPI = function (_BetaMaxHtmlBaseMedia) {
    _inherits(BetaMaxHtmlAudioAPI, _BetaMaxHtmlBaseMedia);

    function BetaMaxHtmlAudioAPI(_ref) {
      var $mediaObj = _ref.$mediaObj;
      var events = _ref.events;

      _classCallCheck(this, BetaMaxHtmlAudioAPI);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(BetaMaxHtmlAudioAPI).call(this, { $mediaObj: $mediaObj, events: events }));
    }

    return BetaMaxHtmlAudioAPI;
  }(_htmlBaseApi2.default);

  exports.default = BetaMaxHtmlAudioAPI;
  exports.BetaMaxHtmlAudioAPI = BetaMaxHtmlAudioAPI;
});