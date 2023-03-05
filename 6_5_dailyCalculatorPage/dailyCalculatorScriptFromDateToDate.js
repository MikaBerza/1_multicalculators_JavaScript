/*активация строго режима*/
'use strict';

// Считываем дату 'С которой рассчитать'
const dateInputOne = document.getElementById('inputDateWith');
// Считываем дату 'До которой рассчитать'
const dateInputTwo = document.getElementById('inputDateBefore');
// Считываем кнопку рассчитать
const buttonСalculate = document.getElementById('btnСalculation');
// Считываем форму вывода строки
const formOutputs = document.getElementById('formOutput');
// Считываем форму вывода картинок
const formOutputsImg = document.getElementById('formOutputImg');

// После расчета, если выполняется условие, включается Активный класс
// Неактивный класс CSS (заглушка)
const closedClass = 'outputInactive';
// Активные классы CSS
// Если выполняется Условие №1
const requirementOne = 'form-control__requirementOne';
const openClassOne = 'outputActiveOne';
// Если выполняется Условие №2
const formControl = 'form-control';
const openClassTwo = 'outputActiveTwo';
const openClassTwoImg = 'outputActiveTwoImg';
// Если выполняется Условие №3
const openClassThree = 'outputActiveThree';
const openClassThreeImg = 'outputActiveThreeImg';
// Если выполняется Условие №4
const openClassFour = 'outputActiveFour';

// Функция вычисляет разницу в днях между датами
function calculateTheDifferenceBetweenDates() {
  // Date.parse()Метод анализирует строковое представление даты
  // и возвращает количество миллисекунд с 1 января 1970 года.
  // В одном дне - 86400000мс
  // Преобразуем к дням и записываем в переменные
  let dateWith = Date.parse(dateInputOne.value) / 86400000;
  // Проверяем что приходит
  // console.log(dateWith);
  let dateBefore = Date.parse(dateInputTwo.value) / 86400000;
  // Проверяем что приходит
  // console.log(dateBefore);
  // Вычислим разницу дат
  let diff = dateBefore - dateWith;
  // Запишем условия
  // Условие №1
  if (isNaN(diff)) {
    formOutputs.setAttribute('class', openClassOne);
    dateInputOne.setAttribute('class', requirementOne);
    dateInputTwo.setAttribute('class', requirementOne);
    formOutputs.innerHTML = '↑ Заполните поля ввода ↑';
    // Условие №2
  } else if (diff < 0) {
    formOutputsImg.setAttribute('class', openClassTwoImg);
    formOutputs.setAttribute('class', openClassTwo);
    dateInputOne.setAttribute('class', formControl);
    dateInputTwo.setAttribute('class', formControl);
    // Math.abs()-Функция возвращает абсолютное значение числа(убераем знак минус).
    formOutputs.innerHTML = `Было ${Math.abs(diff)} дн. назад`;
    // Условие №3
  } else if (diff > 0) {
    formOutputsImg.setAttribute('class', openClassThreeImg);
    formOutputs.setAttribute('class', openClassThree);
    dateInputOne.setAttribute('class', formControl);
    dateInputTwo.setAttribute('class', formControl);

    formOutputs.innerHTML = `Будет через ${Math.abs(diff)} дн.`;
    // Условие №4
  } else if (dateBefore === dateWith) {
    formOutputs.setAttribute('class', openClassFour);
    formOutputs.innerHTML = `Время для счастья – сейчас!`;
  }
}

// Вешаем событие на кнопку
buttonСalculate.addEventListener('click', calculateTheDifferenceBetweenDates);

// Вешаем событие blur вызывается когда элемент теряет фокус.
buttonСalculate.addEventListener('blur', function () {
  // setAttribute()Метод устанавливает новое значение для атрибута
  formOutputs.setAttribute('class', closedClass);
  formOutputsImg.setAttribute('class', closedClass);
  dateInputOne.setAttribute('class', formControl);
  dateInputTwo.setAttribute('class', formControl);
});
