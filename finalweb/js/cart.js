document.addEventListener('DOMContentLoaded', function() {
    const cartItemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    function renderCart() {
        const cart = getCart();
        
        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn">Browse Products</a>
                </div>
            `;
            subtotalEl.textContent = '$0.00';
            totalEl.textContent = '$5.99';
            checkoutBtn.disabled = true;
            return;
        }
        
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.99;
        const total = subtotal + shipping;
        
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    }
    
    // Handle quantity changes and removal
    cartItemsEl.addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        
        const productId = parseInt(cartItem.dataset.id);
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (e.target.closest('.remove-item')) {
            cart.splice(itemIndex, 1);
        } 
        else if (e.target.closest('[data-action="decrease"]')) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        else if (e.target.closest('[data-action="increase"]')) {
            cart[itemIndex].quantity++;
        }
        
        localStorage.setItem('swiftshop-cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        alert('Order placed successfully!');
        localStorage.removeItem('swiftshop-cart');
        renderCart();
        updateCartCount();
    });
    
    // Initial render
    renderCart();
});
