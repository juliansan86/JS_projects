// script.js - Lógica de la tienda y el carrito
// Maneja productos, eventos, renderizado y persistencia

const products = [
    {
        id: 1,
        name: 'Camiseta',
        price: 14.99,
        img: 'img/product-1.jpg'
    },
    {
        id: 2,
        name: 'Camara',
        price: 49.99,
        img: 'img/product-2.jpg'
    },
    {
        id: 3,
        name: 'Portatil',
        price: 499.99,
        img: 'img/product-3.jpg'
    },
    {
        id: 4,
        name: 'Zapatillas',
        price: 29.99,
        img: 'img/product-4.jpg'
    }
];

const cartKey = 'shop_cart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const shopProducts = document.querySelector('.shop__products');
const cartAside = document.querySelector('.cart');
const cartItems = document.querySelector('.cart__items');
const cartTotal = document.querySelector('.cart__total-value');
const cartBuy = document.querySelector('.cart__buy');
const cartClose = document.querySelector('.cart__close');

// Renderiza el carrito
const renderCart = () => {
    cartItems.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartAside.classList.add('cart--hidden');
        return;
    } else {
        cartAside.classList.remove('cart--hidden');
    }
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const wrapper = document.createElement('div');
        wrapper.className = 'cart__item-wrapper';
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart__item';
        itemDiv.innerHTML = `
      <span class="cart__item-name">${product.name}</span>
      <img src="${product.img}" alt="${product.name}" class="cart__item-img">
      <div class="cart__item-controls">
        <button class="cart__item-minus" data-id="${item.id}" title="Quitar uno"><i class="fa-solid fa-minus"></i></button>
        <input type="number" min="1" value="${item.qty}" class="cart__item-qty" data-id="${item.id}">
        <button class="cart__item-plus" data-id="${item.id}" title="Sumar uno"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div class="cart__item-price-row">
        <span class="cart__item-price">${(product.price * item.qty).toFixed(2)}€</span>
        <button class="cart__item-remove" data-id="${item.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
        wrapper.appendChild(itemDiv);
        cartItems.appendChild(wrapper);
        total += product.price * item.qty;
    });
    cartTotal.textContent = `${total.toFixed(2)}€`;
};

// Añade producto al carrito
shopProducts.addEventListener('click', e => {
    if (e.target.classList.contains('product__add')) {
        const productDiv = e.target.closest('.product');
        const id = Number(productDiv.dataset.id);
        const found = cart.find(item => item.id === id);
        if (found) {
            found.qty++;
        } else {
            cart.push({ id, qty: 1 });
        }
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
        cartAside.classList.remove('cart--hidden');
    }
});

// Cambia cantidad en el carrito
cartItems.addEventListener('input', e => {
    if (e.target.classList.contains('cart__item-qty')) {
        const id = Number(e.target.dataset.id);
        const qty = Math.max(1, Number(e.target.value));
        const item = cart.find(i => i.id === id);
        if (item) item.qty = qty;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
    }
});

// Botones de sumar/restar cantidad y eliminar
cartItems.addEventListener('click', e => {
    const id = Number(e.target.closest('button')?.dataset.id);
    if (e.target.closest('.cart__item-minus')) {
        const item = cart.find(i => i.id === id);
        if (item && item.qty > 1) {
            item.qty--;
            localStorage.setItem(cartKey, JSON.stringify(cart));
            renderCart();
        }
    } else if (e.target.closest('.cart__item-plus')) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty++;
            localStorage.setItem(cartKey, JSON.stringify(cart));
            renderCart();
        }
    } else if (e.target.closest('.cart__item-remove')) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
    }
});

// Comprar todo: vacía y oculta el carrito y ajusta la página
cartBuy.addEventListener('click', () => {
    cart = [];
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
    document.body.classList.add('shop--fullscreen');
    setTimeout(() => {
        document.body.classList.remove('shop--fullscreen');
    }, 1200);
});

// Cierra el carrito
cartClose.addEventListener('click', () => {
    cartAside.classList.add('cart--hidden');
});

// Render inicial
renderCart();
