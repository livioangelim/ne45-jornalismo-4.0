// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Financial chart initialization - Updated to use percentages
    const ctx = document.getElementById('revenueChart').getContext('2d');

    // Revenue data with percentages instead of absolute values
    const NE45RevenueData = {
        labels: ['Assinaturas (40%)', 'Receita Compartilhada (30%)', 'Afiliados (20%)', 'Consultoria (10%)'],
        datasets: [{
            label: 'Distribuição da Receita (%)',
            data: [40, 30, 20, 10], // Updated percentages
            backgroundColor: [
                '#2A5C82', // Primary color for Assinatura
                '#D4A418', // Secondary color for Receita Compartilhada
                '#5A8D7F', // Accent color for Afiliados
                '#777777'  // Grey for Consultoria
            ],
            borderColor: [
                '#2A5C82',
                '#D4A418',
                '#5A8D7F',
                '#777777'
            ],
            borderWidth: 1
        }]
    };

    // Create the chart
    new Chart(ctx, {
        type: 'doughnut', // Changed from pie to doughnut
        data: NE45RevenueData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.raw}% do total`;
                        }
                    }
                }
            }
        }
    });

    // Simulator functionality
    const currentCostSlider = document.getElementById('currentCost');
    const costValue = document.getElementById('costValue');
    const contentAmountSlider = document.getElementById('contentAmount');
    const contentValue = document.getElementById('contentValue');
    const calculateBtn = document.getElementById('calculateBtn');
    const savingsResult = document.getElementById('savingsResult');

    // Update slider display values
    currentCostSlider.addEventListener('input', function () {
        costValue.textContent = this.value + '%';
    });

    contentAmountSlider.addEventListener('input', function () {
        contentValue.textContent = this.value + '%';
    });

    // Calculate savings when button is clicked
    calculateBtn.addEventListener('click', function () {
        const currentCost = parseInt(currentCostSlider.value);
        const contentAmount = parseInt(contentAmountSlider.value);

        // Calculate savings - base algorithm: 40% savings at 200% content
        const savingsPercentage = Math.round(40 * (currentCost / 50));

        savingsResult.innerHTML = `Economia potencial: <span>${savingsPercentage}%</span> nos custos com <span>${contentAmount}%</span> mais conteúdo`;
    });

    // CTA buttons functionality
    const trialBtn = document.getElementById('trial-btn');
    const contactBtn = document.getElementById('contact-btn');

    trialBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const teamName = prompt('Digite o nome do seu clube para personalizar a demonstração:');
        if (teamName) {
            window.location.href = `mailto:it.livioam@gmail.com?subject=Teste Gratuito NE45 - ${teamName}&body=Olá, gostaria de iniciar o teste gratuito de 30 dias da solução JornalIA para o time ${teamName}.`;
        }
    });

    contactBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:it.livioam@gmail.com?subject=Demonstração NE45 + JornalIA&body=Olá, gostaria de agendar uma demonstração da solução JornalIA para o NE45.';
    });

    // Add scroll highlight for current section
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
