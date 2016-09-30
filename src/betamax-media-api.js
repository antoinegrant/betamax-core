import utils from './betamax-utils';
import BetaMaxHtmlVideoAPI from './media-apis/html-video-api'
import BetaMaxHtmlVideoHlsAPI from './media-apis/html-video-hls-api'
import BetaMaxHtmlAudioAPI from './media-apis/html-audio-api'

const BetaMaxMediaAPIFactory = ({ $mediaObj, events }) => {
  let mediaApi
  let type

  switch ($mediaObj.tagName.toLowerCase()) {
    case 'audio':
      type = 'audio'
      break
    default:
      type = 'video'
  }

  if (utils.isHlsSupported() && /\.m3u8$/.test($mediaObj.currentSrc)) {
    type = 'hls';
  }

  switch (type) {
    case 'video':
      mediaApi = new BetaMaxHtmlVideoAPI({ $mediaObj, events })
      break;
    case 'audio':
      mediaApi = new BetaMaxHtmlAudioAPI({ $mediaObj, events })
      break
    case 'hls':
      mediaApi = new BetaMaxHtmlVideoHlsAPI({ $mediaObj, events, currentSrc: $mediaObj.currentSrc })
      break
    default:
      throw new Error("You must specify a type.")
  }

  return mediaApi
}

export { BetaMaxMediaAPIFactory as default, BetaMaxMediaAPIFactory }
