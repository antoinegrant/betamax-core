import BetaMaxHtmlVideoAPI from './html-video-api'
import Hls from 'hls.js/src/hls.js';

class BetaMaxHtmlVideoHlsAPI extends BetaMaxHtmlVideoAPI {
  constructor({ $mediaObj, events, currentSrc }) {
    super({ $mediaObj, events })
    console.warn("THIS IS HLS");

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.attachMedia($mediaObj);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.warn("video and hls.js are now bound together !");
        window.setTimeout(() => hls.loadSource(currentSrc), 5000)
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.warn("manifest loaded, found " + data.levels.length + " quality level");
          $mediaObj.play()
        });
      });
    }

  }
}

export { BetaMaxHtmlVideoHlsAPI as default, BetaMaxHtmlVideoHlsAPI }
