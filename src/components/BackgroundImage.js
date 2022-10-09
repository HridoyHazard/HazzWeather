import LakeBackground from "../asset/main_bg.jpg";
function BackgroundImage(data) {
  let id = 0;
  if (!Array.isArray(data) && data.list[0].weather[0].id) {
    id = data.list[0].weather[0].id;
  }
  function getImageUrl(weatherId) {
    // id classification https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return "https://images.unsplash.com/photo-1551234250-d88208c2ce14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return "https://i.pinimg.com/564x/b6/1f/a4/b61fa44945f218a3b004f5f4f11d39aa.jpg"; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return "https://physicsworld.com/wp-content/uploads/2019/09/rain-flora-1463530-CC0_Bibhukalyan-Acharya.jpg"; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return "https://media.istockphoto.com/photos/wind-blown-coconut-palm-trees-picture-id177047442?k=20&m=177047442&s=612x612&w=0&h=E_CsB1ykHQzqLAMfZ8QBjCPd18Tzq5B0izs9-IDx164="; // strong wind
    } else if (weatherId === 800) {
      return "https://images.unsplash.com/photo-1574080913417-749f6fd852f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"; // clear day Image
    } else {
      return LakeBackground; // cloudy day
    }
  }

  return getImageUrl(Number(id));
}

export default BackgroundImage;