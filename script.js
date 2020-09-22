var mainData;
var shoppingCart = [];
var cartItems = 0;


let addToTheCart = function (product){
    shoppingCart.push(product);
    cartItems++;
    let cartCounter = document.getElementById("cart-counter");
    cartCounter.innerText = `${cartItems} items`;
} 

let assignValues = function (index) {
  let json = mainData[index];
  let newTitle = json.name;
  let products = json.products || shoppingCart;
  let title = document.getElementById("page-title");
  title.innerText = newTitle;
  let content = document.getElementById("content");
  let innerHTML = "";
  for (let product of products) {
    innerHTML += `<div class="card col-3">
     <img src="${product.image}" class="card-img-top card-image" alt="${product.name}">
     <div class="card-body">
       <h5 class="card-title">${product.name}</h5>
       <p class="card-text">${product.description}</p>
       <strong> ${product.price} </strong> <div></div>
       <a id="to-cart-${product.name}" class="btn btn-primary">Add to cart</a>
     </div>
   </div>`;
  }
  content.innerHTML = innerHTML;
  for (let product of products) {
    let addToCart = document.getElementById(`to-cart-${product.name}`);
    addToCart.addEventListener('click', ()=>{
        addToTheCart(product);
    })
  }
};

let assignListeners = function () {
  let tacosNavLink = document.getElementById("tacos-link");
  tacosNavLink.addEventListener("click", () => assignValues(1));
  let saladsNavLink = document.getElementById("salads-link");
  saladsNavLink.addEventListener("click", () => assignValues(2));
  let dessertsNavLink = document.getElementById("desserts-link");
  dessertsNavLink.addEventListener("click", () => assignValues(3));
  let drinksNavLink = document.getElementById("drinks-link");
  drinksNavLink.addEventListener("click", () => assignValues(4));
  let burgerNavLink = document.getElementById("burgers-link");
  burgerNavLink.addEventListener("click", () => assignValues(0));
  burgerNavLink.click();
};

fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((data) => {
    mainData = data;
    console.log(mainData);
    assignListeners();
  });
