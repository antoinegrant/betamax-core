import BetaMaxHtmlBaseMediaAPI from './html-base-api'

class BetaMaxHtmlAudioAPI extends BetaMaxHtmlBaseMediaAPI {
  constructor({ $mediaObj, events }) {
    super({ $mediaObj, events })
  }
}

export { BetaMaxHtmlAudioAPI as default, BetaMaxHtmlAudioAPI }
