export class WeatherModel {
    constructor(data) {
      this.forecast = data.forecast.forecastday[1];
    }
  
    getIcon() {
      return this.forecast.day.condition.icon;
    }
  
    getDescription() {
      return this.forecast.day.condition.text;
    }
  
    getTemperatures() {
      const temperatures = {
        '9:00': this.forecast.hour[8].temp_c,
        '14:00': this.forecast.hour[13].temp_c,
        '19:00': this.forecast.hour[18].temp_c
      };
      return temperatures;
    }
  }
  