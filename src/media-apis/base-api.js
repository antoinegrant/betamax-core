class BetaMaxBaseMediaAPI {
  constructor({ $mediaObj, events }) {
    this.eventsListeners = this.eventsListeners || {}
    this.$mediaObj = $mediaObj
    this.events = events
    this.registerEvents()
  }

  registerEvents() { /* The child object must implement this method */ }

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
        currentTime: this.state.currentTime,
        volume: this.state.volume,
      }
      this.eventsListeners[eventName].forEach(callback => callback(eventObj))
    }
  }

  get state() {
    /* The child object must implement this method */
    /*
    return {
      autoplay,
      buffered,
      controls,
      crossOrigin,
      currentSrc,
      currentTime,
      defaultMuted,
      duration,
      ended,
      loop,
      mediaGroup,
      muted,
      networkState,
      paused,
      playbackRate,
      played,
      preload,
      readyState,
      seekable,
      seeking,
      src,
      textTracks,
      volume,

      // Maybe
      defaultPlaybackRate,

      // Not supported
      audioTracks,
      controller,
      error,
      startDate,
      videoTracks,
    }
    */
  }

  play() { /* The child object must implement this method */ }
  pause() { /* The child object must implement this method */ }
  volume() { /* The child object must implement this method */ }
  seek() { /* The child object must implement this method */ }
}

export { BetaMaxBaseMediaAPI as default, BetaMaxBaseMediaAPI }
