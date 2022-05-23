import API from "./API";

export default {
  getWeather() {
    return API().get("/weather?q=japan&appid=2a43e938926fdd0132133cabaf940071");
  },
};
