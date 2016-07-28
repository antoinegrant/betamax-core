const fooMiddleware = function(eventName, evt) {

  if (eventName === this.renderer.events.BEFORE_LOAD) {
    this.prevState = Object.assign({}, this.renderer.state);

    this.setState({
      isAd: true,
      mediaUrl: 'http://localhost:3000/ad.mp4',
    });

    return false;
  } else if (eventName === this.renderer.events.ENDED) {

    this.setState({
      isAd: false,
      mediaUrl: this.prevState.mediaUrl,
    });

    return false;
  }

  return true;
};

export { fooMiddleware as default, fooMiddleware };
