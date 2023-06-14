export class Visualizer {
     generateHtml(weather) {
       const icon = weather.getIcon();
       const description = weather.getDescription();
       const temperatures = weather.getTemperatures();
   
       let html = `
         <div class="weather-info">
           <div class="weather-icon">
             <img src="${icon}" alt="Weather Icon">
           </div>
           <div class="weather-description">${description}</div>
           <div class="temperature">
             <div class="time">9:00</div>
             <div class="temperature-value">${temperatures['9:00']}°C</div>
           </div>
           <div class="temperature">
             <div class="time">14:00</div>
             <div class="temperature-value">${temperatures['14:00']}°C</div>
           </div>
           <div class="temperature">
             <div class="time">19:00</div>
             <div class="temperature-value">${temperatures['19:00']}°C</div>
           </div>
         </div>
       `;
   
       return html;
     }
   }
   