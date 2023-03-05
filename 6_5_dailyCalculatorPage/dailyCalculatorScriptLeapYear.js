/*активация строго режима*/
'use strict';

// Считываем введенное кол-во дней
const inputYear = document.getElementById('inputYear');
// Считываем кнопку расчитать
const buttonСalculateYear = document.getElementById('btnСalculationYear');
// Считываем форму вывода строки
const formOutputsYear = document.getElementById('formOutputYear');

// После расчета, если выполняется условие, включается Активный класс
// Неактивный класс CSS (заглушка)
const closedClassYear = 'outputInactiveYear';
// Активные классы CSS
// Если выполняется Условие №1 и №2
const openClassYearYes = 'outputActiveYearYes';
const openClassYearNo = 'outputActiveYearNo';
// Если выполняются остальные условие
const requirementYear = 'form-control__requirementOne';
const openClassErrorYear = 'outputActiveOne';
// После срабатывания события событие blur
const formControlYear = 'form-control';

// Функция определяет високосный год
function defineALeapYear() {
  let year = Number(inputYear.value);
  let receivedDate = new Date(year, 2, 0);
  // Запишем условие №1
  if (
    receivedDate.getDate() === 29 &&
    inputYear.value.length <= 4 &&
    inputYear.value.length !== 0
  ) {
    formOutputsYear.setAttribute('class', openClassYearYes);
    formOutputsYear.innerHTML = `Високосный`;
    // Запишем условие №2
  } else if (
    receivedDate.getDate() !== 29 &&
    inputYear.value.length <= 4 &&
    inputYear.value.length !== 0
  ) {
    formOutputsYear.setAttribute('class', openClassYearNo);
    formOutputsYear.innerHTML = `НЕвисокосный`;
    // Запишем условие №3
  } else if (inputYear.value.length > 4) {
    formOutputsYear.setAttribute('class', openClassErrorYear);
    inputYear.setAttribute('class', requirementYear);
    formOutputsYear.innerHTML = '↑ Число года введено некорректно ↑';
    // Остальные условия
  } else {
    formOutputsYear.setAttribute('class', openClassErrorYear);
    inputYear.setAttribute('class', requirementYear);
    formOutputsYear.innerHTML = '↑ Заполните поле ввода ↑';
  }
}

buttonСalculateYear.addEventListener('click', defineALeapYear);

// Вешаем событие blur вызывается когда элемент теряет фокус.
buttonСalculateYear.addEventListener('blur', function () {
  // setAttribute()Метод устанавливает новое значение для атрибута
  formOutputsYear.setAttribute('class', closedClassYear);
  inputYear.setAttribute('class', formControlYear);
  inputYear.placeholder = 'гггг';
});
