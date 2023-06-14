import { Controller } from "./controller.js";

$(document).ready(() => {
  console.log('WeatherInformer -> Start');
  let controller = new Controller();

  controller.activateGetWeather();
  controller.activateResWeather();
});
