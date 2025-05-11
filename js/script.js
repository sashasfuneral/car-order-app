document.addEventListener('DOMContentLoaded', function () {

    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
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

    // Отправка формы заказа автомобиля в Google Forms
    const orderForm = document.getElementById('carOrderForm');

    if (orderForm) {

        orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(orderForm);

        const payload = new URLSearchParams();

        payload.append('entry.1071526305', formData.get('fullName') || '');

        payload.append('entry.1650271247', formData.get('phone') || '');

        payload.append('entry.728946265', formData.get('email') || '');

        payload.append('entry.1057678067', formData.get('comments') || '');

        const services = formData.getAll('services');
        payload.append('entry.1613980311', services.join(', ') || '');

        payload.append('entry.133316284', formData.get('carModel') || '');

        payload.append('entry.1186477919', formData.get('deliveryAddress') || '');

        const startDate = new Date(formData.get('startDate'));
        payload.append('entry.1169667728_year', startDate.getFullYear());
        payload.append('entry.1169667728_month', startDate.getMonth() + 1);
        payload.append('entry.1169667728_day', startDate.getDate());

        const endDate = new Date(formData.get('endDate'));
        payload.append('entry.526011184_year', endDate.getFullYear());
        payload.append('entry.526011184_month', endDate.getMonth() + 1);
        payload.append('entry.526011184_day', endDate.getDate());

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSeoug246BHvSqHlvYYqgQ9cAyZL8Oo3yEALAQ7pOdKPND8tzA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString()
        });

        alert('Ваш заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
        orderForm.reset();
        });
    }   

    // Отправка формы обратной связи в Google Forms
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(feedbackForm);
            const payload = new URLSearchParams();

            payload.append('entry.113887201', formData.get('name') || '');
            payload.append('entry.2121216611', formData.get('contactPhone') || '');
            payload.append('entry.1455275646', formData.get('contactEmail') || '');
            payload.append('entry.1957696957', formData.get('message') || '');

            fetch('https://docs.google.com/forms/d/e/1FAIpQLSetcKl_6CQXni07LFJo0AqIXM_BmO7lf_uBdHN8UBqol-8Ixg/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload.toString()
            });

            alert('Спасибо за ваше сообщение! Мы ответим вам в ближайшее время.');
            feedbackForm.reset();
        });
    }
});
