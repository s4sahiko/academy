document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect + Mobile Header Branding
    const header = document.getElementById('header');
    const logoIcon = header.querySelector('.logo-icon');
    const ethnotech = header.querySelector('.logo .ethnotech');
    const academy = header.querySelector('.logo .academy');
    const menuToggle = header.querySelector('.mobile-nav-toggle');

    function applyMobileHeaderStyle() {
        if (window.innerWidth <= 992) {
            // Solid white header on mobile — always, before & after scroll
            header.style.setProperty('background', 'white', 'important');
            header.style.setProperty('background-color', 'white', 'important');
            header.style.setProperty('box-shadow', 'none', 'important');
            header.style.setProperty('border-bottom', '1px solid rgba(0,0,0,0.08)', 'important');
            if (logoIcon) {
                logoIcon.style.setProperty('fill', '#002147', 'important');
                logoIcon.style.setProperty('color', '#002147', 'important');
            }
            if (ethnotech) ethnotech.style.setProperty('color', '#002147', 'important');
            if (academy) academy.style.setProperty('color', '#FF7B00', 'important');
            if (menuToggle) menuToggle.style.setProperty('color', '#002147', 'important');
        } else {
            // Desktop: restore natural CSS control
            header.style.removeProperty('background');
            header.style.removeProperty('background-color');
            header.style.removeProperty('box-shadow');
            if (logoIcon) { logoIcon.style.removeProperty('fill'); logoIcon.style.removeProperty('color'); }
            if (ethnotech) ethnotech.style.removeProperty('color');
            if (academy) academy.style.removeProperty('color');
            if (menuToggle) menuToggle.style.removeProperty('color');
        }
    }

    // Apply on load and on every resize
    applyMobileHeaderStyle();
    window.addEventListener('resize', applyMobileHeaderStyle);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        // Re-apply mobile styles after scroll class change
        applyMobileHeaderStyle();
    });

    // Mobile Menu Toggle
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const navItem = link.parentElement;
                const hasSubmenu = navItem.querySelector('.mega-menu');

                if (window.innerWidth <= 768 && hasSubmenu) {
                    e.preventDefault();
                    navItem.classList.toggle('active');
                } else {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navLinks.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);

            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // Mega Menu Category Switcher
    const categoryBtns = document.querySelectorAll('.menu-category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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

    // Hero Slider Logic
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".slider-arrow-prev");
    const nextBtn = document.querySelector(".slider-arrow-next");
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const sliderWrapper = document.querySelector(".slider-wrapper");

        const updateTransform = () => {
            if(sliderWrapper) {
                sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        };

        const nextSlide = () => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
            updateTransform();
            updateHeaderStyle();
        };

        const prevSlideFunction = () => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
            updateTransform();
            updateHeaderStyle();
        };

        // If slide 1 is showing, we might want different text colors on header. 
        // But since both have scrolling header, it is fine.
        const updateHeaderStyle = () => {
            // Can be expanded to change header classes based on slide
        };

        if(nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if(prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlideFunction();
                resetInterval();
            });
        }

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 7000); // 7 seconds per slide
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    }

// Corporate Partners Multi-Item Slider
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('corp-partners-track');
    const nextBtn = document.querySelector('.carousel-nav-btn.next');
    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    
    if (track && nextBtn && prevBtn) {
        let currentIndex = 0;
        const totalItems = track.children.length;
        
        const getItemsPerView = () => {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        };
        
        const updateSlider = () => {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            const itemWidth = track.children[0].getBoundingClientRect().width;
            const gap = 30; // match CSS gap
            const moveWidth = (itemWidth + gap) * currentIndex;
            
            track.style.transform = `translateX(-${moveWidth}px)`;
            
            // Disable/Enable buttons
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
        };
        
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateSlider();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateSlider();
        });
        
        window.addEventListener('resize', updateSlider);
        updateSlider(); // Initial call
        
        // Auto-play (Optional but nice)
        let autoPlayInterval = setInterval(() => {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
        
        const resetInterval = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                const itemsPerView = getItemsPerView();
                const maxIndex = totalItems - itemsPerView;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        };
        
        nextBtn.addEventListener('click', resetInterval);
        prevBtn.addEventListener('click', resetInterval);
    }

    // Corporate Logo Slider Logic
    const corporateTrack = document.getElementById('corporate-logo-track');
    if (corporateTrack) {
        const logoSlides = corporateTrack.querySelectorAll('.logo-slide');
        let currentLogoIndex = 0;
        const totalLogos = logoSlides.length;

        function updateCorporateSlider() {
            const logosPerPage = window.innerWidth <= 1024 ? 2 : 4;
            
            currentLogoIndex += logosPerPage;
            
            // If we've reached the end or don't have enough for a full "page", wrap back
            if (currentLogoIndex >= totalLogos) {
                currentLogoIndex = 0;
            }
            
            const offset = currentLogoIndex * (100 / logosPerPage);
            corporateTrack.style.transform = `translateX(-${offset}%)`;
        }

        setInterval(updateCorporateSlider, 5000); // Slide every 5 seconds
    }
});
