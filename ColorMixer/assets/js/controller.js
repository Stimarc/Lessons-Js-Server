export class Controller {

     constructor() {
        console.log('Controller -> OK');
     }
    mixColors() {

    }

    redInit() {
        console.log('redInit -> OK');
        $('#red-slider').slider({
            orientation: 'vertical',
            range: 'min',
            min: 0,
            max: 255,
            value: 150,
            width: 100,
            slide: function (event,ui) {
                $('#red-label').text(ui.value);
                // this.mixColors();
            }
        });
    }

    greenInit() {
        console.log('greenInit -> OK');
        $('#green-slider').slider({
            orientation: 'vertical',
            range: 'min',
            min: 0,
            max: 255,
            value: 150,
            width: 100,
            slide: function (event,ui) {
                $('#green-label').text(ui.value);
                // this.mixColors();
            }
        });
    }

    blueInit() {
        console.log('blueInit -> OK');
        $('#blue-slider').slider({
            orientation: 'vertical',
            range: 'min',
            min: 0,
            max: 255,
            value: 150,
            width: 100,
            slide: function (event,ui) {
                $('#blue-label').text(ui.value);
                // this.mixColors();
            }
        });
    }

}