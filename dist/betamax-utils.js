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
    global.betamaxUtils = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {

    isHlsSupported: function isHlsSupported() {
      return window.MediaSource && typeof window.MediaSource.isTypeSupported === 'function' && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    },

    formatTime: function formatTime(time) {
      var currentTime = void 0;
      var minutes = void 0;
      var seconds = void 0;

      currentTime = parseInt(time, 10);
      if (currentTime < 0) {
        currentTime = 0;
      }

      minutes = Math.floor(currentTime / 60);
      seconds = currentTime - minutes * 60;

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      return minutes + ':' + seconds;
    }

  };
});