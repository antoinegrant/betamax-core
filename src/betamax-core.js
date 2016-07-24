class BetaMaxCore {
  static version = '3.0.0';

  constructor(renderer) {
    this.renderer = renderer;
    this.middlewares = [];
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

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  runEventThroughMiddlewares(eventName, evt) {
    let preventEvents = [];
    this.middlewares.every(middleware => {
      if (!middleware.call(this, eventName, evt)) {
        preventEvents.push(eventName);
      }
    });
    return preventEvents;
  }

  bindEvents() {
    for (var eventName in this.renderer.events) {
      if (typeof this[`on_${eventName.toLowerCase()}`] === 'function') {
        this.renderer.on(this.renderer.events[eventName], this[`on_${eventName.toLowerCase()}`]);
      }
    }
  }

  on_before_load = (eventName, evt) => {
    console.log('Get the event in core', evt.type);
    let preventEvents = this.runEventThroughMiddlewares(eventName, evt);
    if (preventEvents.indexOf(eventName) === -1) {
      this.renderer.onLoadMedia();
    }
  };
  on_play = (eventName, evt) => {
    console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
    this.runEventThroughMiddlewares(eventName, evt);
  };
  on_pause = (eventName, evt) => {
    console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
    this.runEventThroughMiddlewares(eventName, evt);
  };
  on_progress = (eventName, evt) => {
    console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
  };

  render() {
    this.bindEvents();
    this.renderer.render();
  }
}

const BetaMaxCoreFactory = (renderer) => {
  const betaMaxCore = new BetaMaxCore(renderer);
  return {
    use: betaMaxCore.use.bind(betaMaxCore),
    render: betaMaxCore.render.bind(betaMaxCore),
  };
};

export { BetaMaxCoreFactory as default, BetaMaxCoreFactory };
