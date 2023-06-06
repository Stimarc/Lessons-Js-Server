import { Controller } from './controller.js';


$(document).ready(() => {

    //1
    console.log('jquery -> Ok');
    const controller = new Controller();


    //2
    controller.activateLoadButton();
    controller.activateResetButton();
    controller.activaRectButton();
});