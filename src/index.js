import BetaMaxCore from './betamax-core'

const betamaxPlayer = new BetaMaxCore({
  $mediaObj: document.querySelector('#video-example'),
  // mediaUrl: 'http://localhost:3000/33763_1_out-there-pluto_wg_480p.mp4'
})

const $playPause = document.getElementById('play-pause');
const $timeStamp = document.getElementById('timeStamp');
const $fullScreen = document.getElementById('fullScreen');

betamaxPlayer.onStateChange(state => {
  $playPause.innerHTML = state.paused ? 'Paused' : 'Playing'
  $timeStamp.innerHTML = `${betamaxPlayer.formatTime(state.currentTime)} Sec. | ${betamaxPlayer.formatTime(state.duration)} Min.`
})

// betamaxPlayer.pause()
betamaxPlayer.volume(0.5)
betamaxPlayer.seek(500)
betamaxPlayer.play()

$fullScreen.addEventListener('click', (evt) => {
  evt.preventDefault()
  betamaxPlayer.requestFullscreen()
})
