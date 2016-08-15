import BetaMaxHtmlBaseMediaAPI from './html-base-api'

class BetaMaxHtmlVideoAPI extends BetaMaxHtmlBaseMediaAPI {
  constructor({ $mediaObj, events }) {
    super({ $mediaObj, events })
  }

  requestFullscreen() {
    this.$mediaObj.webkitRequestFullscreen()
  }

  exitFullscreen() {
    this.$mediaObj.webkitExitFullscreen()
  }
}

export { BetaMaxHtmlVideoAPI as default, BetaMaxHtmlVideoAPI }
