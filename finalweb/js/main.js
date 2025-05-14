// Product Data (Shared across all pages)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "assets/products/headphones.jpg",
        category: "electronics",
        featured: true,
        description: "Premium noise-canceling wireless headphones with 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "assets/products/smartwatch.jpg",
        category: "electronics",
        featured: true,
        description: "Advanced smartwatch with health monitoring and GPS tracking."
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 79.99,
        image: "assets/products/runningshoes.jpg",
        category: "clothing",
        featured: true,
        description: "Lightweight running shoes with responsive cushioning."
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 59.99,
        image: "assets/products/denimjacket.jpg",
        category: "clothing",
        featured: false,
        description: "Classic denim jacket with modern fit and styling."
    }
];

// Cart Functions
function getCart() {
    return JSON.parse(localStorage.getItem('swiftshop-cart')) || [];
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }
    
    localStorage.setItem('swiftshop-cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navbar.classList.toggle('active');
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    updateCartCount();
});

// Make core functions available globally
window.addToCart = addToCart;
window.getCart = getCart;


// Add these functions to your main.js

// Quick View Modal System
function setupQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view-btn')) {
            const productId = parseInt(e.target.closest('.product-card').dataset.id);
            showQuickView(productId);
        }
        
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('modal')) {
            hideQuickView();
        }
    });
}

function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-content">
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-product-details">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <p class="description">${product.description}</p>
                    <div class="modal-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                        <button class="btn add-to-cart" onclick="addToCart(${product.id}, parseInt(document.querySelector('.modal .quantity').textContent)">
                            Add to Cart
                        </button>
                    </div>
                    <div class="product-meta">
                        <div class="meta-item">
                            <i class="fas fa-box"></i>
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-undo"></i>
                            <span>30-day return policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function hideQuickView() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Initialize featured products on homepage
function initFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(p => p.featured);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.category === 'electronics' ? '<span class="product-badge">Tech</span>' : ''}
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
            <div class="quick-view">
                <button class="quick-view-btn">Quick View</button>
            </div>
        </div>
    `).join('');
}

// Update your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    updateCartCount();
    setupQuickView();
    initFeaturedProducts();
});