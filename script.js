/**
 * Byte & Bean - Co-Working Coffee Shop
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        fadeInObserver.observe(section);
    });

    // Add fade-in styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Gallery image lightbox (simple version)
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    function openLightbox(src, alt) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${src}" alt="${alt}">
            </div>
        `;

        // Add lightbox styles
        const lightboxStyles = document.createElement('style');
        lightboxStyles.textContent = `
            .lightbox {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: lightboxFadeIn 0.3s ease;
            }
            @keyframes lightboxFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .lightbox-overlay {
                position: absolute;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.9);
            }
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
                padding: 8px;
                line-height: 1;
            }
            .lightbox-close:hover {
                color: #d64545;
            }
        `;
        document.head.appendChild(lightboxStyles);

        // Add to DOM
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close handlers
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Active nav link highlighting on scroll
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionElements = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Add active nav link styles
    const navActiveStyle = document.createElement('style');
    navActiveStyle.textContent = `
        .nav-links a.active {
            color: #2d7d7d;
        }
    `;
    document.head.appendChild(navActiveStyle);
});
