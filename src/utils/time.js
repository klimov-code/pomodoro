const format = (seconds) => (seconds > 9) ? seconds : '0' + seconds;

export const formatTime = (currentTime) => `${format(Math.floor(currentTime / 60 % 60))}:${format(Math.floor(currentTime % 60))}`;

export const formatTimePercent = (fullTime, currentTime) => (currentTime / fullTime);

