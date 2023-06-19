import { Controller } from './services/controller.js';


$(document).ready(() => {

    // 1
    console.log('CookiesDemo -> Start ');
    let controller = new Controller();

    // 2
    controller.activateCreateButton();
    controller.activateDisplayButton();
    controller.activateSearchButton();
    // 3
    controller.activateChangeButton();
    controller.activateDeleteButton();
    controller.activateResetButton();

});