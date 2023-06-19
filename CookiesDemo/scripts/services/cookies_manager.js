export class CookiesManager {

    static setCookie(key,val,exp) {
        let _key = encodeURIComponent(key);
        let _val = encodeURIComponent(val);
        let _exp = parseInt(exp) * 24 * 3600;
        // ->
        let cookie_string = `${_key}=${_val}`
        if (_exp > 0) {
            cookie_string += `; max-age=${_exp}`;
        }
        // ->
        document.cookie = cookie_string;
        let message = `Запис: ${key}=${val} - успішно збережений на термін ${exp} днів!`;
        alert(message);
    }

    static getCookies() {
        let cookies = document.cookie;
        console.log(cookies);
        let parts = cookies.split(';');
        console.log(parts);
        let display_html = '';
        // ->
        for (let item of parts) {
            let params = item.trim().split('=');
            let _key = decodeURIComponent(params[0]);
            let _val = decodeURIComponent(params[1]);
            // ->
            display_html += `
                <tr>
                   <td>${_key}<td>
                   <td>${_val}<td>
                <tr>
            `;
        }
        // ->
        return display_html;
    }

    static searchCookie(searchKey) {
        let cookies = document.cookie;
        let parts = cookies.split(';');
        let displayHtml = '';
    
        for (let item of parts) {
          let params = item.trim().split('=');
          let _key = decodeURIComponent(params[0]);
          let _val = decodeURIComponent(params[1]);
    
          if (_key === searchKey) {
            displayHtml += `
              <tr>
                <td>${_key}</td>
                <td>${_val}</td>
              </tr>
            `;
          }
        }
    
        return displayHtml;
      }
}