import axios from "axios";

const baseUrl: string = "https://api.openweathermap.org/data/2.5";

export default (url = baseUrl) => {
  return axios.create({
    baseURL: url,
  });
};
