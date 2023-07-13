const doc = document;
const urls = {
  products: 'http://localhost:3000/products',
  cart: 'http://localhost:3000/cart',
};
const productsSelector = '.products';
const btnCart = doc.querySelector('.mini-cart');

let products = [];
let cart = {};

let isCart = false;
let isAuth = true;

// MAIN BLOCK =========================

renderLoginBtn('.user-action', 'login');
renderAddProductBtn('.user-action', 'add-product');
renderLoginForm('body', 'modal-window');

// queries
fetch(urls.products)
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products, productsSelector);
  });

// events
btnCart.onclick = function() {
  if (!isCart) {

    fetch(urls.cart)
      .then(res => res.json())
      .then(data => {
        cart = data;
        renderCart(products, cart, 'body');
      });
    
  } else {
    closeCart('.cart');
  }
}

// FUNCTIONS -------------------------------------
function renderLoginForm(insertSelector, renderClassName) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const modalWindow = renderModalWindow('body', 'modal-window', 'Enter auth data');
  
  const 
    loginForm  = doc.createElement('form'),
    loginInput = doc.createElement('input'),
    pwdInput = doc.createElement('input'),
    submitBtn = doc.createElement('button');

  loginInput.name = 'login';
  loginInput.placeholder = 'enter login';

  pwdInput.name = 'pwd';
  pwdInput.placeholder = 'enter pwd';
  pwdInput.type = 'password';

  submitBtn.innerText = 'login';

  loginForm.append(
    loginInput,
    pwdInput,
    submitBtn
  );

  modalWindow.append(loginForm);
}


function renderLoginBtn(insertSelector, renderClassName) {
  const el = checkPresentElements(insertSelector, renderClassName);
  if (!el) {
    return false;
  }

  const loginBtn = doc.createElement('button');

  loginBtn.className = `${renderClassName} button-icon`;
  
  loginBtn.dataset.title = !isAuth 
    ? 'login'
    : 'logout';
  
  loginBtn.innerHTML = !isAuth
    ? '<i class="fa-solid fa-right-to-bracket"></i>'
    : '<i class="fa-solid fa-right-from-bracket"></i>'

  el.before(loginBtn);

  // events
  loginBtn.onclick = !isAuth
    ? loginBtnHandler
    : logoutBtnHandler;
}

function renderAddProductBtn(insertSelector, renderClassName) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  if (!isAuth) {
    return;
  } 

  const addProduct = doc.createElement('button');

  addProduct.className = `${renderClassName} button-icon`;
  addProduct.innerHTML = '<i class="fa-solid fa-calendar-plus"></i>';

  parentEl.prepend(addProduct);
}



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
  productTitle.innerHTML = title;

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

  let cart = doc.querySelector('.cart');
  if (cart) {
    cart.remove();
  }

  const 
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul');
    cartCloseBtn = doc.createElement('button');

  const totalSum = getTotalCartSum(dataArr, cartProdsObj);

  isCart = true;

  cart = doc.createElement('div');
  cart.className = 'cart modal-window';

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  cartCloseBtn.className = 'modal-window-close-btn';
  cartCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  parentEl.prepend(cart);
  cart.append(cartTitle, cartProds, cartCloseBtn);

  // render cart component
  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(totalSum, '.cart');

  // cart events
  cartCloseBtn.onclick = function() {
    closeCart('.cart');
  }
}

function closeCart(insertSelector) {
  const cart = doc.querySelector(insertSelector);

  if (cart) {
    cart.remove();
  }

  isCart = false;
}

function renderCartProds(dataArr, cartProdsObj, insertSelector) {
  let count = 1;

  for (id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(count, prod, qty, insertSelector);
    count ++;
  }
}

function renderCartProd(count, prodObj, cartProdQty, insertSelector) {
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
    pruductDel = doc.createElement('button');

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
  productQtySpinerPlus.innerHTML = '<i class="fa-solid fa-plus"></i>'
  productQtyInput.value = cartProdQty;
  productQtySpinerMinus.className = 'cart-prod-qty-spinner spinner-minus';
  productQtySpinerMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

  productPrice.className = 'cart-prod-price';
  productPrice.innerText = price;

  productSum.className = 'cart-prod-sum';
  productSum.innerText = productSumValue;

  pruductDel.className = 'cart-prod-del';
  pruductDel.innerHTML = '<i class="fa-solid fa-trash"></i>';

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
    pruductDel
  );

  parentEl.append(product);
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  console.log(totalSum);
  console.log(insertSelector);
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

function renderModalWindow(insertSelector, renderClassName, title) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const 
    modalWindow = doc.createElement('div'),
    modalWindowTitle = doc.createElement('h3'),
    modalWindowContent = doc.createElement('div'),
    modalWindowCloseBtn = doc.createElement('button');

  modalWindow.className = renderClassName;

  modalWindowTitle.className = `${renderClassName}-title`;
  modalWindowTitle.innerText = title;

  modalWindowContent.className = `${renderClassName}-content`;

  modalWindowCloseBtn.className = `${renderClassName}-close-btn`;
  modalWindowCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  parentEl.prepend(modalWindow);
  modalWindow.append(
    modalWindowTitle,
    modalWindowContent,
    modalWindowCloseBtn
  );

  // events

  modalWindowCloseBtn.onclick = function() {
    modalWindow.remove();
  };

  return modalWindowContent;
}

// additional function
function checkPresentElements(insertSelector, renderClassName) {
  const el = doc.querySelector(insertSelector);
  const renderEl = doc.querySelector('.' + renderClassName);

  renderEl && renderEl.remove();

  if (!el) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  return el;
}

// HANDLERS
function loginBtnHandler() {


  isAuth = true;

  renderLoginBtn('.user-action', 'login');
  renderAddProductBtn('.user-action', 'add-product');
}

function logoutBtnHandler() {
  isAuth = false;

  renderLoginBtn('.user-action', 'login');
  renderAddProductBtn('.user-action', 'add-product');
}

function addCartHandler() {
  const id = this.closest('.product').dataset.id;
  
  fetch(urls.cart)
  .then(res => res.json())
  .then(data => {
    cart = data;
    cart[id] = !cart[id] ? 1 : cart[id] + 1;

    fetch(urls.cart, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(cart)
    });

  });
  
}