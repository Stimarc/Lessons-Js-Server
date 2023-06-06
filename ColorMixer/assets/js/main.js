import { Controller } from "./controller.js";

$(document).ready(() => {

     // 1
     console.log('ColorMixer -> Start');
      let controller = new Controller();

      // 2
      controller.redInit();
      controller.greenInit();
      controller.blueInit();

      // 3
      controller.mixColors();

});