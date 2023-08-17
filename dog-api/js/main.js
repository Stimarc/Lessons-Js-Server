const dogImageElement = document.getElementById('dogImage');
const fetchButton = document.getElementById('fetchButton');

fetchButton.addEventListener('click', fetchRandomDogImage);

function fetchRandomDogImage() {
fetch('https://dog.ceo/api/breeds/image/random')
.then(res => res.json())
.then(data => {
const imageUrl = data.message;
dogImageElement.src = imageUrl;
dogImageElement.alt = 'Random Dog';

})
.catch(error => console.error('Error fetching dog image:', error));

}


fetchRandomDogImage();