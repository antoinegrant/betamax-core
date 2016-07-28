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
    if (this.hasRenderer) {
      throw new Error('Cannot set the renderer a second time.');
    }
    if (!renderer.type || renderer.type === '' || typeof renderer.render !== 'function') {
      throw new Error('The renderer signature is not conform.');
    }
    this.hasRenderer = true;
    return this._renderer = renderer;
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  runEventThroughMiddlewares(eventName, evt) {
    this.middlewareContext = this.middlewareContext || {};
    return this.middlewares.every(middleware => {
      this.middlewareContext[middleware] = this.middlewareContext[middleware] || {};
      this.middlewareContext[middleware] = Object.assign(this.middlewareContext[middleware], {
        renderer: this.renderer,
        setState: this.setState
      });
      middleware.call(this.middlewareContext[middleware], eventName, evt);
    });
  }

  bindEvents() {
    for (var eventName in this.renderer.events) {
      this.renderer.on(this.renderer.events[eventName], this.on.bind(this));
    }
  }

  on(eventName, evt) {
    console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
    this.runEventThroughMiddlewares(eventName, evt);
  }

  setInitState(newState) {
    let state = Object.assign({}, this.renderer.state);
    this.renderer.state = {};
    this.setState(state);
  }

  setState(newState) {
    console.warn("STATE CHANGE", newState);
    let prevState = Object.assign({}, this.renderer.state);
    this.renderer.state = Object.assign(this.renderer.state, newState);

    if (prevState.mediaUrl !== newState.mediaUrl) {
      this.renderer.onLoadMedia();
    }

    return this.renderer.state;
  }

  render() {
    if (this.isMounted) {
      throw new Error('BetaMax has mounted already.');
    }
    this.isMounted = true;
    this.bindEvents();
    this.setInitState(this.renderer.state);
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
