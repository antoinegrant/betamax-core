import BetaMaxBaseMediaAPI from './base-api'

class BetaMaxHtmlBaseMediaAPI extends BetaMaxBaseMediaAPI {
  constructor({ $mediaObj, events }) {
    super({ $mediaObj, events })
  }

  registerEvents() {
    this.$mediaObj.addEventListener('play', (evt) => this.trigger(this.events.PLAY, evt))
    this.$mediaObj.addEventListener('pause', (evt) => this.trigger(this.events.PAUSE, evt))
    this.$mediaObj.addEventListener('timeupdate', (evt) => this.trigger(this.events.TIME_UPDATE, evt))
    this.$mediaObj.addEventListener('ended', (evt) => this.trigger(this.events.ENDED, evt))
    this.$mediaObj.addEventListener('volumechange', (evt) => this.trigger(this.events.VOLUME_CHANGE, evt))
  }

  get state() {
    // See here for more info: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    return {
      autoplay: this.$mediaObj.autoplay,
      buffered: this.$mediaObj.buffered,
      controls: this.$mediaObj.controls,
      crossOrigin: this.$mediaObj.crossOrigin,
      currentSrc: this.$mediaObj.currentSrc,
      currentTime: this.$mediaObj.currentTime,
      defaultMuted: this.$mediaObj.defaultMuted,
      duration: this.$mediaObj.duration,
      ended: this.$mediaObj.ended,
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
      src: this.$mediaObj.src,
      textTracks: this.$mediaObj.textTracks,
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
}

export { BetaMaxHtmlBaseMediaAPI as default, BetaMaxHtmlBaseMediaAPI }
