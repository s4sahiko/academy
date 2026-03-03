document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mega Menu Category Switcher
    const categoryBtns = document.querySelectorAll('.menu-category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const category = btn.getAttribute('data-category');

            // Update buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            categoryContents.forEach(content => {
                if (content.id === `${category}-list`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // Re-initialize reveal animations for new elements
    const updateReveals = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateReveals);
    updateReveals();

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            // Only start counting when the element is visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    };

    startCounters();
});
