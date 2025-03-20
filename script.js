// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

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
    const ctx = document.getElementById('revenueChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Assinatura SaaS', 'Receita Compartilhada', 'Modelo de Afiliados', 'Consultoria em IA'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        '#2A5C82',
                        '#3E8EBA',
                        '#64B5E8',
                        '#A8D5F7'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Simulator functionality
    const currentCostSlider = document.getElementById('currentCost');
    const costValue = document.getElementById('costValue');
    const contentAmountSlider = document.getElementById('contentAmount');
    const contentValue = document.getElementById('contentValue');
    const calculateBtn = document.getElementById('calculateBtn');
    const savingsResult = document.getElementById('savingsResult');

    // Atualização do simulador financeiro
    const savingsCalculator = {
        baseSavings: 40, // % base de economia
        contentMultiplier: 0.5 // R$ 0,50 por artigo
    };

    if (currentCostSlider && contentAmountSlider) {
        currentCostSlider.addEventListener('input', function () {
            costValue.textContent = this.value + '%';
        });

        contentAmountSlider.addEventListener('input', function () {
            contentValue.textContent = this.value + '%';
        });

        calculateBtn.addEventListener('click', function () {
            const costPercent = parseInt(currentCostSlider.value);
            const contentPercent = parseInt(contentAmountSlider.value);

            // Calculando com base nos novos parâmetros
            const savings = Math.min(Math.round(savingsCalculator.baseSavings * (costPercent / 50)), 95);

            savingsResult.innerHTML = `Economia potencial: <span>${savings}%</span> nos custos com <span>${contentPercent}%</span> mais conteúdo`;
        });
    }

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

    // Microinterações nos cards (hover effect)
    const cards = document.querySelectorAll('.pillar-card, .model-card, .tech-item, .case-card');

    cards.forEach(card => {
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Schema markup para SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        "name": "NE45 + Jornal.IA",
        "url": window.location.href,
        "logo": window.location.origin + "/images/logo.png",
        "sameAs": [
            "https://www.facebook.com/ne45jornalia",
            "https://www.instagram.com/ne45jornalia"
        ],
        "areaServed": {
            "@type": "Place",
            "name": "Nordeste do Brasil"
        }
    });
    document.head.appendChild(schemaScript);
});
