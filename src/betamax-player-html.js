import BetaMaxCore from './betamax-core';
import BetaMaxDom from './betamax-dom';
import BetaMaxFoo from './betamax-foo';
import FooMiddleware from './middleware/foo-middleware';

class BetaMaxPlayerHTML {
  constructor({ $media, mediaUrl }) {
    if (!$media) {
      throw new Error("The element was not found!");
      return;
    }

    this._betamaxCorePlayer = new BetaMaxCore(
      new BetaMaxDom({ $media, mediaUrl })
    );

    this.useMiddlewares();
  }

  useMiddlewares() {
    this._betamaxCorePlayer.use(FooMiddleware);
  }

  onStateChange(callback) {
    this._betamaxCorePlayer.onStateChange(callback);
  }

  render() {
    this._betamaxCorePlayer.render();
  }
}

export { BetaMaxPlayerHTML as default, BetaMaxPlayerHTML };
