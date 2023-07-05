const doc = document;
const productsSelector = '.products';
const cart = {};

for (let product of products) {
    renderProduct(product, productsSelector);
}

const categorySelector = doc.querySelector('.category-select');
categorySelector.addEventListener('change', filterProducts);

const cartButton = doc.querySelector('.cart-button');
cartButton.addEventListener('click', showCart);

function renderProduct(prodObj, insertSelector) {
    const parentEl = doc.querySelector(insertSelector);
    const
        product = doc.createElement('div'),
        productImgWrap = doc.createElement('div'),
        productImg = doc.createElement('img'),
        productTitle = doc.createElement('h3'),
        productPriceBlock = doc.createElement('div'),
        productPrice = doc.createElement('span'),
        addCart = doc.createElement('button'),
        productCategory = doc.createElement('span');

    const { id, title, category, img, price } = prodObj;
    const imgPath = `./img/products/${category}/${img}`;

    if (!parentEl) {
        console.error(`[${insertSelector}]: Parent element not found !!!`);
        return false;
    }

    product.className = 'product';
    product.dataset.id = id;

    productImgWrap.className = 'product-img';
    productImg.src = imgPath;
    productImg.alt = img;
    productImgWrap.append(productImg);

    productTitle.className = 'product-title';
    productTitle.innerHTML = title;

    productPriceBlock.className = 'product-price-block';
    productPrice.className = 'product-price';
    productPrice.innerHTML = price;
    addCart.className = 'add-cart';
    addCart.innerHTML = 'Add to cart';
    addCart.addEventListener('click', () => addToCart(prodObj));

    productPriceBlock.append(productPrice, addCart);

    productCategory.className = 'product-category';
    productCategory.innerText = category;

    product.append(
        productImgWrap,
        productTitle,
        productPriceBlock,
        productCategory
    );

    parentEl.append(product);
}

function filterProducts() {
    const selectedCategory = categorySelector.value;
    const productItems = doc.querySelectorAll('.product');

    for (let item of productItems) {
        if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

function addToCart(prodObj) {
    const { id, title, price } = prodObj;

    if (cart.hasOwnProperty(id)) {
        cart[id].quantity++;
    } else {
        cart[id] = {
            title: title,
            price: price,
            quantity: 1
        };
    }

    updateCartCount();
}

function updateCartCount() {
    const cartCount = doc.querySelector('.cart-count');
    const cartItemsCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = `Cart (${cartItemsCount})`;

    if (cartItemsCount === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}


function showCart() {
    if (Object.keys(cart).length === 0) {
        return;
    }

    const cartItems = Object.values(cart);
    let cartContent = '';

    for (let item of cartItems) {
        cartContent += `
    <div class="cart-item">
    <span>${item.title} - $${item.price} x </span>
    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity">
        <button class="cart-item-remove" data-productid="${item.id}">&times;</button>
      </div>
    `;
    }

    const cartModal = doc.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
    <div class="cart-modal-content">
      <span class="cart-modal-close">&times;</span>
      ${cartContent}
    </div>
  `;

    doc.body.appendChild(cartModal);

    const cartModalClose = doc.querySelector('.cart-modal-close');
    cartModalClose.addEventListener('click', () => {
        doc.body.removeChild(cartModal);
    });

    const cartItemQuantities = doc.querySelectorAll('.cart-item-quantity');
    const cartItemRemoves = doc.querySelectorAll('.cart-item-remove');

    cartItemQuantities.forEach((input) => {
        input.addEventListener('change', (event) => {
            const productId = event.target.parentNode.querySelector('.cart-item-remove').dataset.productid;
            const newQuantity = parseInt(event.target.value, 10);
            changeQuantity(productId, newQuantity);
        });
    });

    cartItemRemoves.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            removeFromCart(productId);
        })
    });
}

function removeFromCart(productId) {
    if (cart.hasOwnProperty(productId)) {
        delete cart[productId];
        updateCartCount();
        showCart();
    }
}

function changeQuantity(productId, newQuantity) {
    if (cart.hasOwnProperty(productId)) {
        cart[productId].quantity = newQuantity;
        updateCartCount();
        showCart();
    }
}

