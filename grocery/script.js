let carts = document.querySelectorAll('.cart-btn');

let products = [
    {
        name: 'apple',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'chili',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'onion',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'patato',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'garlic',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'tamato',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'apple',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'chili',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'onion',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'patato',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'garlic',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'tamato',
        tag: 'fruit',
        price: '3',
        inCart: 0
    },
    {
        name: 'pack1',
        tag: 'fruit',
        price: '9',
        inCart: 0
    },
    {
        name: 'pack2',
        tag: 'fruit',
        price: '5',
        inCart: 0
    },
    {
        name: 'pack3',
        tag: 'fruit',
        price: '3',
        inCart: 0
    }
];

// Add click event listeners for the new products (large pack, big pack, small pack)
const largePackBtn = document.querySelector('#addToCartLargePack');
const bigPackBtn = document.querySelector('#addToCartBigPack');
const smallPackBtn = document.querySelector('#addToCartSmallPack');

largePackBtn.addEventListener('click', () => {
    cartNumbers(largePackProduct);
    totalCost(largePackProduct);
});

bigPackBtn.addEventListener('click', () => {
    cartNumbers(bigPackProduct);
    totalCost(bigPackProduct);
});

smallPackBtn.addEventListener('click', () => {
    cartNumbers(smallPackProduct);
    totalCost(smallPackProduct);
});

// Update the products array to include the new products
const largePackProduct = {
    name: 'largePack',
    tag: 'bundle',
    price: '9',
    inCart: 0
};

const bigPackProduct = {
    name: 'bigPack',
    tag: 'bundle',
    price: '5',
    inCart: 0
};

const smallPackProduct = {
    name: 'smallPack',
    tag: 'bundle',
    price: '3',
    inCart: 0
};


for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCardNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart-value').textContent = productNumbers;  
    }
}


function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if(productNumbers){    
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-value').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-value').textContent = 1;
    }
    setItem(products);
}
function setItem(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[products.name] == undefined){
            cartItems = {
                ...cartItems,   
                [products.name]: products
            }
        }
        cartItems[products.name].inCart += 1; 
    }
    else{
        products.inCart = 1;
        cartItems = {
            [products.name]: products
    }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// function totalCost(products){
//     // console.log("The product price is", products.price);
//     let cartCost = localStorage.getItem('totalCost');
//     console.log(typeof cartCost);
//     // console.log(typeof products.price);
    
//     console.log("My cartCost is", cartCost);
//     if(cartCost != null){
//         cartCost = parseInt(cartCost);
//         // cartCost = parseInt(products.price);
//         localStorage.setItem("totalCost", cartCost + products.price);
//         console.log(typeof cartCost);
//     } else{
//         localStorage.setItem("totalCost", products.price);
//     }
// }

function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost !== null) {
      cartCost = parseInt(cartCost); // Parse the value as an integer
      cartCost += parseInt(products.price); // Parse the price as an integer
      localStorage.setItem('totalCost', cartCost);
    } else {
      localStorage.setItem('totalCost', parseInt(products.price)); // Parse the price as an integer
    }
  }


let cartCost = localStorage.getItem('totalCost');
let basketTotalValueElement = document.getElementById('basketTotalValue');
if (basketTotalValueElement) {
  basketTotalValueElement.textContent = '$' + cartCost + '.00';
}

function removeItemFromCart(name) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  
    if (cartItems && cartItems[name]) {
      let removedItem = cartItems[name];
      let quantity = removedItem.inCart;
      let price = removedItem.price;
  
      delete cartItems[name];
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  
      let cartCost = localStorage.getItem('totalCost');
      let updatedCost = cartCost - (quantity * price);
      localStorage.setItem('totalCost', updatedCost);
  
      let productNumbers = localStorage.getItem('cartNumbers');
      productNumbers = parseInt(productNumbers);
      if (productNumbers > 0) {
        localStorage.setItem('cartNumbers', productNumbers - quantity);
        document.querySelector('.cart-value').textContent = productNumbers - quantity;
      }
  
      displayCart(); // Update the cart display after removing the item
    }
  }
  

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainter = document.querySelector('.products');
    let bill = document.querySelector('.billing');
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems)
    if(cartItems && productContainter){
        productContainter.innerHTML = '';
        Object.values(cartItems).map(items => {
            productContainter.innerHTML += `
            <div class="product">
                <i class="far fa-times-circle data-name="${items.name}" onclick="removeItemFromCart('${items.name}')"></i>
                <img src="./images/${items.name}.png">
                <span>${items.tag}</span>
            </div>
            <div class="price">$${items.price}.00</div>
            <div class="quantity">
            
            <span id="textbox1">${items.inCart}</span>
            
            </div> 
            <div class="total" id="itemval1">
            $${items.inCart * items.price}.00
            </div>           
            `
        }); 

        // button error code 
            // <button class="page-link " onclick="decreaseNumber('textbox1','itemval1')"> <i class="fas fa-minus"></i></button>
            // <span id="textbox1">${items.inCart}</span>
            // <button class="page-link" onclick="increaseNumber('textbox1','itemval1')"> <i class="fas fa-plus"></i></button>

        bill.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalContainerTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            </div
        `
    }
}
onLoadCardNumbers();
displayCart();

// var stripe = Stripe('pk_test_51NJbPtSGflfgnuLfTtTnDbmpIHxw1L4hMOQcj3WAC3sRluDtMrHXYKZLj33KX9FACBpzy1NtVqZWM2KnsoeeB63D00hSm9cnrV');

// document.getElementById("checkout").addEventListener("click", function(){
//     stripe.redirectToCheckout({
//         lineItems: [
//             {
//                 price: "price_1NJbZ3SGflfgnuLfDY1BU6Py",
//                 quantity: 1, 
//             },
//         ],
//         mode: "subscription",
//         successUrl: "https://www.google.com"
//     })
// })

// const payBtn = document.querySelector('.pay');
// payBtn.addEventListener('click', () => {
//     fetch('/stripe-checkout', {
//         method: 'post',
//         headers: new Headers({'Content-Type': 'application/Json'}),
//         body: JSON.stringify({
//             items: JSON.parse(localStorage.getItem('cartItems')),
//         }),
//     })
//     .then((res) => res.json())
//     .then((url) => {
//         location.href = url;
//     })
//     .catch((err) => console.log(err));
// });


const payBtn = document.querySelector('.pay');
payBtn.addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    fetch('/stripe-checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productsInCart: Object.values(cartItems)
        })
    })
    .then((response) => response.json())
    .then((data) => {
        // Redirect to the checkout URL
        window.location.href = data.url;
        clearCart();
    })
    .catch((error) => {
        console.log(error);
    });
});

// clear cart after successful payment 
function clearCart() {
    localStorage.removeItem('cartNumbers');
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    document.querySelector('.cart-value').textContent = '0';
    displayCart(); // Update the cart display after clearing the cart
  }
  
// Get references to the search input and the product containers
const searchInput = document.getElementById('search-box');
const productContainers = Array.from(document.getElementsByClassName('product-box'));

// Add an event listener to the search input
searchInput.addEventListener('input', function() {
  // Get the search query
  const searchQuery = searchInput.value.toLowerCase();

  // Loop through each product container and check if it matches the search query
  productContainers.forEach(function(container) {
    const productName = container.querySelector('strong').innerText.toLowerCase();
    
    // If the product name contains the search query, display the container; otherwise, hide it
    if (productName.includes(searchQuery)) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
});

