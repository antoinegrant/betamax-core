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
      PROGRESS: 'progress'
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
    this.state.$media.addEventListener('progress', (evt) => this.trigger(this.events.PROGRESS, evt));
  }

  onLoadMedia() {
    console.log('onLoadMedia');
    this.state.$media.setAttribute('src', this.state.mediaUrl);
  }

  render() {
    this.trigger(this.events.BEFORE_LOAD, {
      type: 'vhs-dom-custom'
    });
    this.bindMediaEvents();
    this.state.$media.setAttribute('controls', true);
    return this;
  }

}

export { BetaMaxDom as default, BetaMaxDom };
