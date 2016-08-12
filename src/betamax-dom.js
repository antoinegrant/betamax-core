class BetaMaxDom {
  static version = '3.0.0';
  static type = 'DOM';

  constructor({ $media, mediaUrl }) {
    this.state = {
      $media,
      mediaUrl,
    };
    this.mode = /\.mp3/.test(this.state.mediaUrl) ? 'AUDIO' : 'VIDEO';
  }

  get version() {
    return BetaMaxDom.version;
  }

  get type() {
    return BetaMaxDom.type;
  }

  get events() {
    return {
      BEFORE_LOAD: 'before_load',
      PLAY: 'play',
      PAUSE: 'pause',
      TIME_UPDATE: 'timeupdate',
      ENDED: 'ended',
    }
  }

  on(eventName, callback) {
    this.eventsListeners = this.eventsListeners || {};
    this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
    this.eventsListeners[eventName].push(callback);
  }

  trigger(eventName, evt) {
    this.eventsListeners = this.eventsListeners || {};
    if (this.eventsListeners[eventName]) {
      this.eventsListeners[eventName].forEach((callback) => callback(eventName, {
        type: evt.type,
        timeStamp: evt.timeStamp,
        rendererMode: this.mode
      }));
    }
  }

  bindMediaEvents() {
    this.state.$media.addEventListener('play', (evt) => this.trigger(this.events.PLAY, evt));
    this.state.$media.addEventListener('pause', (evt) => this.trigger(this.events.PAUSE, evt));
    this.state.$media.addEventListener('timeupdate', (evt) => this.trigger(this.events.TIME_UPDATE, evt));
    this.state.$media.addEventListener('ended', (evt) => this.trigger(this.events.ENDED, evt));
  }

  onLoadMedia() {
    if (this.logEnabled) console.log('onLoadMedia', this.state.mediaUrl);
    // this.state.$media.setAttribute('autoplay', true);
    this.state.$media.pause();
    this.state.$media.setAttribute('src', this.state.mediaUrl);
    this.state.$media.load();
    this.state.$media.play();
  }

  render() {
    this.trigger(this.events.BEFORE_LOAD, {
      type: 'vhs-dom-custom'
    });
    this.bindMediaEvents();
    return this;
  }

}

export { BetaMaxDom as default, BetaMaxDom };
