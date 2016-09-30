export default {

  isHlsSupported: () => {
    return (
      window.MediaSource &&
      typeof window.MediaSource.isTypeSupported === 'function' &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
    );
  },

  formatTime: (time) => {
    let currentTime
    let minutes
    let seconds

    currentTime = parseInt(time, 10);
    if (currentTime < 0) {
        currentTime = 0;
    }

    minutes = Math.floor(currentTime / 60);
    seconds = currentTime - (minutes * 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  }

}
