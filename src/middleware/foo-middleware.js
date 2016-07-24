const fooMiddleware = function(eventName, evt, core) {
  console.log(`middleware eventName: ${eventName}`);
  console.log(`middleware evt:`, evt);
  console.log(`middleware core:`, this);

  if (eventName === this.renderer.events.BEFORE_LOAD) {
    console.warn("*** Track the BEFORE_LOAD event");
    // this.setState({
    //   mediaUrl: 'https://vp.nyt.com/video/2016/07/23/41649_1_24munich-witnesses_wg_360p.mp4',
    //   config: {
    //     autoplay: true
    //   }
    // });
    this.renderer.state.mediaUrl = 'https://vp.nyt.com/video/2016/07/23/41649_1_24munich-witnesses_wg_360p.mp4';
    this.renderer.state.$media.setAttribute('autoplay', true);
    this.renderer.onLoadMedia();
    return false;
  }

  return true;
};

export { fooMiddleware as default, fooMiddleware };
