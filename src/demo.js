import BetaMaxCore, { utils } from './'

// VIDEO //
const betamaxVideoPlayer = new BetaMaxCore({
  $mediaObj: document.querySelector('#video-example'),
})
const $videoControls = document.getElementById('video-controls');
const $videoPlayPause = $videoControls.querySelector('.play-pause');
const $videoTimeStamp = $videoControls.querySelector('.timeStamp');
const $videoFullScreen = $videoControls.querySelector('.fullScreen');
const $videoMute = $videoControls.querySelector('.mute');

betamaxVideoPlayer.addEventListener('stateChange', state => {
  console.warn("State Change");
  $videoPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing'
  $videoTimeStamp.innerHTML = `${utils.formatTime(state.currentTime)} Sec.`
  if (state.duration) {
    $videoTimeStamp.innerHTML += ` | ${utils.formatTime(state.duration)} Min.`
  }
  $videoMute.innerHTML = state.muted ? 'Muted' : 'Mute'
})

$videoFullScreen.addEventListener('click', (evt) => {
  evt.preventDefault()
  betamaxVideoPlayer.requestFullscreen()
})
$videoMute.addEventListener('click', (evt) => {
  evt.preventDefault()
  betamaxVideoPlayer.mute()
})

// betamaxVideoPlayer.pause()
// betamaxVideoPlayer.volume(0.05)
// betamaxVideoPlayer.mute()
// betamaxVideoPlayer.seek(240)
// betamaxVideoPlayer.play()



// AUDIO //
const betamaxAudioPlayer = new BetaMaxCore({
  $mediaObj: document.querySelector('#audio-example'),
})
const $audioControls = document.getElementById('audio-controls');
const $audioPlayPause = $audioControls.querySelector('.play-pause');
const $audioTimeStamp = $audioControls.querySelector('.timeStamp');

betamaxAudioPlayer.addEventListener('stateChange', state => {
  $audioPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing'
  $audioTimeStamp.innerHTML = `${utils.formatTime(state.currentTime)} Sec. | ${utils.formatTime(state.duration)} Min.`
})

// betamaxAudioPlayer.seek(20)
// betamaxAudioPlayer.volume(0.05)
// betamaxAudioPlayer.play()
