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
        addToCart(item);
        animateFlyToCart(item);
    });
});

function addToCart(item) {
    let product = {
        name: item.querySelector('h3').textContent,
        price: item.querySelector('span').textContent,
        image: item.querySelector('img').src
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = cart.findIndex(cartItem => cartItem.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
}

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

function updateCartPage() {
    let cartContainer = document.querySelector('.cart-container');
    let totalPrice = document.querySelector('#total-price');
    if (cartContainer) {
        cartContainer.innerHTML = '';
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cart.forEach(item => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <span>${item.price} x ${item.quantity}</span>
            `;
            cartContainer.appendChild(cartItem);
            total += parseFloat(item.price.slice(1)) * item.quantity;
        });
        totalPrice.textContent = total.toFixed(2);
    }
}

updateCartPage();
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = contactForm[0].value;
    const email = contactForm[1].value;
    const message = contactForm[2].value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    contactForm.reset();
    alert('Thank you for your message! We will get back to you soon.');
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('User logged out');
        });
    }
});
