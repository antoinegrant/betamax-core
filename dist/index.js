(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './betamax-core', './betamax-utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./betamax-core'), require('./betamax-utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.betamaxCore, global.betamaxUtils);
    global.index = mod.exports;
  }
})(this, function (exports, _betamaxCore, _betamaxUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.utils = exports.BetaMaxCore = exports.default = undefined;

  var _betamaxCore2 = _interopRequireDefault(_betamaxCore);

  var _betamaxUtils2 = _interopRequireDefault(_betamaxUtils);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _betamaxCore2.default;
  exports.BetaMaxCore = _betamaxCore2.default;
  exports.utils = _betamaxUtils2.default;
});