import { gsap } from "gsap";

export function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Animate opacity and slide up with optimized easing
                gsap.fromTo(element,
                    { opacity: 0, y: 50, willChange: "opacity, transform" },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        stagger: 0.1,
                        clearProps: "willChange" // Cleanup to free memory
                    }
                );

                observer.unobserve(element); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements with specific class
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => {
        // Set initial state
        gsap.set(el, { opacity: 0, y: 50, willChange: "opacity, transform" });
        observer.observe(el);
    });

    // Auto-target section children for broader effect without manual tagging everywhere
    // This allows sections to just work
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        // Select direct children divs that are not absolute positioned (likely content)
        // or just h1, h2, icons
        const children = section.querySelectorAll("h1, h2, h3, p, .card, .grid > div");
        children.forEach(child => {
            if (!child.classList.contains('reveal-on-scroll')) {
                gsap.set(child, { opacity: 0, y: 30, willChange: "opacity, transform" });
                observer.observe(child);
            }
        });
    });
}
