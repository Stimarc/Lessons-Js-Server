import { WeatherModel } from "./weather_model.js";
import { Visualizer } from "./visualizer.js";

export class Controller {
  activateGetWeather() {
    $('#get-weather').click(() => {
      console.log('GetWeatherButton -> Click');
      let cityName = $('#city').val();
      let apiKey = 'efe03451fc984973a37173946231306';
      let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=2`;

      if (cityName === '') {
        alert('Ви не заповнили поле із назвою міста!');
        $('#city').focus();
      } else {
        $.getJSON(apiUrl, (data) => {
          console.log('API -> OK');
          console.log(data);

          let weather = new WeatherModel(data);
          console.log(weather);

          let visualizer = new Visualizer();
          $('#display').html(visualizer.generateHtml(weather));
        })
          .error(() => {
            alert('Прогноз погоди для заданого міста не знайдено!');
          });
      }
    });
  }

  activateResWeather() {
    $('#res-weather').click(() => {
      console.log('ResWeatherButton -> Click');
      $('#city').val('');
      $('#display').html('');
      $('#city').focus();
    });
  }
}

