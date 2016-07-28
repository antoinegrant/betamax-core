import BetaMaxPlayerHTML from './betamax-player-html';

const videoPlayer = new BetaMaxPlayerHTML({
  $media: document.querySelector('#video-example'),
  mediaUrl: 'http://localhost:3000/33763_1_out-there-pluto_wg_480p.mp4'
});

videoPlayer.render();

const audioPlayer = new BetaMaxPlayerHTML({
  $media: document.querySelector('#audio-example'),
  mediaUrl: 'http://localhost:3000/25healthupdate.mp3'
});

audioPlayer.render();
