const dogImageElement = document.getElementById('dogImage');
const fetchRandomButton = document.getElementById('fetchRandomButton');
const breedSelect = document.getElementById('breedSelect');
const fetchBreedButton = document.getElementById('fetchBreedButton');
const fetchBreedRandomDogButton = document.getElementById('fetchBreedRandomDogButton');
const breedGallery = document.getElementById('breedGallery');

fetchRandomButton.addEventListener('click', fetchRandomDogImage);
fetchBreedButton.addEventListener('click', fetchBreedDogImages);
fetchBreedRandomDogButton.addEventListener('click', fetchBreedRandomDogImage);

async function fetchRandomDogImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        
        const imageUrl = data.message;
        dogImageElement.src = imageUrl;
        dogImageElement.alt = 'Random Dog';
    } catch (error) {
        console.error('Error fetching dog image:', error);
    }
}

async function fetchBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();

        const breeds = Object.keys(data.message);
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}

async function fetchBreedDogImages() {
    const selectedBreed = breedSelect.value;
    if (!selectedBreed) return;

    try {
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
        const data = await response.json();
        
        breedGallery.innerHTML = '';

        data.message.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = selectedBreed;
            breedGallery.appendChild(img);
        });
    } catch (error) {
        console.error(`Error fetching ${selectedBreed} dog images:`, error);
    }
}

async function fetchBreedRandomDogImage() {
    const selectedBreed = breedSelect.value;
    if (!selectedBreed) return;

    try {
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
        const data = await response.json();
        
        const imageUrl = data.message;
        dogImageElement.src = imageUrl;
        dogImageElement.alt = selectedBreed;
    } catch (error) {
        console.error(`Error fetching ${selectedBreed} random dog image:`, error);
    }
}

fetchRandomDogImage();
fetchBreeds();
