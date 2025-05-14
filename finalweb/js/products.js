document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const categoryFilter = document.getElementById('category-filter');
    
    function renderProducts(category = 'all') {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Initial render
    renderProducts();
    
    // Filter event
    categoryFilter.addEventListener('change', (e) => {
        renderProducts(e.target.value);
    });
});