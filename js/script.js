document.addEventListener('DOMContentLoaded', function() {
    // Обработка отправки формы заказа
    const orderForm = document.getElementById('carOrderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(orderForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Данные заказа:', data);
            
            // Показ сообщения об успехе
            alert('Ваш заказ успешно отправлен! Наш менеджер свяжется с вами в ближайшее время.');
            orderForm.reset();
        });
    }
    
    // Обработка отправки формы обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(feedbackForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Обратная связь:', data);
            
            // Показ сообщения об успехе
            alert('Спасибо за ваше сообщение! Мы ответим вам в ближайшее время.');
            feedbackForm.reset();
        });
    }
    
    // Подсветка активной ссылки в навигации
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Инициализация карты (заглушка, в реальном проекте используйте API карт)
    console.log('Карта инициализирована');
    
    // Валидация дат в форме заказа
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput && endDateInput) {
        // Установка минимальной даты (сегодня)
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
        
        startDateInput.addEventListener('change', function() {
            if (startDateInput.value) {
                endDateInput.setAttribute('min', startDateInput.value);
            }
        });
    }
    
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue += '+7 (';
                
                if (value.length > 1) {
                    formattedValue += value.substring(1, 4);
                } else {
                    formattedValue += value.substring(1);
                }
                
                if (value.length >= 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                
                if (value.length >= 7) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                
                if (value.length >= 9) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            }
            
            e.target.value = formattedValue;
        });
    });
});