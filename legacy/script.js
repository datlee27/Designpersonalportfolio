document.addEventListener("DOMContentLoaded", function () {

    const preloader = document.getElementById('preloader');
    const body = document.body;
    const pageWrapper = document.querySelector('.page-wrapper');

    // If a page-wrapper exists, hide it for the preloader
    if (pageWrapper) {
        pageWrapper.style.display = 'none';
        body.style.overflow = 'hidden';
    }
    
    window.addEventListener('load', () => {
        // Let the preloader animation run for a bit
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';

                // When the fade-out is complete, hide the preloader and show the content
                preloader.addEventListener('transitionend', function handler(event) {
                    if (event.propertyName === 'opacity') {
                        preloader.style.display = 'none';
                        pageWrapper.style.display = 'block';
                        body.style.overflow = '';
                        preloader.removeEventListener('transitionend', handler);
                    }
                });
            } else {
                // Fallback if preloader is missing
                pageWrapper.style.display = 'block';
                body.style.overflow = '';
            }
        }, 2000); // Minimum time for preloader to be visible
    });

    // Navigation scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const projectCardsCarousel = document.querySelectorAll('.project-card-carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        let currentIndex = 0;

        function updateCarousel() {
            projectCardsCarousel.forEach((card, i) => {
                card.classList.remove('active', 'prev', 'next');
                if (i === currentIndex) {
                    card.classList.add('active');
                } else if (i === (currentIndex - 1 + projectCardsCarousel.length) % projectCardsCarousel.length) {
                    card.classList.add('prev');
                } else if (i === (currentIndex + 1) % projectCardsCarousel.length) {
                    card.classList.add('next');
                }
            });
            updateIndicators();
        }

        function createIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = '';
            projectCardsCarousel.forEach((_, i) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                indicator.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
                indicatorsContainer.appendChild(indicator);
            });
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + projectCardsCarousel.length) % projectCardsCarousel.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % projectCardsCarousel.length;
            updateCarousel();
        });

        createIndicators();
        updateCarousel();
    }
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}