// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .zoom-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

// Запускаем при загрузке и скролле
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ===== ПАРТИКЛИ В ГЕРОЕ =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные свойства
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.backgroundColor = `rgba(52, 152, 219, ${Math.random() * 0.3 + 0.1})`;
        
        particlesContainer.appendChild(particle);
    }
}

// Создаем частицы после загрузки
window.addEventListener('load', createParticles);

// ===== АНИМАЦИЯ ПРОГРЕСС-БАРОВ =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width') || '100%';
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ =====
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
    
    // Параллакс на скролл
    window.addEventListener('scroll', parallaxEffect);
    
    // Добавляем классы анимации
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Пропускаем герой-секцию
            section.classList.add('fade-in');
        }
    });
    
    // Анимация карточек
    const cards = document.querySelectorAll('.feature-card, .access-card');
    cards.forEach(card => {
        card.classList.add('zoom-in');
    });
});