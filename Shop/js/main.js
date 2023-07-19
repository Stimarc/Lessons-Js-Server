const doc = document;
const urls = {
  products: 'http://localhost:3000/products',
  cart: 'http://localhost:3000/cart',
};
const productsSelector = '.products';
const btnCart = doc.querySelector('.mini-cart');

const productsPerPageSelect = doc.querySelector('.productPerPage select');
const pages = doc.querySelector('.pages');

let products = [];
let cart = {};

let isCart = false;
let isAuth = false;

let activePaginationPage = 1;

// MAIN BLOCK =========================

renderLoginBtn('.user-action', 'login');
renderAddProductBtn('.user-action', 'add-product');
// renderLoginForm('body', 'modal-window');

// queries
fetch(urls.products)
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products, productsSelector);
    renderPagination(products, '.pages');
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
};

productsPerPageSelect.onchange = function() {
  renderPagination(products, '.pages');
};

// FUNCTIONS -------------------------------------
function renderPagination(dataArr, insertSelector) {
  const parentEl = doc.querySelector(insertSelector,);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  let productPerPage = productsPerPageSelect
    ? productsPerPageSelect?.value
    : 4;

  if (productPerPage === 'all') {
    productPerPage = dataArr.length;
  }

  let pageCount = Math.ceil(dataArr.length / productPerPage);

  parentEl.innerHTML = '';
  for (let count = 1; count <= pageCount; count ++) {
    const page = doc.createElement('li');

    page.className = (count === activePaginationPage) ? 'page active' : 'page';
    page.innerText = count;

    parentEl.append(page);
  }

  console.log(`Products per page: ${productPerPage}`);
  console.log(`Page count: ${pageCount}`);
}

function renderLoginForm(insertSelector, renderClassName) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const modalWindow = renderModalWindow('body', 'modal-window', 'Enter auth data');

  const loginForm = doc.createElement('form');
  const loginInput = doc.createElement('input');
  const pwdInput = doc.createElement('input');
  const submitBtn = doc.createElement('button');

  loginInput.name = 'login';
  loginInput.placeholder = 'enter login';

  pwdInput.name = 'pwd';
  pwdInput.placeholder = 'enter pwd';
  pwdInput.type = 'password';

  submitBtn.innerText = 'login';

  loginForm.append(loginInput, pwdInput, submitBtn);

  modalWindow.append(loginForm);

  submitBtn.onclick = function () {
    const login = loginInput.value;
    const password = pwdInput.value;

    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        const users = data.users;
        const user = users.find((u) => u.login === login && u.pwd === password);

        if (user) {
          isAuth = true;
          renderLoginBtn('.user-action', 'login');
          renderAddProductBtn('.user-action', 'add-product');
        } else {
          alert('Невірний логін або пароль');
        }
      });
  };
}


function renderLoginBtn(insertSelector, renderClassName) {
  const el = checkPresentElements(insertSelector, renderClassName);
  if (!el) {
    return false;
  }

  const loginBtn = doc.createElement('button');

  loginBtn.className = `${renderClassName} button-icon`;

  loginBtn.dataset.title = !isAuth ? 'login' : 'logout';

  loginBtn.innerHTML = !isAuth
    ? '<i class="fa-solid fa-right-to-bracket"></i>'
    : '<i class="fa-solid fa-right-from-bracket"></i>';

  el.before(loginBtn);

  // events
  loginBtn.onclick = !isAuth ? loginBtnHandler : logoutBtnHandler;
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

  const product = doc.createElement('div');
  const productImgWrap = doc.createElement('div');
  const productImg = doc.createElement('img');
  const productTitle = doc.createElement('h3');
  const productPriceBlock = doc.createElement('div');
  const productPrice = doc.createElement('span');
  const addCart = doc.createElement('button');
  const productCategory = doc.createElement('span');

  const { id, title, category, img, price } = prodObj;
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
  addCart.innerHTML = 'Add cart';
  productPriceBlock.append(productPrice, addCart);

  productCategory.className = 'product-category';
  productCategory.innerText = category;

  product.append(productImgWrap, productTitle, productPriceBlock, productCategory);

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

  const cartTitle = doc.createElement('h3');
  const cartProds = doc.createElement('ul');
  const cartCloseBtn = doc.createElement('button');

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
  };
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

  for (let id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(count, prod, qty, insertSelector);
    count++;
  }
}

