const doc = document;

// 1 Rendering
function renderProductCards(products) {
  const productContainer = doc.getElementById('product-container');

  productContainer.innerHTML = '';

  products.forEach((product) => {
    const card = doc.createElement('div');
    card.classList.add('product-card');

    const image = doc.createElement('img');
    image.classList.add('product-image');
    image.src = `assets/img/products/${product.img}`;
    card.appendChild(image);

    const title = doc.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);

    const price = doc.createElement('p');
    price.textContent = `$${product.price}`;
    card.appendChild(price);

    productContainer.appendChild(card);
  });
}

renderProductCards(products);


// 2 Filtering
renderProductCards(products);

const categoryFilter = 'smartphones';

function filterProductsByCategory(products, category) {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

const filteredProducts = filterProductsByCategory(products, categoryFilter);
renderProductCards(filteredProducts);

// 3 Sorting
function sortProductsByPrice(products) {
  return products.sort((a, b) => a.price - b.price);
}

const sortedProducts = sortProductsByPrice(products);
renderProductCards(sortedProducts);