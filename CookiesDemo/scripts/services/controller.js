
import { Validator } from './validator.js';
import { CookiesManager } from './cookies_manager.js';

export class Controller {
  constructor() {
    console.log('Controller -> Created');
  }

  activateCreateButton() {
    $('#b1').click(() => {
      console.log('#b1 - Click');
      let key = $('#key').val();
      let val = $('#val').val();
      let exp = $('#exp').val();

      if (Validator.validateFields(key, val, exp)) {
        CookiesManager.setCookie(key, val, exp);
        $('tbody').html(CookiesManager.getCookies());
      }
    });
  }

  activateDisplayButton() {
    $('#b2').click(() => {
      console.log('#b2 - Click');
      $('tbody').html(CookiesManager.getCookies());
    });
  }

  activateSearchButton() {
    $('#b3').click(() => {
      console.log('#b3 - Click');
      let searchKey = $('#searchKey').val();
      $('tbody').html(CookiesManager.searchCookie(searchKey));
    });
  }

  activateChangeButton() {
    $('#b4').click(() => {
      console.log('#b4 - Click');
    });
  }

  activateDeleteButton() {
    $('#b5').click(() => {
      console.log('#b5 - Click');
    });
  }

  activateResetButton() {
    $('#b6').click(() => {
      console.log('#b6 - Click');
    });
  }
}