function renderCartProd(count, prodObj, cartProdQty, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const product = doc.createElement('li');
  const productNumber = doc.createElement('span');
  const productTitle = doc.createElement('h4');

  const productQty = doc.createElement('label');
  const productQtySpinerPlus = doc.createElement('span');
  const productQtyInput = doc.createElement('input');
  const productQtySpinerMinus = doc.createElement('span');

  const productPrice = doc.createElement('span');
  const productSum = doc.createElement('span');
  const productDel = doc.createElement('button');

  const { id, title, price } = prodObj;
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

  productQty.append(productQtySpinerPlus, productQtyInput, productQtySpinerMinus);

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
    const quantity = parseInt(input.value);
    const newQuantity = quantity + 1;
    input.value = newQuantity;

    updateCartQuantity(id, newQuantity);
    updateCartProductSum(productSum, newQuantity);
    updateTotalSum();
  };

  productQtySpinerMinus.onclick = function() {
    const input = this.parentNode.querySelector('input');
    const quantity = parseInt(input.value);
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      input.value = newQuantity;

      updateCartQuantity(id, newQuantity);
      updateCartProductSum(productSum, newQuantity);
      updateTotalSum();
    }
  };

  productDel.onclick = function() {
    const id = this.closest('.cart-prod').dataset.id;
    delete cart[id];
    this.closest('.cart-prod').remove();
    updateTotalSum();
  };
}

function updateCartQuantity(id, quantity) {
  cart[id] = quantity;
}

function updateCartProductSum(element, quantity) {
  const id = element.closest('.cart-prod').dataset.id;
  const prodObj = products.find(item => item.id == id);
  const newSum = prodObj.price * quantity;
  element.innerText = newSum;
}

function saveCartToServer() {
  fetch(urls.cart, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(cart),
  });
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const totalValue = doc.createElement('span');
  totalValue.className = 'cart-total-value';
  totalValue.innerText = totalSum;

  parentEl.append(totalValue);
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

function updateTotalSum() {
  const totalSum = getTotalCartSum(products, cart);
  const totalValue = doc.querySelector('.cart-total-value');
  if (totalValue) {
    totalValue.innerText = totalSum;
  }
}

function renderModalWindow(insertSelector, renderClassName, title) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const modalWindow = doc.createElement('div');
  const modalWindowTitle = doc.createElement('h3');
  const modalWindowContent = doc.createElement('div');
  const modalWindowCloseBtn = doc.createElement('button');

  modalWindow.className = renderClassName;

  modalWindowTitle.className = `${renderClassName}-title`;
  modalWindowTitle.innerText = title;

  modalWindowContent.className = `${renderClassName}-content`;

  modalWindowCloseBtn.className = `${renderClassName}-close-btn`;
  modalWindowCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  parentEl.prepend(modalWindow);
  modalWindow.append(modalWindowTitle, modalWindowContent, modalWindowCloseBtn);

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
  const loginInput = doc.querySelector('input[name="login"]');
  const pwdInput = doc.querySelector('input[name="pwd"]');

  const login = loginInput.value;
  const password = pwdInput.value;

  fetch('/db.json')
    .then(res => res.json())
    .then(data => {
      const users = data.users;
      const user = users.find(u => u.login === login && u.pwd === password);

      if (user) {
        isAuth = true;
        renderLoginBtn('.user-action', 'login');
        renderAddProductBtn('.user-action', 'add-product');
      } else {
        alert('Невірний логін або пароль');
      }
    });
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
          'Content-type': 'application/json',
        },
        body: JSON.stringify(cart),
      });
    });
}
