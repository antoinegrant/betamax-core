(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './media-apis/html-video-api', './media-apis/html-audio-api'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./media-apis/html-video-api'), require('./media-apis/html-audio-api'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.htmlVideoApi, global.htmlAudioApi);
    global.betamaxMediaApi = mod.exports;
  }
})(this, function (exports, _htmlVideoApi, _htmlAudioApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxMediaAPIFactory = exports.default = undefined;

  var _htmlVideoApi2 = _interopRequireDefault(_htmlVideoApi);

  var _htmlAudioApi2 = _interopRequireDefault(_htmlAudioApi);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var BetaMaxMediaAPIFactory = function BetaMaxMediaAPIFactory(_ref) {
    var type = _ref.type;
    var $mediaObj = _ref.$mediaObj;
    var events = _ref.events;

    var mediaApi = void 0;
    switch (type) {
      case 'video':
        mediaApi = new _htmlVideoApi2.default({ $mediaObj: $mediaObj, events: events });
        break;
      case 'audio':
        mediaApi = new _htmlAudioApi2.default({ $mediaObj: $mediaObj, events: events });
        break;
      default:
        throw new Error("You must specify a type.");
    }
    return mediaApi;
  };

  exports.default = BetaMaxMediaAPIFactory;
  exports.BetaMaxMediaAPIFactory = BetaMaxMediaAPIFactory;
});