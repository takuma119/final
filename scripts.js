// scripts.js

// Cart management
const cart = [];

// Add product to cart
function addToCart(productId, productName, productPrice) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    const quantity = parseInt(quantityInput.value);
    const product = { id: productId, name: productName, price: productPrice, quantity };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push(product);
    }

    displayCart();
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div>
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
            </div>
        `).join('');
    }
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        cart.length = 0;
        displayCart();
    }
}

// Login functionality
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        document.getElementById('admin').style.display = 'block';
        alert('Welcome, Admin!');
    } else {
        alert('Login successful!');
    }
}

// Admin: Add new product
function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productImage = document.getElementById('product-image').value;

    const productList = document.getElementById('product-list');
    const newProductId = Math.random().toString(36).substr(2, 9); // Generate unique ID

    productList.innerHTML += `
        <div class="product">
            <img src="${productImage}" alt="${productName}">
            <h3>${productName}</h3>
            <p>Price: $${productPrice}</p>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity${newProductId}" min="1" value="1">
            <button onclick="addToCart('${newProductId}', '${productName}', ${productPrice})">Add to Cart</button>
        </div>
    `;
}
