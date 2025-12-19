// Функция для фильтрации проектов
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const resetFiltersBtn2 = document.getElementById('resetFiltersBtn');
    const projectsCount = document.getElementById('projectsCount');
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    
    let activeFilters = {
        type: 'all',
        author: 'all',
        topic: 'all'
    };
    
    // Функция применения фильтров
    function applyFilters() {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const type = card.getAttribute('data-type');
            const author = card.getAttribute('data-author');
            const topics = card.getAttribute('data-topic').split(' ');
            
            const typeMatch = activeFilters.type === 'all' || activeFilters.type === type;
            const authorMatch = activeFilters.author === 'all' || activeFilters.author === author;
            const topicMatch = activeFilters.topic === 'all' || topics.includes(activeFilters.topic);
            
            if (typeMatch && authorMatch && topicMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Обновляем счетчик
        projectsCount.textContent = visibleCount;
        
        // Показываем/скрываем сообщение "Проекты не найдены"
        if (visibleCount === 0) {
            noProjectsMessage.style.display = 'block';
        } else {
            noProjectsMessage.style.display = 'none';
        }
        
        // Сортируем проекты
        sortProjects();
    }
    
    // Функция сортировки проектов
    function sortProjects() {
        const container = projectsGrid;
        const items = Array.from(container.querySelectorAll('.project-card[style*="display: flex"]'));
        
        const sortValue = sortSelect.value;
        
        items.sort((a, b) => {
            switch (sortValue) {
                case 'date-desc':
                    return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                case 'date-asc':
                    return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
                case 'name-asc':
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                case 'name-desc':
                    return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
                case 'rating-desc':
                    return parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating'));
                default:
                    return 0;
            }
        });
        
        // Перемещаем элементы в отсортированном порядке
        items.forEach(item => {
            container.appendChild(item);
        });
    }
    
    // Обработчики для кнопок фильтров
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterGroup = this.parentElement;
            const filterType = this.hasAttribute('data-filter') ? 'type' :
                              this.hasAttribute('data-author') ? 'author' :
                              this.hasAttribute('data-topic') ? 'topic' : null;
            
            if (!filterType) return;
            
            // Убираем активный класс у всех кнопок в группе
            filterGroup.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Обновляем активный фильтр
            const filterValue = this.getAttribute(`data-${filterType}`);
            activeFilters[filterType] = filterValue;
            
            // Применяем фильтры
            applyFilters();
        });
    });
    
    // Обработчик для сортировки
    sortSelect.addEventListener('change', sortProjects);
    
    // Обработчики для сброса фильтров
    function resetFilters() {
        // Сбрасываем активные фильтры
        activeFilters = {
            type: 'all',
            author: 'all',
            topic: 'all'
        };
        
        // Сбрасываем активные кнопки
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all' || 
                btn.getAttribute('data-author') === 'all' || 
                btn.getAttribute('data-topic') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Сбрасываем сортировку
        sortSelect.value = 'date-desc';
        
        // Применяем фильтры
        applyFilters();
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    if (resetFiltersBtn2) {
        resetFiltersBtn2.addEventListener('click', resetFilters);
    }
    
    // Инициализация фильтров
    applyFilters();
    
    // Анимация появления проектов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Dropdown меню для скачивания
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').style.opacity = '1';
            this.querySelector('.dropdown-menu').style.visibility = 'visible';
            this.querySelector('.dropdown-menu').style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').style.opacity = '0';
            this.querySelector('.dropdown-menu').style.visibility = 'hidden';
            this.querySelector('.dropdown-menu').style.transform = 'translateY(-10px)';
        });
    });
});