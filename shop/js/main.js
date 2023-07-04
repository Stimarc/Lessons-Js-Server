const doc = document;
const productsSelector = '.products';

for (let product of products) {
  renderProduct(product, productsSelector);
}

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
/*
append, prepend, before, after, replaceWith
*/ 

  const {id, title, category, img, price} = prodObj;
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
}