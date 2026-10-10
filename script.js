const products = [
  { id: 1, name: 'Kaiser 6.0"', steel: 'VG-10 kobaltstaal', price: 249 },
  { id: 2, name: 'Jäger 7.0"', steel: 'ATS-314 staal', price: 279 },
  { id: 3, name: 'Wolf Effileer 6.0"', steel: 'VG-10 staal', price: 229 },
  { id: 4, name: 'Damast 6.5"', steel: '67-laags damaststaal', price: 389 }
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div>
        <div class="product-image">${p.name}</div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.steel} · Handgeslepen</p>
        </div>
      </div>
      <div class="product-footer">
        <span class="product-price">€ ${p.price.toFixed(2).replace('.', ',')}</span>
        <button class="btn-brass" onclick="addToCart(${p.id})">In winkelwagen</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  toggleCart();
}

function updateCartUI() {
  const countSpan = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalSpan = document.getElementById('cart-subtotal');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  countSpan.textContent = totalCount;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="empty-cart">Je winkelwagen is leeg.</p>';
    subtotalSpan.textContent = '€ 0,00';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem;">
      <div>
        <p style="font-weight: 600;">${item.name}</p>
        <p style="font-size: 0.75rem; color: rgba(243, 239, 231, 0.5);">Aantal: ${item.quantity}</p>
      </div>
      <span>€ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  subtotalSpan.textContent = `€ ${subtotal.toFixed(2).replace('.', ',')}`;
}

document.addEventListener('DOMContentLoaded', renderProducts);
