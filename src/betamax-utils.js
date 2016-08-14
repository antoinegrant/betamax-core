export const formatTime = (time) => {
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