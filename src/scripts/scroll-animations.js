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

    // Target all direct children of main (sections) and other key elements
    const elementsToAnimate = document.querySelectorAll('main > section, main > div, .service-card, .glass-card, .bg-white\\/5');

    elementsToAnimate.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}
