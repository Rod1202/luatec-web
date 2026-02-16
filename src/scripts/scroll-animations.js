export function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target specific content elements for granular animation
    const elementsToAnimate = document.querySelectorAll(`
        main h1, 
        main h2, 
        main h3, 
        main p, 
        main img, 
        .glass-card, 
        .service-card,
        .benefit-card
    `);

    elementsToAnimate.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}
