import BetaMaxMediaAPI from './betamax-media-api'
import { formatTime } from './betamax-utils'

class BetaMaxCore {

  constructor({ $mediaObj }) {
    // validate the options
    this.eventsListeners = this.eventsListeners || {}
    this.mediaAPI = this.mediaAPI($mediaObj)
    this.state = this.mediaAPI.state
    this.bindEvents()
  }

  get api() {
    return {
      onStateChange: this.onStateChange.bind(this),
      play: this.play.bind(this),
      pause: this.pause.bind(this),
      volume: this.volume.bind(this),
      seek: this.seek.bind(this),
      requestFullscreen: this.requestFullscreen.bind(this),
      // Utils
      formatTime: formatTime,
    }
  }

  get events() {
    return {
      BEFORE_LOAD: 'before_load',
      PLAY: 'play',
      PAUSE: 'pause',
      TIME_UPDATE: 'timeupdate',
      ENDED: 'ended',
      VOLUME_CHANGE: 'volumechange'
    }
  }

  mediaAPI($mediaObj) {
    let type
    switch ($mediaObj.tagName.toLowerCase()) {
      case 'audio':
        type = 'audio'
        break
      default:
        type = 'video'
    }
    return new BetaMaxMediaAPI({ type, $mediaObj, events: this.events })
  }

  bindEvents() {
    this.mediaAPI.addEventListener(this.events.PLAY, this.setState.bind(this))
    this.mediaAPI.addEventListener(this.events.PAUSE, this.setState.bind(this))
    this.mediaAPI.addEventListener(this.events.STOP, this.setState.bind(this))
    this.mediaAPI.addEventListener(this.events.TIME_UPDATE, this.setState.bind(this))
    this.mediaAPI.addEventListener(this.events.VOLUME_CHANGE, this.setState.bind(this))
  }

  setState(newState) {
    this.triggerStateChange()
  }

  onStateChange(callback) {
    if (typeof callback === 'function') {
      this.eventsListeners.onStateChange = this.eventsListeners.onStateChange || []
      this.eventsListeners.onStateChange.push(callback)
    }
  }

  removeEventListener(callback) {
    if (this.eventsListeners.onStateChange) {
      delete this.eventsListeners.onStateChange
    }
  }

  triggerStateChange(evt) {
    if (this.eventsListeners.onStateChange) {
      this.eventsListeners.onStateChange.forEach(callback => callback(this.mediaAPI.state))
    }
  }

  play() {
    this.mediaAPI.play()
  }

  pause() {
    this.mediaAPI.pause()
  }

  volume(value) {
    this.mediaAPI.volume(value)
  }

  seek(value) {
    this.mediaAPI.seek(value)
  }

  requestFullscreen() {
    this.mediaAPI.requestFullscreen()
  }

  exitFullscreen() {
    this.mediaAPI.exitFullscreen()
  }
}

const BetaMaxCoreFactory = (options) => new BetaMaxCore(options).api

export { BetaMaxCoreFactory as default, BetaMaxCoreFactory }
