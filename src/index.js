import BetaMaxCore from './betamax-core'

// VIDEO //
const betamaxPlayer = new BetaMaxCore({
  $mediaObj: document.querySelector('#video-example'),
})
const $videoControls = document.getElementById('video-controls');
const $videoPlayPause = $videoControls.querySelector('.play-pause');
const $videoTimeStamp = $videoControls.querySelector('.timeStamp');
const $videoFullScreen = $videoControls.querySelector('.fullScreen');

betamaxPlayer.onStateChange(state => {
  $videoPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing'
  $videoTimeStamp.innerHTML = `${betamaxPlayer.formatTime(state.currentTime)} Sec. | ${betamaxPlayer.formatTime(state.duration)} Min.`
})

$videoFullScreen.addEventListener('click', (evt) => {
  evt.preventDefault()
  betamaxPlayer.requestFullscreen()
})

// betamaxPlayer.pause()
betamaxPlayer.volume(0.05)
// betamaxPlayer.seek(500)
// betamaxPlayer.play()



// AUDIO //
const betamaxAudioPlayer = new BetaMaxCore({
  $mediaObj: document.querySelector('#audio-example'),
})
const $audioControls = document.getElementById('audio-controls');
const $audioPlayPause = $audioControls.querySelector('.play-pause');
const $audioTimeStamp = $audioControls.querySelector('.timeStamp');

betamaxAudioPlayer.onStateChange(state => {
  $audioPlayPause.innerHTML = state.paused ? 'Paused' : 'Playing'
  $audioTimeStamp.innerHTML = `${betamaxAudioPlayer.formatTime(state.currentTime)} Sec. | ${betamaxAudioPlayer.formatTime(state.duration)} Min.`
})

// betamaxAudioPlayer.seek(20)
betamaxAudioPlayer.volume(0.05)
// betamaxAudioPlayer.play()
