class BetaMaxCore {
  static version = '3.0.0';

  constructor(renderer) {
    this.renderer = renderer;
    this.middlewares = [];
    this.logEnabled = false;
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
  }

  runEventThroughMiddlewares(eventName, evt) {
    this.middlewareContext = this.middlewareContext || {};
    return this.middlewares.every(middleware => {
      this.middlewareContext[middleware] = this.middlewareContext[middleware] || {};
      this.middlewareContext[middleware] = Object.assign(this.middlewareContext[middleware], {
        renderer: this.renderer,
        setState: this.setState.bind(this)
      });
      return middleware.call(this.middlewareContext[middleware], eventName, evt);
    });
  }

  bindEvents() {
    for (var eventName in this.renderer.events) {
      this.renderer.on(this.renderer.events[eventName], this.trigger.bind(this));
    }
  }

  trigger(eventName, evt) {
    if (this.logEnabled) console.log(`Get the event in core for ${evt.rendererMode}: ${evt.type}`);
    switch (eventName) {
      case 'play':
        this.setState({ stop: false, ended: false, play: true, pause: false, timeStamp: evt.timeStamp });
        break;
      case 'pause':
        this.setState({ stop: false, ended: false, play: false, pause: true, timeStamp: evt.timeStamp });
        break;
      case 'timeupdate':
        this.setState({ stop: false, ended: false, play: true, pause: false, timeStamp: evt.timeStamp });
        break;
      case 'ended':
        this.setState({ stop: true, ended: true, play: false, pause: false, timeStamp: 0 });
        break;
      default:

    }
    this.runEventThroughMiddlewares(eventName, evt);
  }

  setInitState(newState) {
    let state = Object.assign({}, newState);
    this.renderer.state = {};
    this.setState(state);
  }

  setState(newState) {
    let prevState = Object.assign({}, this.renderer.state);
    this.renderer.state = Object.assign(this.renderer.state, newState);

    if (this.logEnabled) console.warn("STATE CHANGE", prevState, newState);

    if (!!newState.mediaUrl && prevState.mediaUrl !== newState.mediaUrl) {
      this.renderer.state.ended = false;
      this.renderer.state.timeStamp = 0;
      this.renderer.onLoadMedia();
    }

    this.triggerStateChange(this.renderer.state);

    return this.renderer.state;
  }

  onStateChange(callback) {
    if (typeof callback !== 'function') return;
    this.stateChangeCallback = this.stateChangeCallback || [];
    this.stateChangeCallback.push(callback);
  }

  triggerStateChange(state) {
    if (this.stateChangeCallback && this.stateChangeCallback.length > 0)
      this.stateChangeCallback.forEach(callback => callback(state));
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
    onStateChange: betaMaxCore.onStateChange.bind(betaMaxCore),
  };
};

export { BetaMaxCoreFactory as default, BetaMaxCoreFactory };
