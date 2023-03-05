/*активация строго режима*/
'use strict';

// Считываем кнопку клик
const btnClick = document.getElementById('btnClickSectionFour');
// Считываем кнопку перезагрузить
const btnReboot = document.getElementById('btnRebootSectionFour');
// Считываем вывод таймер
const timerSF = document.getElementById('timerSectionFour');
// Считываем вывод счетчика
const counterSF = document.getElementById('counterSectionFour');
// Считываем вывод результата
const resultSF = document.getElementById('resultSectionFour');

/* 
Инициализируем переменную (timer) как глобальную
чтобы в ней между запусками функции хранилось значение
*/
let timerClick;

/* 
Инициализируем переменную (internalCounter)
внутренний счетчик и присваиваем ей значение 30
(это будет 30 секунд)
*/
let internalCounter = 30;

// Функция запускает таймер
function startTimer() {
  // отвязываем обработчик события (т.е. по клику перестаем запускать функцию startTimer)
  this.removeEventListener('click', startTimer);

  timerClick = setInterval(function () {
    --internalCounter;
    // проверяю как работате
    // console.log(internalCounter);
    timerSF.innerHTML = internalCounter;
    if (internalCounter === 0) {
      // Останавливаем таймер
      clearInterval(timerClick);
    }
    console.log(internalCounter);
  }, 1000);
}

// Функция запускает клики по кнопке и счетчик
function startClick() {
  counterSF.innerHTML = Number(counterSF.innerHTML) + 1;
  if (internalCounter === 0) {
    // отвязываем обработчик события (т.е. по клику перестаем запускать функцию startClick)
    this.removeEventListener('click', startClick);
    /* Выводим общее кол-во кликов в секунду.
    Метод toFixed производит округление числа до указанного знака в дробной части.*/
    resultSF.innerHTML = (counterSF.innerHTML / 30).toFixed(2);
  }
}

// Функция устанавливает значения в исходные положения
function setStartPosition() {
  // clearInterval останавливаем таймер
  clearInterval(timerClick);
  // Внутреннюю переменную устанавливаем в исходное положение
  internalCounter = 30;
  // Вывод таймера устанавливаем в исходное положение
  timerSF.innerHTML = 30;
  // Вывод счетчика устанавливаем в исходное положение
  counterSF.innerHTML = 0;
  // Вывод результата устанавливаем в исходное положение
  resultSF.innerHTML = 0;
  // Восстанавливаем обработчики событий, чтобы можно было заного запустить и кликать)
  btnClick.addEventListener('click', startTimer);
  btnClick.addEventListener('click', startClick);
}

/*
Метод addEventListener - добавляет обработчик события к указанному элементу и 
запустить выполнение программы при совершении заданного действия
*/
btnClick.addEventListener('click', startTimer);
btnClick.addEventListener('click', startClick);
btnReboot.addEventListener('click', setStartPosition);
