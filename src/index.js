import BetaMaxPlayerHTML from './betamax-player-html';

const videoPlayer = new BetaMaxPlayerHTML({
  $media: document.querySelector('#video-example'),
  mediaUrl: 'http://localhost:3000/33763_1_out-there-pluto_wg_480p.mp4'
});

// videoPlayer.on('play', (evt) => {
//   console.warn("CHANGE THE UI PLAY STATE");
// });

const $playPause = document.getElementById('play-pause');
const $timeStamp = document.getElementById('timeStamp');
videoPlayer.onStateChange(state => {
  console.warn("NEW STATE", state);
  $playPause.innerHTML = state.play ? 'Play' : 'Pause';
  $timeStamp.innerHTML = `${Math.floor(state.timeStamp / 1000)} Sec.`;
});

videoPlayer.render();

// const audioPlayer = new BetaMaxPlayerHTML({
//   $media: document.querySelector('#audio-example'),
//   mediaUrl: 'http://localhost:3000/25healthupdate.mp3'
// });
//
// audioPlayer.render();
