(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './betamax-utils', './media-apis/html-video-api', './media-apis/html-video-hls-api', './media-apis/html-audio-api'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./betamax-utils'), require('./media-apis/html-video-api'), require('./media-apis/html-video-hls-api'), require('./media-apis/html-audio-api'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.betamaxUtils, global.htmlVideoApi, global.htmlVideoHlsApi, global.htmlAudioApi);
    global.betamaxMediaApi = mod.exports;
  }
})(this, function (exports, _betamaxUtils, _htmlVideoApi, _htmlVideoHlsApi, _htmlAudioApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetaMaxMediaAPIFactory = exports.default = undefined;

  var _betamaxUtils2 = _interopRequireDefault(_betamaxUtils);

  var _htmlVideoApi2 = _interopRequireDefault(_htmlVideoApi);

  var _htmlVideoHlsApi2 = _interopRequireDefault(_htmlVideoHlsApi);

  var _htmlAudioApi2 = _interopRequireDefault(_htmlAudioApi);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var BetaMaxMediaAPIFactory = function BetaMaxMediaAPIFactory(_ref) {
    var $mediaObj = _ref.$mediaObj;
    var events = _ref.events;

    var mediaApi = void 0;
    var type = void 0;

    switch ($mediaObj.tagName.toLowerCase()) {
      case 'audio':
        type = 'audio';
        break;
      default:
        type = 'video';
    }

    if (_betamaxUtils2.default.isHlsSupported() && /\.m3u8$/.test($mediaObj.currentSrc)) {
      type = 'hls';
    }

    switch (type) {
      case 'video':
        mediaApi = new _htmlVideoApi2.default({ $mediaObj: $mediaObj, events: events });
        break;
      case 'audio':
        mediaApi = new _htmlAudioApi2.default({ $mediaObj: $mediaObj, events: events });
        break;
      case 'hls':
        mediaApi = new _htmlVideoHlsApi2.default({ $mediaObj: $mediaObj, events: events, currentSrc: $mediaObj.currentSrc });
        break;
      default:
        throw new Error("You must specify a type.");
    }

    return mediaApi;
  };

  exports.default = BetaMaxMediaAPIFactory;
  exports.BetaMaxMediaAPIFactory = BetaMaxMediaAPIFactory;
});