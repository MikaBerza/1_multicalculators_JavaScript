// 'use strict';  отключил строгий режим по требованию eslint

/*
Данные для входа на сайт
  Почта:
  Address@mail.ru
  Пароль:
  Adr78*#
  Чекбокас "Я не робот":
  true
*/
// Электронная почта
const inpAddress = document.getElementById('inputEmail1');
// Пароль
const inpPassword = document.getElementById('inputPassword1');
// Чекбокас "Я не робот"
const inpCheckbox = document.getElementById('inputCheck1');
// Кнопка войти
const entButton = document.getElementById('entryButton');
// Вот такое длинное условие перехода на главную страницу
// по возможности попробовать оптимизировать это условие
// (чтобы было поменьше))))
entButton.addEventListener('click', () => {
  if (
    inpAddress.value === 'Address@mail.ru'
    && inpPassword.value === 'Adr78*#'
    && inpCheckbox.checked === true
  ) {
    inpAddress.classList.remove('bordTwo');
    inpPassword.classList.remove('bordTwo');
    inpCheckbox.classList.remove('bordTwo');
    // console.log('Данные правильные');
    // console.log('Происходит переход!');
    // Переход на главную страницу (Домашнего калькулятора)
    // eslint-disable-next-line no-multi-assign
    onclick = document.location.href = 'http://192.168.1.101:5500/6_0_mainPage/mainIndex.html';
  } else if (
    inpAddress.value !== 'Address@mail.ru'
    && inpPassword.value !== 'Adr78*#'
    && inpCheckbox.checked !== true
  ) {
    inpAddress.classList.add('bordTwo');
    inpPassword.classList.add('bordTwo');
    inpCheckbox.classList.add('bordTwo');
  } else if (
    inpAddress.value !== 'Address@mail.ru'
    && inpPassword.value !== 'Adr78*#'
    && inpCheckbox.checked === true
  ) {
    inpAddress.classList.add('bordTwo');
    inpPassword.classList.add('bordTwo');
    inpCheckbox.classList.remove('bordTwo');
  } else if (
    inpAddress.value === 'Address@mail.ru'
    && inpPassword.value === 'Adr78*#'
    && inpCheckbox.checked !== true
  ) {
    inpAddress.classList.remove('bordTwo');
    inpPassword.classList.remove('bordTwo');
    inpCheckbox.classList.add('bordTwo');
  } else if (
    inpAddress.value === 'Address@mail.ru'
    && inpPassword.value !== 'Adr78*#'
    && inpCheckbox.checked === true
  ) {
    inpAddress.classList.remove('bordTwo');
    inpPassword.classList.add('bordTwo');
    inpCheckbox.classList.remove('bordTwo');
  } else if (
    inpAddress.value !== 'Address@mail.ru'
    && inpPassword.value === 'Adr78*#'
    && inpCheckbox.checked === true
  ) {
    inpAddress.classList.add('bordTwo');
    inpPassword.classList.remove('bordTwo');
    inpCheckbox.classList.remove('bordTwo');
  } else if (
    inpAddress.value === 'Address@mail.ru'
    && inpPassword.value !== 'Adr78*#'
    && inpCheckbox.checked !== true
  ) {
    inpAddress.classList.remove('bordTwo');
    inpPassword.classList.add('bordTwo');
    inpCheckbox.classList.add('bordTwo');
  } else if (
    inpAddress.value !== 'Address@mail.ru'
    && inpPassword.value === 'Adr78*#'
    && inpCheckbox.checked !== true
  ) {
    inpAddress.classList.add('bordTwo');
    inpPassword.classList.remove('bordTwo');
    inpCheckbox.classList.add('bordTwo');
  }
});
