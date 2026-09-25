// ===== HERO CAROUSEL =====
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.isPaused = false;

        if (!this.slides.length || !this.indicators.length || !this.prevBtn || !this.nextBtn) {
            return;
        }

        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
            heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) return;
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.dropdowns = document.querySelectorAll('.dropdown');

        if (!this.hamburger || !this.navMenu) {
            return;
        }
        
        this.init();
    }
    
    init() {
        // Toggle mobile menu
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Handle dropdowns on mobile
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
}

// ===== SEARCH MODAL =====
class SearchModal {
    constructor() {
        this.searchBtn = document.getElementById('searchBtn');
        this.searchModal = document.getElementById('searchModal');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchClose = document.getElementById('searchClose');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');

        if (!this.searchBtn || !this.searchModal || !this.searchOverlay || !this.searchClose || !this.searchInput || !this.searchResults) {
            return;
        }
        
        this.searchData = [
            { title: 'Early Years Curriculum', category: 'Academics', url: 'academics.html' },
            { title: 'Primary Education', category: 'Academics', url: 'academics.html' },
            { title: 'Middle School Program', category: 'Academics', url: 'academics.html' },
            { title: 'Pre-Primary Section', category: 'Departments', url: 'departments.html' },
            { title: 'Primary Section', category: 'Departments', url: 'departments.html' },
            { title: 'Middle School', category: 'Departments', url: 'departments.html' },
            { title: 'Secondary Section', category: 'Departments', url: 'departments.html' },
            { title: 'Student Development', category: 'Placements', url: 'placements.html' },
            { title: 'Achievements & Awards', category: 'Placements', url: 'placements.html' },
            { title: 'Competitions & Sports', category: 'Placements', url: 'placements.html' },
            { title: 'LKG Admission', category: 'Admissions', url: 'admissions.html' },
            { title: 'Primary Admission', category: 'Admissions', url: 'admissions.html' },
            { title: 'Secondary Admission', category: 'Admissions', url: 'admissions.html' },
            { title: 'About School', category: 'About', url: 'about.html' },
            { title: 'Vision & Mission', category: 'About', url: 'about.html' },
            { title: 'Principal Message', category: 'About', url: 'about.html' },
            { title: 'Notice Board', category: 'Student Zone', url: '#' },
            { title: 'Student Login', category: 'Student Zone', url: '#' },
            { title: 'Contact Us', category: 'Contact', url: 'contact.html' }
        ];
        
        this.init();
    }
    
    init() {
        // Open search modal
        this.searchBtn.addEventListener('click', () => this.openModal());
        
        // Close search modal
        this.searchClose.addEventListener('click', () => this.closeModal());
        this.searchOverlay.addEventListener('click', () => this.closeModal());
        
        // Handle search input
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        this.searchModal.classList.add('active');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.searchModal.classList.remove('active');
        this.searchInput.value = '';
        this.searchResults.innerHTML = '<p class="search-placeholder">Start typing to search...</p>';
        document.body.style.overflow = '';
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.searchResults.innerHTML = '<p class="search-placeholder">Start typing to search...</p>';
            return;
        }
        
        const filteredResults = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length === 0) {
            this.searchResults.innerHTML = '<p class="search-placeholder">No results found</p>';
            return;
        }
        
        this.searchResults.innerHTML = filteredResults.map(item => `
            <div class="search-result-item">
                <a href="${item.url}" class="search-result-link">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-category">${item.category}</div>
                </a>
            </div>
        `).join('');
    }
}

// ===== ANIMATED COUNTERS =====
class AnimatedCounters {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;

        if (!this.counters.length) {
            return;
        }
        
        this.init();
    }
    
    init() {
        // Use Intersection Observer to trigger animation when section is visible
        if (!('IntersectionObserver' in window)) {
            this.animateCounters();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const placementSection = document.querySelector('.placement-section');
        if (placementSection) {
            observer.observe(placementSection);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Add slide-up animation to cards
        const cards = document.querySelectorAll('.feature-card, .program-card, .notice-card, .recruiter-logo');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.main-navbar');
        if (!this.navbar) {
            return;
        }
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                this.navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// ===== GALLERY FILTER & LIGHTBOX =====
class GalleryFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.gallery-filter-wrapper .filter-btn');
        this.galleryCards = document.querySelectorAll('.gallery-card');

        if (!this.filterBtns.length || !this.galleryCards.length) return;
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-filter');

                // Toggle active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter cards
                this.galleryCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

class LightboxModal {
    constructor() {
        this.lightbox = document.getElementById('lightboxModal');
        this.closeBtn = document.getElementById('lightboxClose');
        this.titleEl = document.getElementById('lightboxTitle');
        this.categoryEl = document.getElementById('lightboxCategory');
        this.cards = document.querySelectorAll('.gallery-card');

        if (!this.lightbox) return;
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.gallery-caption h4')?.textContent || 'School Photo';
                const category = card.querySelector('.gallery-category-tag')?.textContent || 'Gallery';

                if (this.titleEl) this.titleEl.textContent = title;
                if (this.categoryEl) this.categoryEl.textContent = category;

                this.lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.close();
            }
        });
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const heroCarousel = new HeroCarousel();
    const mobileMenu = new MobileMenu();
    const searchModal = new SearchModal();
    const animatedCounters = new AnimatedCounters();
    const scrollAnimations = new ScrollAnimations();
    const smoothScroll = new SmoothScroll();
    const navbarScroll = new NavbarScroll();
    const galleryFilter = new GalleryFilter();
    const lightboxModal = new LightboxModal();

    // Add search result styles dynamically if the modal exists
    if (document.getElementById('searchModal')) {
        const searchStyles = document.createElement('style');
        searchStyles.textContent = `
            .search-result-item {
                padding: 15px;
                border-bottom: 1px solid #E5E7EB;
                transition: all 0.3s ease;
            }
            
            .search-result-item:hover {
                background-color: #EEF5FF;
            }
            
            .search-result-link {
                display: block;
                text-decoration: none;
            }
            
            .search-result-title {
                font-size: 16px;
                font-weight: 600;
                color: #10294D;
                margin-bottom: 5px;
            }
            
            .search-result-category {
                font-size: 13px;
                color: #6B7280;
            }
        `;
        document.head.appendChild(searchStyles);
    }
    
    console.log('All components initialized successfully');
});

// ===== HANDLE WINDOW RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }, 250);
});