/**
 * Main application entry point - Orchestrates all modules
 */
import { NavigationManager } from './modules/NavigationManager.js';
import { ChartManager } from './modules/ChartManager.js';
import { SimulatorManager } from './modules/SimulatorManager.js';
import { ComponentRenderer } from './modules/ComponentRenderer.js';
import { PerformanceOptimizer } from './modules/PerformanceOptimizer.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    initializeApp();

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

/**
 * Initialize all application modules
 */
function initializeApp() {
    // Initialize performance optimizations
    const performanceOptimizer = new PerformanceOptimizer();
    performanceOptimizer.init();

    // Initialize navigation
    const navigation = new NavigationManager({
        navSelector: '.nav',
        menuToggleSelector: '.menu-toggle',
        navLinksSelector: '.nav-links'
    });

    // Initialize component renderer for dynamic components
    const componentRenderer = new ComponentRenderer();
    componentRenderer.renderPillars();

    // Initialize charts when they're in viewport
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lazy load Chart.js when needed
                import('https://cdn.jsdelivr.net/npm/chart.js/+esm')
                    .then(() => {
                        const chartManager = new ChartManager('#revenueChart');
                        chartObserver.disconnect(); // Only need to initialize once
                    })
                    .catch(err => console.error('Failed to load Chart.js', err));
            }
        });
    }, { threshold: 0.1 });

    const chartElement = document.getElementById('revenueChart');
    if (chartElement) {
        chartObserver.observe(chartElement);
    }

    // Initialize simulator
    const simulator = new SimulatorManager({
        currentCostSelector: '#currentCost',
        contentAmountSelector: '#contentAmount',
        calculateBtnSelector: '#calculateBtn',
        resultSelector: '#savingsResult'
    });

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.error('Service Worker registration failed', err));
    }

    // Add touch feedback for better mobile experience
    addTouchFeedback();
}

/**
 * Add touch feedback for interactive elements
 */
function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-links a, .pillar-card, .model-card'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.classList.add('touch-active');
        }, { passive: true });

        ['touchend', 'touchcancel'].forEach(eventType => {
            element.addEventListener(eventType, () => {
                element.classList.remove('touch-active');
            }, { passive: true });
        });
    });
}

// Enable transitions only after page load to avoid FOUC
window.addEventListener('load', () => {
    document.body.classList.add('transitions-enabled');
});
