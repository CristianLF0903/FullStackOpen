import axios from "axios";

const API_KEY = import.meta.env.VITE_API_WEATHER_KEY;
// console.log("API_KEY", API_KEY);
const baseURL = "https://api.weatherbit.io/v2.0/current";

const getWeather = (country) => {
  const response = axios.get(baseURL, {
    params: {
      key: API_KEY,
      lon: country.latlng[1],
      lat: country.latlng[0],
      lang: "es",
    },
  });
  return response.then((response) => {
    response.data;
  });
};
export default { getWeather };
