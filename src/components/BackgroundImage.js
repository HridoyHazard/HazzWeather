function BackgroundImage(data) {
  let id = 0;
  if (!Array.isArray(data) && data.list[0].weather[0].id) {
    id = data.list[0].weather[0].id;
  }
  function getImageUrl(weatherId) {
    // id classification https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return 'https://i.gifer.com/Rnim.gif'; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return 'https://i.gifer.com/Rhhw.gif'; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return 'https://i.gifer.com/7scx.gif'; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'https://i.gifer.com/YY5R.gif'; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'https://i.gifer.com/604.gif'; // strong wind
    } else if (weatherId === 800) {
      return 'https://i.gifer.com/Lx0q.gif'; // clear day Image
    } else {
      return 'https://i.gifer.com/fyCe.gif'; // cloudy day
    }
  }

  return getImageUrl(Number(id));
}

export default BackgroundImage;
