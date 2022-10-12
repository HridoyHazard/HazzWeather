import ReactPlayer from 'react-player';

function BackgroundSound({ weather, soundEnabled }) {
  function getVideoUrl(weatherId) {
    // id classification https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return 'https://www.youtube.com/watch?v=T-BOPr7NXME'; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return 'https://www.youtube.com/watch?v=fQaLtT1zfsc'; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return 'https://www.youtube.com/watch?v=ZUFK0WXJyp0'; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'https://www.youtube.com/watch?v=qSf0lca9BPw'; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'https://www.youtube.com/watch?v=ZD47Mhzm-CU'; // strong wind
    } else if (weatherId === 800) {
      return 'https://www.youtube.com/watch?v=HHHBF9vh4mE'; // clear day sound
    } else {
      return 'https://www.youtube.com/watch?v=PXiyzTf5oaw'; // cloudy day
    }
  }

  return (
    <ReactPlayer
      width={0}
      height={0}
      playing={soundEnabled}
      loop={true}
      url={getVideoUrl(Number(weather.id))}
    />
  );
}

export default BackgroundSound;
