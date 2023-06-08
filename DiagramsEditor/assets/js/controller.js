import { Drawer } from "./drawer.js";

export class Controller {
   // Props:
   names = [];                      // - масив імен кандидатів 
   results = [];                    // - масив результатів кожного кандидату  
   source = 'server/data.json';     // -  шлях до разташування файлу із даними
   drawer = new Drawer();           // - об'єкт - екземпляр класу Drawer

   // Конструктор об'єктів:
   constructor() {
      console.log('Controller -> OK');
   }

   // Метод завантаження даних із JSON-файлу:
   loadData() {
      $.getJSON(this.source, (json) => {
         console.log(json.results);
         let out = '';
         let name = '';
         let result = 0;
         // Створюємо Цикл 'for of' ->
         for (let item of json.results) {
            name = item.name;
            result = item.result;
            this.names.push(name);
            this.results.push(result);
            // ->
            out += `
                <tr>
                   <td>${name}</td>
                   <td>${result}</td>
                </tr>
            `;
         }
         // ->
         $("tbody").html(out);
         console.log(this.names);
         console.log(this.results);
      });

   }

   // Метод очистки даних:
   resetData() {
      $("tbody").html('');
      this.names.length = 0;
      this.results.length = 0;
      this.drawer.initCanvas();
   }

   // Активуємо Завантаження даних:
   activateLoadButton() {
      $('#load-btn').click(() => {
         console.log('LoadButton -> Click');
         this.loadData();
      });
   }

   // Очищуем  дані:
   activateResetButton() {
      $('#reset-btn').click(() => {
         console.log('ResetButton -> Click');
         this.resetData();
      });
   }

   activateRectButton() {
      $('#rect-btn').click(() => {
         console.log('RectButton -> Click');
         let context = this.drawer.context
         this.drawer.buildRectangles(context, this.results, this.names);
      });
   }

   activateCircleButton() {
      $('#circle-btn').click(() => {
           console.log('CircleButton -> Click');
           let context = this.drawer.context;
           this.drawer.buildPies(context,this.results,this.names);
      });
   }
}