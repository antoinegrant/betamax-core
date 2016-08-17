(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global._);
    global.demo = mod.exports;
  }
})(this, function (_) {
  'use strict';

  var _2 = _interopRequireDefault(_);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // VIDEO //
  var betamaxPlayer = new _2.default({
    $mediaObj: document.querySelector('#video-example')
  });
  var $videoControls = document.getElementById('video-controls');
  var $videoPlayPause = $videoControls.querySelector('.play-pause');
  var $videoTimeStamp = $videoControls.querySelector('.timeStamp');
  var $videoFullScreen = $videoControls.querySelector('.fullScreen');
  var $videoMute = $videoControls.querySelector('.mute');

  betamaxPlayer.addEventListener('stateChange', function (state) {
    console.warn("State Change");
    $videoPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing';
    $videoTimeStamp.innerHTML = _.utils.formatTime(state.currentTime) + ' Sec.';
    if (state.duration) {
      $videoTimeStamp.innerHTML += ' | ' + _.utils.formatTime(state.duration) + ' Min.';
    }
    $videoMute.innerHTML = state.volume > 0 ? 'Mute' : 'Muted';
  });

  $videoFullScreen.addEventListener('click', function (evt) {
    evt.preventDefault();
    betamaxPlayer.requestFullscreen();
  });
  $videoMute.addEventListener('click', function (evt) {
    evt.preventDefault();
    betamaxPlayer.mute();
  });

  // betamaxPlayer.pause()
  // betamaxPlayer.volume(0.05)
  // betamaxPlayer.mute()
  // betamaxPlayer.seek(0.4)
  // betamaxPlayer.play()


  // AUDIO //
  var betamaxAudioPlayer = new _2.default({
    $mediaObj: document.querySelector('#audio-example')
  });
  var $audioControls = document.getElementById('audio-controls');
  var $audioPlayPause = $audioControls.querySelector('.play-pause');
  var $audioTimeStamp = $audioControls.querySelector('.timeStamp');

  betamaxAudioPlayer.addEventListener('stateChange', function (state) {
    $audioPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing';
    $audioTimeStamp.innerHTML = _.utils.formatTime(state.currentTime) + ' Sec. | ' + _.utils.formatTime(state.duration) + ' Min.';
  });

  // betamaxAudioPlayer.seek(20)
  // betamaxAudioPlayer.volume(0.05)
  // betamaxAudioPlayer.play()
});