import BetaMaxMediaAPI from './betamax-media-api'

class BetaMaxCore {

  constructor({ $mediaObj }) {
    // validate the options
    this.eventsListeners = this.eventsListeners || {}
    this.mediaAPI = this.mediaAPI($mediaObj)
    this.bindEvents()
  }

  get api() {
    return {
      addEventListener: this.addEventListener,
      removeEventListener: this.removeEventListener,
      play: this.play,
      pause: this.pause,
      volume: this.volume,
      mute: this.mute,
      seek: this.seek,
      requestFullscreen: this.requestFullscreen.bind(this),
    }
  }

  get events() {
    return {
      BEFORE_LOAD: 'before_load',
      PLAY: 'play',
      PAUSE: 'pause',
      TIME_UPDATE: 'timeupdate',
      ENDED: 'ended',
      VOLUME_CHANGE: 'volumechange',
      PROGRESS: 'progress',
    }
  }

  play = () => this.mediaAPI.play()
  pause = () => this.mediaAPI.pause()
  volume = (value) => this.mediaAPI.volume(value)
  mute = () => this.mediaAPI.mute()
  seek = (value) => this.mediaAPI.seek(value)
  requestFullscreen = () => this.mediaAPI.requestFullscreen()
  exitFullscreen = () => this.mediaAPI.exitFullscreen()

  mediaAPI($mediaObj) {
    return new BetaMaxMediaAPI({ $mediaObj, events: this.events })
  }

  bindEvents() {
    this.mediaAPI.addEventListener(this.events.PLAY,          evt => this.trigger(this.events.PLAY, evt))
    this.mediaAPI.addEventListener(this.events.PAUSE,         evt => this.trigger(this.events.PAUSE, evt))
    this.mediaAPI.addEventListener(this.events.STOP,          evt => this.trigger(this.events.STOP, evt))
    this.mediaAPI.addEventListener(this.events.TIME_UPDATE,   evt => this.trigger(this.events.TIME_UPDATE, evt))
    this.mediaAPI.addEventListener(this.events.VOLUME_CHANGE, evt => this.trigger(this.events.VOLUME_CHANGE, evt))
    this.mediaAPI.addEventListener(this.events.LOADED_DATA,   evt => this.trigger(this.events.LOADED_DATA, evt))
  }

  addEventListener = (eventName, callback) => {
    if (typeof callback === 'function') {
      this.eventsListeners[eventName] = this.eventsListeners[eventName] || []
      this.eventsListeners[eventName].push(callback)
    }
  }

  removeEventListener = (eventName, callback) => {
    if (this.eventsListeners[eventName]) {
      delete this.eventsListeners[eventName]
    }
  }

  trigger(eventName, eventObj) {
    if (this.eventsListeners[eventName]) {
      this.eventsListeners[eventName].forEach(callback => callback(eventObj))
    }
    if (this.eventsListeners.stateChange.length > 0 && typeof this.eventsListeners.stateChange[0] === 'function') {
      this.eventsListeners.stateChange[0](this.mediaAPI.state)
    }
  }
}

const BetaMaxCoreFactory = (options) => new BetaMaxCore(options).api

export { BetaMaxCoreFactory as default, BetaMaxCoreFactory }
