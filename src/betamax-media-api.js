class BetaMaxBaseMediaAPI {
  constructor($mediaObj, coreEvents) {
    this.eventsListeners = this.eventsListeners || {}
    this.$mediaObj = $mediaObj
    this.events = coreEvents
    this.registerEvents()
  }

  registerEvents() {
    this.$mediaObj.addEventListener('play', (evt) => this.trigger(this.events.PLAY, evt))
    this.$mediaObj.addEventListener('pause', (evt) => this.trigger(this.events.PAUSE, evt))
    this.$mediaObj.addEventListener('timeupdate', (evt) => this.trigger(this.events.TIME_UPDATE, evt))
    this.$mediaObj.addEventListener('ended', (evt) => this.trigger(this.events.ENDED, evt))
    this.$mediaObj.addEventListener('volumechange', (evt) => this.trigger(this.events.VOLUME_CHANGE, evt))
  }

  addEventListener(eventName, callback) {
    if (typeof callback === 'function') {
      this.eventsListeners[eventName] = this.eventsListeners[eventName] || []
      this.eventsListeners[eventName].push(callback)
    }
  }

  removeEventListener(eventName, callback) {
    if (this.eventsListeners[eventName]) {
      delete this.eventsListeners[eventName]
    }
  }

  trigger(eventName, evt) {
    if (this.eventsListeners[eventName]) {
      let eventObj = {
        type: evt.type,
        currentTime: this.getState().currentTime,
        volume: this.getState().volume,
      }
      this.eventsListeners[eventName].forEach(callback => callback(eventObj))
    }
  }

  getState() {
    // See here for more info: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    return {
      autoplay: this.$mediaObj.autoplay,
      buffered: this.$mediaObj.buffered,
      controller: this.$mediaObj.controller,
      controls: this.$mediaObj.controls,
      crossOrigin: this.$mediaObj.crossOrigin,
      currentSrc: this.$mediaObj.currentSrc,
      currentTime: this.$mediaObj.currentTime,
      defaultMuted: this.$mediaObj.defaultMuted,
      defaultPlaybackRate: this.$mediaObj.defaultPlaybackRate,
      disableRemotePlayback: this.$mediaObj.disableRemotePlayback,
      duration: this.$mediaObj.duration,
      ended: this.$mediaObj.ended,
      error: this.$mediaObj.error,
      loop: this.$mediaObj.loop,
      mediaGroup: this.$mediaObj.mediaGroup,
      muted: this.$mediaObj.muted,
      networkState: this.$mediaObj.networkState,
      paused: this.$mediaObj.paused,
      playbackRate: this.$mediaObj.playbackRate,
      played: this.$mediaObj.played,
      preload: this.$mediaObj.preload,
      readyState: this.$mediaObj.readyState,
      seekable: this.$mediaObj.seekable,
      seeking: this.$mediaObj.seeking,
      sinkId: this.$mediaObj.sinkId,
      src: this.$mediaObj.src,
      srcObject: this.$mediaObj.srcObject,
      textTracks: this.$mediaObj.textTracks,
      videoTracks: this.$mediaObj.videoTracks,
      volume: this.$mediaObj.volume,
    }
  }

  play() {
     this.$mediaObj.play()
  }

  pause() {
     if (this.$mediaObj.readyState <= 1) {
       this.pauseAnimationFrameId = window.requestAnimationFrame(() => this.pause())
     } else {
       window.cancelAnimationFrame(this.pauseAnimationFrameId)
       this.$mediaObj.pause()
     }
  }

  volume(value) {
    if (this.$mediaObj.readyState <= 0) {
      this.volumeAnimationFrameId = window.requestAnimationFrame(() => this.volume(value))
    } else {
      window.cancelAnimationFrame(this.volumeAnimationFrameId)
      this.$mediaObj.volume = value
    }
  }

  seek(value) {
    if (this.$mediaObj.readyState <= 0) {
      this.seekAnimationFrameId = window.requestAnimationFrame(() => this.seek(value))
    } else {
      window.cancelAnimationFrame(this.seekAnimationFrameId)
      this.$mediaObj.currentTime = value
    }
  }

  requestFullscreen() {
    this.$mediaObj.webkitRequestFullscreen()
  }

  exitFullscreen() {
    this.$mediaObj.webkitExitFullscreen()
  }
}

class BetaMaxHtmlVideoAPI extends BetaMaxBaseMediaAPI {}
class BetaMaxHtmlAudioAPI extends BetaMaxBaseMediaAPI {}

const BetaMaxMediaAPIFactory = ({ type, $mediaObj, events }) => {
  let mediaApi
  switch (type) {
    case 'audio':
      mediaApi = new BetaMaxHtmlAudioAPI($mediaObj, events)
      break
    default:
      mediaApi = new BetaMaxHtmlVideoAPI($mediaObj, events)
  }
  return mediaApi
}

export { BetaMaxMediaAPIFactory as default, BetaMaxMediaAPIFactory }
