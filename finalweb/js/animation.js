// animations.js
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .section-title, .benefit-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const elementsToAnimate = document.querySelectorAll('.product-card, .section-title, .benefit-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('.product-img img');
            img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.product-img img');
            img.style.transform = 'scale(1)';
        });
    });
});