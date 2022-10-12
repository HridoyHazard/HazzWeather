function BackgroundColor(data) {
  let id = 0;
  if (!Array.isArray(data) && data.list[0].weather[0].id) {
    id = data.list[0].weather[0].id;
  }
  function getColorCode(weatherId) {
    // id classification https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return '#0294B3'; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return '#6B6B6B'; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return '#7D5D8C'; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return '#c9fcff'; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return '#7E762B'; // strong wind
    } else if (weatherId === 800) {
      return '#006DA6'; // clear day Color
    } else {
      return '#a6ddf0'; // cloudy day
    }
  }

  return getColorCode(Number(id));
}

export default BackgroundColor;
