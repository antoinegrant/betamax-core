import BetaMaxCore from './betamax-core';
import BetaMaxDom from './betamax-dom';
import BetaMaxFoo from './betamax-foo';

const betamaxVideo = new BetaMaxCore({
  renderer: new BetaMaxDom(document.querySelector('#video-example'), 'https://vp.nyt.com/video/2015/07/07/33763_1_out-there-pluto_wg_480p.mp4')
});
betamaxVideo.render();

const betamaxAudio = new BetaMaxCore({
  renderer: new BetaMaxDom(document.querySelector('#audio-example'), 'http://podcasts.nytimes.com/podcasts/2008/03/21/25healthupdate.mp3')
});
betamaxAudio.render();
