/**
 * Navigation Manager - Handles all navigation-related functionality
 */
export class NavigationManager {
    /**
     * @param {Object} options - Configuration options
     * @param {string} options.navSelector - Selector for the navigation element
     * @param {string} options.menuToggleSelector - Selector for the mobile menu toggle button
     * @param {string} options.navLinksSelector - Selector for the navigation links container
     */
    constructor(options = {}) {
        this.navSelector = options.navSelector || '.nav';
        this.menuToggleSelector = options.menuToggleSelector || '.menu-toggle';
        this.navLinksSelector = options.navLinksSelector || '.nav-links';

        this.nav = document.querySelector(this.navSelector);
        this.menuToggle = document.querySelector(this.menuToggleSelector);
        this.navLinks = document.querySelector(this.navLinksSelector);
        this.navItems = document.querySelectorAll(`${this.navLinksSelector} a`);

        this.init();
    }

    /**
     * Initialize navigation features
     */
    init() {
        if (!this.nav || !this.menuToggle || !this.navLinks) {
            console.error('Navigation elements not found');
            return;
        }

        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.setupResizeHandler();
    }

    /**
     * Set up mobile menu toggle functionality
     */
    setupMobileMenu() {
        this.menuToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');

            // Update ARIA attributes for accessibility
            const isExpanded = this.navLinks.classList.contains('active');
            this.menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on a link
        this.navItems.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    /**
     * Set up smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        this.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only process links that point to a section on this page
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();

                    const targetElement = document.querySelector(targetId);
                    if (!targetElement) return;

                    const headerHeight = this.nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Set up scroll spy to highlight active navigation items
     */
    setupScrollSpy() {
        // Debounce function to limit scroll event firing
        const debounce = (func, wait = 20, immediate = true) => {
            let timeout;
            return function () {
                const context = this, args = arguments;
                const later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        // Get all sections targeted by the navigation
        const sections = Array.from(this.navItems)
            .map(link => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    return document.querySelector(targetId);
                }
                return null;
            })
            .filter(section => section !== null);

        // Create an Intersection Observer to monitor sections
        const headerHeight = this.nav.offsetHeight;
        const observerOptions = {
            rootMargin: `-${headerHeight}px 0px -50% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    this.navItems.forEach(item => item.classList.remove('active'));

                    // Add active class to the corresponding link
                    const activeLink = document.querySelector(`${this.navLinksSelector} a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Handle window resize to fix mobile menu issues
     */
    setupResizeHandler() {
        const handleResize = debounce(() => {
            if (window.innerWidth > 768 && this.navLinks.classList.contains('active')) {
                this.navLinks.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', false);
            }
        }, 100);

        window.addEventListener('resize', handleResize);
    }
}

/**
 * Debounce function to limit the rate at which a function can fire
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
