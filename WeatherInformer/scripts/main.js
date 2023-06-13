import { Controller } from "./controller.js";

$(document).ready(() => {

    //1
    console.log('WeatherInformer -> Start');
    let controller =  new Controller();

    //2
    controller.activateGetWeather();
    controller.activateResWeather();

});
