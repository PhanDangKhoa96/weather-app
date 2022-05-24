import API from "./API";
import { api_key } from "./api_key";

export default {
  getWeather(city: string) {
    return API().get(`/weather?q=${city}&appid=${api_key}`);
  },
};
