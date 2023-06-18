'use strict';
//document.getElementsByClassName("main-title")[0].style.color = "red";

// Плавный скролл страницы при нажатии на кнопку для просмотра меню
document.getElementById('main-action-button').onclick = function () {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Плавный скролл страницы при нажатии на кнопки меню
let links = document.querySelectorAll('.menu-item > a');
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function() {
        document.getElementById(links[i].getAttribute('data-link')).scrollIntoView({ behavior: 'smooth' });
    }
}

// Плавный скролл страницы при нажатии на кнопки для заказа
let buttons = document.getElementsByClassName('product-button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    }
}

/*
// валидация формы на заполнение полей 2 вариант
document.getElementById('order-action').onclick = function () {
    if (document.getElementById('burger').value === '') {
        alert('Заполните поле заказа бургера!');
    } else if (document.getElementById('name').value === '') {
        alert('Напишите ваше имя!');
    } else if (document.getElementById('phone').value === '') {
        alert('Укажите ваш телефон!');
    } else {
        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время!');
    }
}
*/

// валидация формы на заполнение полей
// создаем переменные, в которых будем хранить значения полей заказа 
let burger = document.getElementById('burger');
let yourName = document.getElementById('name');
let phone = document.getElementById('phone');
document.getElementById('order-action').onclick = function() {
    // переменная, которая хранит возможные ошибки из формы
    let hasError = false;
    // массив из элементов-переменных, в которых храним значения полей заказа, а также проверяем значения полей
    [burger, yourName, phone].forEach(item => {
        if (!item.value) {
            // при отсутствии значений в поле, окрашиваем рамку поля в красный
            item.parentElement.style.background = 'red';
            hasError = true;
        } else {
            // при присутствии значений в поле, рамку поля оставляем без изменений
            item.parentElement.style.background = '';
        }
    });

    // осуществляем проверку значения переменной на отсутствие ошибок при заполнении формы заказа
    if (!hasError) {
        // очищаем форму и выводим сообщение с благодарностью за заказ
        [burger, yourName, phone].forEach(item => {
            // присваиваем элементам полей пустые строки
            item.value = '';
        });
        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время!');
    }
}

// находим все блоки со значением цены на странице и записываем в переменную
let prices = document.getElementsByClassName ('products-item-price');
// функционал для изменения курса валют в карточках бургера
document.getElementById('change-currency').onclick = function(e) {
    // объявлем переменную и присваиваем текущее значение валюты
    let currentCurrency = e.target.innerText;
    // объявлем переменную, в которой будет находится новое значение валюты  (по умолчание - $)
    let newCurrency = '$';
    // объявлем переменную, в которой будет находится значение коэффициента для пересчета
    let coefficient = 1;

    if (currentCurrency === '$') {
        newCurrency = '₽';
        coefficient = 80;
    } else if (currentCurrency === '₽') {
        newCurrency = 'BYN';
        coefficient = 3;
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }
    // заменяем значение в кнопке валют на новый тип валюты
    e.target.innerText = newCurrency;
    // проходим циклом по всем значениям и меняем значения на новые
    for (let i = 0; i < prices.length; i++) {
        // производим вычисление новых значений и типа валюты, а затем меняем внутренний текст в полях с атрибутом products-item-price
        prices[i].innerText = +(prices[i].getAttribute('data-base-price') * coefficient).toFixed(1) + ' ' + newCurrency;
    }
}