const doc = document;
const page = checkPage();


switch (page) {
  case 'shop':
    renderProds(products, '.shop', shopBtnHandler);
    break;

  case 'single':
    const prodId = getProdFromLs('productId');
    renderSinglePageProd(prodId, '.products', singleBtnHandler);
    break;

  case 'order':
    const btnSubmit = doc.querySelector('button');

    console.log('order');
    btnSubmit.onclick = function() {
      const user = getUserData();
      setUserToLs(user);
    }
    break;

  case 'final':
    console.log('final');
    break;

  default:
    alert('404 page not found');
}


// FUNCITONS
function renderProds(dataArr, selector, btnHandler) {
  dataArr.forEach(prod => renderProd(prod, selector, btnHandler));
}
function renderProd(data, selector, btnHandler) {
  const { id, name, price } = data;

  const parentEl = doc.querySelector(selector);

  const prodEl = doc.createElement('div');
  const prodNameEl = doc.createElement('h3');
  const prodPriceEl = doc.createElement('p');
  const prodLinkEl = doc.createElement('button');

  prodEl.className = 'product';

  prodNameEl.innerText = name;
  prodPriceEl.innerText = price;

  prodLinkEl.innerText = 'buy';
  prodLinkEl.dataset.id = id;

  prodEl.append(
    prodNameEl,
    prodPriceEl,
    prodLinkEl
  );

  parentEl.append(prodEl);

  prodLinkEl.onclick = btnHandler;
}
function renderSinglePageProd(id, selector, btnHandler) {
  const data = products.find(prod => prod.id == id);
  console.log(id);

  renderProd(data, selector, btnHandler);
}

// checking of forms
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidName(name) {
    const nameRegex = /^[a-zA-Zа-яА-ЯіїєІЇЄ']+$/;
    return nameRegex.test(name);
  }
  
  function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  
////////////////////////////////////////////////

// forms
function isValidUserData(name, email, phone) {
    if (!isValidName(name)) {
      alert('Будь ласка, введіть коректне ім\'я.');
      return false;
    }
  
    if (!isValidEmail(email)) {
      alert('Будь ласка, введіть коректну електронну пошту.');
      return false;
    }
  
    if (!isValidPhone(phone)) {
      alert('Будь ласка, введіть коректний номер телефону.');
      return false;
    }
  
    return true;
  }

  function getUserData() {
    const name = getUserName(userForm);
    const email = getUserEmail(userForm);
    const phone = getUserPhone(userForm);
  
    if (!isValidUserData(name, email, phone)) {
      return null;
    }
  
    const user = {
      name: name,
      email: email,
      phone: phone,
    };
  
    return user;
  }
  
function getUserName(form) {
  const name = form.name.value;
  return name;
}
function getUserEmail(form) {
  const email = form.email.value;
  return email;
}
function getUserPhone(form) {
  const phone = form.phone.value;
  return phone;
}

// btnHandlers
function shopBtnHandler() {
  const id = this.dataset.id;
  setProdToLS(id);
  window.location.href = 'single.html';
}
function singleBtnHandler() {
  const id = this.dataset.id;
  setProdToLS(id);
  window.location.href = 'order.html';
}

// localStorage
function setProdToLS(id) {
  localStorage.setItem('productId', id);
}
function getProdFromLs(key) {
  return localStorage.getItem(key);
}
function setUserToLs(userObj) {
  localStorage.setItem('user', JSON.stringify(userObj));
}
function getUserFromLs(key) {
  const user = localStorage.getItem('user');
  return user;
}

function checkPage() {
  const page = doc.body.dataset.page;

  return page;
}
