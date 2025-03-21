/**
 * ChartManager - Handles chart creation and updates
 */
export class ChartManager {
    /**
     * @param {string} selector - CSS selector for the chart canvas
     */
    constructor(selector) {
        this.selector = selector;
        this.canvas = document.querySelector(selector);
        this.chart = null;

        if (this.canvas) {
            this.init();
        } else {
            console.error(`Chart canvas not found: ${selector}`);
        }
    }

    /**
     * Initialize the chart
     */
    init() {
        this.createChart();

        // Set up resize handling for responsiveness
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * Create the revenue distribution chart
     */
    createChart() {
        // Ensure Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }

        // Create chart with our data configuration
        this.chart = new Chart(this.canvas, {
            type: 'pie',
            data: this.getChartData(),
            options: this.getChartOptions()
        });
    }

    /**
     * Get chart data configuration
     * @returns {Object} Chart data object
     */
    getChartData() {
        return {
            labels: [
                'Assinatura SaaS',
                'Receita Compartilhada',
                'Modelo de Afiliados',
                'Consultoria em IA'
            ],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#2A5C82',
                    '#3E8EBA',
                    '#64B5E8',
                    '#A8D5F7'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        };
    }

    /**
     * Get chart options configuration
     * @returns {Object} Chart options object
     */
    getChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 14
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        };
    }

    /**
     * Handle window resize to maintain chart responsiveness
     */
    handleResize() {
        if (this.chart) {
            this.chart.resize();
        }
    }

    /**
     * Update chart data and animate transition
     * @param {Array} newData - New data values for the chart
     */
    updateData(newData) {
        if (!this.chart) return;

        this.chart.data.datasets[0].data = newData;
        this.chart.update();
    }
}
