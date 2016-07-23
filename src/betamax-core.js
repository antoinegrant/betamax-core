class BetaMaxCore {
  static version = '3.0.0';

  constructor(renderer) {
    this.renderer = renderer;
  }

  get version() {
    return VHSCore.version;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(renderer) {
    if (!renderer.type || renderer.type === '' || typeof renderer.render !== 'function') {
      throw new Error('The renderer signature is not conform.');
    }
    return this._renderer = renderer;
  }

  bindEvents() {
    this.renderer.on(this.renderer.events.BEFORE_LOAD, this.onBeforeLoad);
    this.renderer.on(this.renderer.events.PLAY, this.onPlay);
    this.renderer.on(this.renderer.events.PAUSE, this.onPause);
    this.renderer.on(this.renderer.events.PROGRESS, this.onProgress);
  }

  onBeforeLoad  = (eventName, evt) => {
    console.log('Get the event in core', evt.type);
    this.renderer.onLoadMedia();
  };
  onPlay        = (eventName, evt) => console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
  onPause       = (eventName, evt) => console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
  onProgress    = (eventName, evt) => console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);

  render() {
    this.bindEvents();
    this.renderer.render();
  }
}

export { BetaMaxCore as default, BetaMaxCore };
