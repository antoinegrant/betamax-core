const MediaFoo = {

  addEventListener(eventName, callback) {
    this.eventsListeners = this.eventsListeners || {};
    this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
    this.eventsListeners[eventName].push(callback);
  },

  trigger(eventName, evt) {
    this.eventsListeners = this.eventsListeners || {};
    this.eventsListeners[eventName].forEach((callback) => callback(evt));
  },

  render($media) {
    $media.setAttribute('style', [
      'background-color: #ccc',
      'width: 200px',
      'height: 100px'
    ].join(';'));

    let state = 'pause';
    $media.addEventListener('click', () => {
      state = state === 'pause' ? 'play' : 'pause';
      this.trigger(state, {
        type: state,
        timeStamp: 1
      });
      $media.innerHTML = state;
    });

    return $media;
  }
}

class BetaMaxFoo {
  static version = '3.0.0';
  static type = 'FOO';

  constructor($el) {
    this.$el = $el;
  }

  get version() {
    return VHSFoo.version;
  }

  get type() {
    return VHSFoo.type;
  }

  get events() {
    return {
      PLAY: 'play',
      PAUSE: 'pause'
    }
  }

  on(eventName, callback) {
    this.eventsListeners = this.eventsListeners || {};
    this.eventsListeners[eventName] = this.eventsListeners[eventName] || [];
    this.eventsListeners[eventName].push(callback);
  }

  trigger(eventName, evt) {
    this.eventsListeners[eventName].forEach((callback) => callback(eventName, {
      type: evt.type,
      timeStamp: evt.timeStamp
    }));
  }

  bindEvents() {
    this.$media.addEventListener('play', (evt) => this.trigger(this.events.PLAY, evt));
    this.$media.addEventListener('pause', (evt) => this.trigger(this.events.PAUSE, evt));
  }

  render() {
    let $media = MediaFoo.render(this.$el);
    this.$media = MediaFoo;

    this.bindEvents();

    return this;
  }

}

export { BetaMaxFoo as default, BetaMaxFoo };
