// 'use strict';  отключил строгий режим по требованию eslint

// Считываем введенное кол-во дней
const inputDay = document.getElementById('inputDay');
// Считываем кнопку рассчитать
const buttonСalculateDay = document.getElementById('btnСalculationDay');
// Считываем форму вывода строки
const formOutputsDay = document.getElementById('formOutputDay');

// После расчета, если выполняется условие, включается Активный класс
// Неактивный класс CSS (заглушка)
const closedClassDay = 'outputInactiveDay';
// Активные классы CSS
// Если выполняется Условие №1
const openClassDay = 'outputActiveDay';
// Если выполняется Условие №1.1 и №2
const requirementDay = 'form-control__requirementOne';
const openClassErrorDay = 'outputActiveOne';
// После срабатывания события событие blur
const formControlDay = 'form-control';

// Функция вычисляет количество дней с текущего дня
function calculateTheNumberOfDaysFromTheCurrentDay() {
  // Текущая общая дата
  const currentTotalDate = new Date();
  // Текущий год
  const currentYear = currentTotalDate.getFullYear();
  // Текущий месяц
  const currentMonth = currentTotalDate.getMonth();
  // Текущий день
  const currentDay = currentTotalDate.getDate();
  // Проверяем что приходит
  // console.log(currentDay);
  // Вводимое количество дней
  const numberOfDaysEntered = Number(inputDay.value);
  // Проверяем что приходит
  // console.log(numberOfDaysEntered);
  /* Сумма между текущим днем и вводимым числом (ставим знак "+", т.к. если будет знак "-"
  и пользователь решит ввести число с знаком "-", то функция отработает не так как мы
  планируем потому-что минус на минус даст плюс) */
  const diff = currentDay + numberOfDaysEntered;
  // Полученная дата
  const receivedDate = new Date(currentYear, currentMonth, diff);
  /*------------------------------------------------------------------------*/
  // Массив дней недели
  const arrayOfDaysOfTheWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  // массив месяцев года
  const arrayOfMonthsOfTheWeek = [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'Май.',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Ноя.',
    'Дек.',
  ];
  /*------------------------------------------------------------------------*/
  // Запишем условие №1
  if (inputDay.value !== '' && inputDay.value.length <= 8) {
    // setAttribute()Метод устанавливает новое значение для атрибута
    formOutputsDay.setAttribute('class', openClassDay);
    // Выводим дату словами
    formOutputsDay.textContent = `${
      arrayOfDaysOfTheWeek[receivedDate.getDay()]
    }, ${receivedDate.getDate()} ${
      arrayOfMonthsOfTheWeek[receivedDate.getMonth()]
    } ${receivedDate.getFullYear()}г.`;
    // Запишем условие №1.1
  } else if (inputDay.value.length >= 8) {
    formOutputsDay.setAttribute('class', openClassErrorDay);
    inputDay.setAttribute('class', requirementDay);
    formOutputsDay.textContent = '↑ Число дней введено некорректно ↑';
    // Запишем условие №2
  } else {
    formOutputsDay.setAttribute('class', openClassErrorDay);
    inputDay.setAttribute('class', requirementDay);
    formOutputsDay.textContent = '↑ Заполните поле ввода ↑';
  }
}

// Вешаем событие на кнопку для вычисления
buttonСalculateDay.addEventListener(
  'click',
  calculateTheNumberOfDaysFromTheCurrentDay,
);

// Вешаем событие blur вызывается когда элемент теряет фокус
buttonСalculateDay.addEventListener('blur', () => {
  // setAttribute()Метод устанавливает новое значение для атрибута
  formOutputsDay.setAttribute('class', closedClassDay);
  inputDay.setAttribute('class', formControlDay);
});
