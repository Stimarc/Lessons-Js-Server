const doc = document;
const productsSelector = '.products';
const cart = {
  1: 2,
  2: 1,
  4: 5,
};

renderProducts(products, productsSelector);
renderCart(products, cart, 'body');

function renderProducts(dataArr, insertSelector) {
  for (let product of dataArr) {
    renderProduct(product, insertSelector);
  }
}

function renderProduct(prodObj, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const 
    product = doc.createElement('div'),
    productImgWrap = doc.createElement('div'),
    productImg = doc.createElement('img'),
    productTitle = doc.createElement('h3'),
    productPriceBlock = doc.createElement('div'),
    productPrice = doc.createElement('span'),
    addCart = doc.createElement('button'),
    productCategory = doc.createElement('span');

  const {id, title, category, img, price} = prodObj;
  const imgPath = `./img/products/${category}/${img}`;

  product.className = 'product';
  product.dataset.id = id;

  productImgWrap.className = 'product-img';
  productImg.src = imgPath;
  productImg.alt = img;
  productImgWrap.append(productImg);

  productTitle.className = 'product-title';
  productTitle.innerText = title;

  productPriceBlock.className = 'product-price-block';
  productPrice.className = 'product-price';
  productPrice.innerHTML = price;
  
  addCart.className = 'add-cart';
  addCart.innerHTML = 'Add cart'
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

  // events
  addCart.onclick = addCartHandler;
}

function renderCart(dataArr, cartProdsObj, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  let cartElement = doc.querySelector('.cart');
  if (cartElement) {
    cartElement.remove();
  }

  cartElement = doc.createElement('div');

  const 
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul');

  const totalSum = getTotalCartSum(dataArr, cartProdsObj);

  cartElement.className = 'cart';

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.prepend(cartElement);
  cartElement.append(cartTitle, cartProds);

  // render cart component
  renderCartProds(dataArr, cartProdsObj, '.cart-prods', dataArr, cartProdsObj);
  renderCartTotal(totalSum, '.cart');
}

function renderCartProds(dataArr, cartProdsObj, insertSelector, dataArr, cartProdsObj) {
  let count = 1;

  for (let id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(count, prod, qty, insertSelector, dataArr, cartProdsObj);
    count ++;
  }
}

function renderCartProd(count, prodObj, cartProdQty, insertSelector, dataArr, cartProdsObj) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const 
    product = doc.createElement('li'),
    productNumber = doc.createElement('span'),
    productTitle = doc.createElement('h4'),

    productQty = doc.createElement('label'),
    productQtySpinerPlus = doc.createElement('span'),
    productQtyInput = doc.createElement('input'),
    productQtySpinerMinus = doc.createElement('span'),

    productPrice = doc.createElement('span'),
    productSum = doc.createElement('span'),
    productDel = doc.createElement('button');

  const {id, title, price} = prodObj;
  const productSumValue = cartProdQty * price;

  product.className = 'cart-prod';
  product.dataset.id = id;

  productNumber.className = 'cart-prod-number';
  productNumber.innerText = count;

  productTitle.className = 'cart-prod-title';
  productTitle.innerText = title;

  productQty.className = 'cart-prod-qty';
  productQtySpinerPlus.className = 'cart-prod-qty-spinner spinner-plus';
  productQtySpinerPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';


  productQtyInput.value = cartProdQty;
  productQtySpinerMinus.className = 'cart-prod-qty-spinner spinner-minus';
  productQtySpinerMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

  productPrice.className = 'cart-prod-price';
  productPrice.innerText = price;

  productSum.className = 'cart-prod-sum';
  productSum.innerText = productSumValue;

  productDel.className = 'cart-prod-del';
  productDel.innerHTML = '<i class="fa-solid fa-trash"></i>';

  productQty.append(
    productQtySpinerPlus,
    productQtyInput,
    productQtySpinerMinus
  );

  product.append(
    productNumber,
    productTitle,
    productQty,
    productPrice,
    productSum,
    productDel
  );

  parentEl.append(product);

  productQtySpinerPlus.onclick = function() {
    const input = this.parentNode.querySelector('input');
    const id = this.closest('.cart-prod').dataset.id;
    const prod = dataArr.find(item => item.id == id);

    let qty = parseInt(input.value);
    if (qty < 10) {
      qty++;
      input.value = qty;
      productSum.innerText = prod.price * qty;
      cartProdsObj[id] = qty;
      updateTotalSum();
    }
  };

  productQtySpinerMinus.onclick = function() {
    const input = this.parentNode.querySelector('input');
    const id = this.closest('.cart-prod').dataset.id;
    const prod = dataArr.find(item => item.id == id);

    let qty = parseInt(input.value);
    if (qty > 1) {
      qty--;
      input.value = qty;
      productSum.innerText = prod.price * qty;
      cartProdsObj[id] = qty;
      updateTotalSum();
    }
  };

  productDel.onclick = function() {
    const id = this.closest('.cart-prod').dataset.id;
    delete cartProdsObj[id];
    this.closest('.cart-prod').remove();
    updateTotalSum();
  };
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const cartTotal = doc.createElement('div');
  const totalText = doc.createElement('span');
  const totalValue = doc.createElement('span');

  cartTotal.className = 'cart-total';
  totalText.innerText = 'total: ';
  totalValue.className = 'cart-total-value';
  totalValue.innerText = totalSum;

  cartTotal.append(totalText, totalValue);
  parentEl.append(cartTotal);
}

function updateTotalSum() {
  const totalSum = getTotalCartSum(products, cart);
  const totalValue = doc.querySelector('.cart-total-value');
  if (totalValue) {
    totalValue.innerText = totalSum;
  }
}

function getTotalCartSum(dataArr, cartProdsObj) {
  let total = 0;

  for (let id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);
    const cost = prod.price * qty;

    total += cost;
  }

  return total;
}

// events
function addCartHandler() {
  const id = this.closest('.product').dataset.id;

  cart[id] = !cart[id] ? 1 : cart[id] + 1;
}
