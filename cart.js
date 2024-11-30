document.addEventListener('DOMContentLoaded', () => {
    updateCartPage();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.removeEventListener('click', handleAddToCart); 
        button.addEventListener('click', handleAddToCart);
    });

    const purchaseButton = document.getElementById('purchase-button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalPrice = document.getElementById('total-price').textContent;
            const params = new URLSearchParams({
                cart: JSON.stringify(cart),
                total: totalPrice
            });

            window.location.href = `purchase.html?${params.toString()}`;
        });
    }
});
function updateCartPage() {
    let cartContainer = document.querySelector('.cart-container');
    let totalPrice = document.querySelector('#total-price');
    if (cartContainer) {
        cartContainer.innerHTML = '';
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cart.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <span>${item.price} x ${item.quantity}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            total += parseFloat(item.price.slice(1)) * item.quantity;
        });
        totalPrice.textContent = total.toFixed(2);
    }
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromCart(e.target.dataset.index);
        });
    });
}
function handleAddToCart(e) {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = e.target.closest('.box');
    const productName = product.querySelector('h3').textContent;
    const productPrice = product.querySelector('span').textContent;
    const productImage = product.querySelector('img').src;
    const item = { name: productName, price: productPrice, image: productImage, quantity: 1 };
    let existingProductIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
}
let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');
let cartIcon = document.querySelector('#cart-icon');
let products = document.querySelectorAll('.add-to-cart');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
};
document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
};
window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
};
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
products.forEach(product => {
    product.addEventListener('click', (e) => {
        e.preventDefault();
        let item = e.target.parentElement.parentElement;
        handleAddToCart({ target: e.target });
        animateFlyToCart(item);
    });
});
function animateFlyToCart(item) {
    let img = item.querySelector('img');
    let flyingImg = img.cloneNode(true);
    flyingImg.classList.add('flying');
    document.body.appendChild(flyingImg);
    flyingImg.style.position = 'fixed';
    let rect = img.getBoundingClientRect();
    flyingImg.style.top = `${rect.top}px`;
    flyingImg.style.left = `${rect.left}px`;

    setTimeout(() => {
        document.body.removeChild(flyingImg);
    }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('User logged out');
        });
    }
});
