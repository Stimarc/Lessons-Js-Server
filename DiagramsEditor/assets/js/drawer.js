export class Drawer {
  // Props:
  context = null;                   // - посилання на вміст графічної панелі canvas
  colors = [                        // - масив кольорів для зафарбування діаграм
    'coral', 'lightgreen', 'lightblue', 'purple', 'orange', 'lightgray',
    'darkcyan', 'bisque', 'silver', 'lavander', 'navy'
  ];
  canvasWidth = 700;
  canvasHeight = 450;

  constructor() {
    console.log('Drawer -> Created');
    this._initContext();
    this.initCanvas();
  }

  _initContext() {
    const canvas = document.getElementById('canvas-panel');
    this.context = canvas.getContext('2d');
  }

  initCanvas() {
    const logo = document.getElementById('logo-image');
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(logo, 150, 0);
  }

  _buildAxios(g) {
    g.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    g.fillStyle = 'lightgreen';
    g.lineWidth = 1;
    // ->
    g.beginPath();
    g.moveTo(10, 10);
    g.lineTo(10, this.canvasHeight - 10);
    g.lineTo(this.canvasWidth - 10, this.canvasHeight - 10);
    g.stroke();
  }

  generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  buildRectangles(g, results, names) {
    let N = results.length;
    if (N === 0) {
      alert('Ви не завантажили дані для побудови!');
    } else {
      this._buildAxios(g);
      let W = (this.canvasWidth - 20) / N - 5;
      let K = Math.max.apply(null, results) / (this.canvasHeight - 20);
      g.font = '10pt Arial';
      // ->
      for (let i = 0; i < N; i++) {
        let h = results[i] / K - 5;
        let x = i * (W + 5) + 10;
        let y = this.canvasHeight - 10 - h;
        // ->
        let color = this.generateRandomColor();
        g.fillStyle = color;
        g.fillRect(x, y, W, h);
        g.fillText(names[i], x + 5, y - 5);
      }
    }
  }

  buildPies(g,results,names) {
    let N = results.length;
    if (N === 0) {
      alert('Ви не завантажили дані для побудови!');
    } else {
        console.log('Побудова колової діаграми ...');
        let centerX = this.canvasWidth  /2;
        let centerY = this.canvasHeight /2;
        let radius = 100;
        g.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        g.strokeStyle = this.colors[5];
        g.lineWidth = 2;
        // ->
        let s = 0;
        for (let x of results) {
            s += x;
        }
        let k = s / (2 * Math.PI);
        console.log(s);
        console.log(k);
           // ->
            let lastAngle = 0;
            for (let i = 0; i < N; i++) {
            let a1 = 0;
            let a2 = 0;
            // ->
          if (i == 0) {
             a1 = 0;
             a2 = results[i]/ k;
          } else {
             a1 = lastAngle;
             a2 = lastAngle + results[i]/ k;
          }
            // ->
            lastAngle = a2;
            g.fillStyle = this.colors[i];
            // ->
            g.beginPath();
            g.moveTo(centerX,centerY);
            g.arc(centerX,centerY,radius, a1, a2);
            // ->
            g.lineTo(centerX,centerY);
            g.stroke();
            g.fill();
        }




        




  

        g.fillStyle = this.colors[2];
        g.beginPath();
        g.moveTo(centerX,centerY);
        g.arc(centerX,centerY,100, Math.PI / 4, 3 * Math.PI / 4);
        g.lineTo(centerX,centerY);
        g.stroke();
        g.fill();
    } 
  }
}
