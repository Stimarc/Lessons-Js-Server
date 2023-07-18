const doc = document;
const formFile = doc.forms.formFile;
const inputFile = formFile.file;

const previewEl =doc.querySelector('preview');

inputFile.onchange = function() {
    const imgName = this.files[0] ? this.files[0].name :'no-image.jpg';

    const img = doc.createElement('img');
    img.src = `.img/${imgName}`;

    previewEl.append(img);
}

formFile.onsubmit = (e) => {
    e.preventDefault();
    const imgName = inputFile.files[0] ? inputFile.files[0] : 'no-image.jpg';
    

    console.dir(imgName);
}