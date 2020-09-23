var mainData;
var shoppingCart = [];
var cartItems = 0;

let addToTheCart = function (product) {
  let found = false;
  for (let i = 0; i < shoppingCart.length && !found; i++) {
    if (shoppingCart[i]) {
      if (shoppingCart[i].description === product.name) {
        shoppingCart[i].quantity++;
        found = true;
      }
    }
  }
  if (!found) {
    product.qty = 1;
    let newProduct = {
      item: null,
      quantity: 1,
      description: product.name,
      unitPrice: product.price,
    }
    shoppingCart.push(newProduct);
  }

  cartItems++;
  let cartCounter = document.getElementById("cart-counter");
  cartCounter.innerText = `${cartItems} items`;
};

let assignValues = function (index) {
  document.getElementById("table-footer").innerHTML = "";
  let json = mainData[index];
  let newTitle = json.name;
  let products = json.products;
  let title = document.getElementById("page-title");
  title.innerText = newTitle;
  let content = document.getElementById("content");
  //   let innerHTML = `<div class="card-deck">`;
  let innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    product = products[i];
    innerHTML += `<div class="col-3 mb-5"> <div class="card">
    <img src="${product.image}" class="card-img-top card-image" alt="${product.name}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <strong> $${product.price} </strong> <div></div>
      <a id="to-cart-${product.name}" class="btn btn-dark add-cart">Add to cart</a>
    </div>
  </div>
  </div>`;
    // if (i % 3 == 0 && i != 0 && i < products.length - 1) {
    //   innerHTML += `</div><div class="card-deck">`;
    // }
  }
  innerHTML += `</div>`;
  content.innerHTML = innerHTML;
  for (let product of products) {
    let addToCart = document.getElementById(`to-cart-${product.name}`);
    addToCart.addEventListener("click", () => {
      addToTheCart(product);
    });
  }
};

let goToCart = function () {
  let cartCounter = document.getElementById("cart-counter");
  cartCounter.innerText = `${cartItems} items`;
  let total = 0;
  let newTitle = "Order detail";
  let products = shoppingCart;
  let title = document.getElementById("page-title");
  title.innerText = newTitle;
  let content = document.getElementById("content");
  let innerHTML = "";
  innerHTML = `<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Qty.</th>
      <th scope="col">Description</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.item = i+1;
    total += product.unitPrice * product.quantity;
    innerHTML += `<tr>
      <th scope="row">${product.item}</th>
      <td>${product.quantity}</td>
      <td>${product.description}</td>
      <td>${product.unitPrice}</td>
      <td>${product.unitPrice * product.quantity}</td>
    </tr>`;
  }
  innerHTML += `</tbody></table>`;
  content.innerHTML = innerHTML;
  document.getElementById(
    "table-footer"
  ).innerHTML = `<div class="col-8">Total: $${total}</div>
    <div class="col-2"></div>
    <div class="col-2">
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#cancelModal">Cancel</button>
      <button type="button" class="btn btn-success" id="confirm-button">Confirm order</button>
    </div>`;

  let confirmButton = document.getElementById("confirm-button");
  confirmButton.addEventListener("click", confirmOrder);
};

let cancelOrder = function () {
  if (shoppingCart.length === 0) {
    alert("No products in cart!");
  }
  cartItems = 0;
  shoppingCart = [];
  goToCart();
};

let confirmOrder = function () {
  if (shoppingCart.length === 0) {
    alert("No products in cart!");
  } else {
    console.log(shoppingCart);
    shoppingCart = [];
    cartItems = 0;
    alert("Order confirmed!");
  }

  goToCart();
};

let createInfo = async function () {
  let innerHTML = "";
  for (let category of mainData) {
    let idName = category.name.replaceAll(" ", "-");
    innerHTML += `<li class="nav-item">
    <a class="nav-link" id="${idName}-link"
      >${category.name} <span class="sr-only">(current)</span></a
    >
  </li>`;
  }
  document.getElementById("nav-bar-ul").innerHTML = innerHTML;
};

let assignListeners = function () {
  let tacosNavLink = document.getElementById("Tacos-link");
  tacosNavLink.addEventListener("click", () => assignValues(1));
  let saladsNavLink = document.getElementById("Salads-link");
  saladsNavLink.addEventListener("click", () => assignValues(2));
  let dessertsNavLink = document.getElementById("Desserts-link");
  dessertsNavLink.addEventListener("click", () => assignValues(3));
  let drinksNavLink = document.getElementById("Drinks-and-Sides-link");
  drinksNavLink.addEventListener("click", () => assignValues(4));
  let burgerNavLink = document.getElementById("Burguers-link");
  burgerNavLink.addEventListener("click", () => assignValues(0));
  let cartButton = document.getElementById("cart-button");
  cartButton.addEventListener("click", goToCart);
  let cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", cancelOrder);
  burgerNavLink.click();
};

fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((data) => {
    mainData = data;
    createInfo().then(() => assignListeners());
  });
