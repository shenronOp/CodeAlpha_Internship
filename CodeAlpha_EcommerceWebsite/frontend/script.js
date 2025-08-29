// frontend/script.js
const apiBase = ''; // relative path

async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const el = document.getElementById('products');
  el.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="${p.image || 'https://via.placeholder.com/300x200'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹ ${p.price}</p>
      <p>${p.description || ''}</p>
      <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Add to cart</button>
      <a href="product.html?id=${p._id}">Details</a>
    `;
    el.appendChild(card);
  });
}

async function showProduct(id) {
  const res = await fetch('/api/products/' + id);
  const p = await res.json();
  const d = document.getElementById('product-detail');
  d.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.image || 'https://via.placeholder.com/400x300'}">
    <p>${p.description}</p>
    <p>₹${p.price}</p>
    <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Add to cart</button>
  `;
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function updateCartCount(){
  const c = getCart().reduce((s,i)=>s+i.qty,0);
  const el = document.getElementById('cart-count');
  if (el) el.innerText = c;
}

function addToCart(id, name, price) {
  const cart = getCart();
  const idx = cart.findIndex(x => x._id === id);
  if (idx >= 0) cart[idx].qty += 1;
  else cart.push({ _id: id, name, price, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Added to cart');
}

function loadCart() {
  const cart = getCart();
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  if (!cart.length) list.innerHTML = '<p>Cart is empty</p>';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${item.name}</strong> - ₹${item.price} x ${item.qty}`;
    list.appendChild(div);
  });
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  totalEl.innerText = `Total: ₹${total}`;
}
