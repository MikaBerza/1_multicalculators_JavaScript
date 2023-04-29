// 'use strict';  отключил строгий режим по требованию eslint

/* ↓↓---------------------Раздел переменных-----------------------------------------↓↓ */
// Считываем элементы li текущего показания Т1
const currentReadingsT1 = document.getElementById(
  'listOfCurrentItemsT1',
).children;
// Считываем элемент input текущего показания Т1
const inputCurrentT1 = document.getElementById('inputCurrentT1');

// Считываем элементы li предыдущего показания Т1
const previousReadingsT1 = document.getElementById(
  'listOfPreviousItemsT1',
).children;
// Считываем элемент input предыдущего показания Т1
const inputPreviousT1 = document.getElementById('inputPreviousT1');

/* ↑↑---------------------Раздел переменных--------------------------------------------↑↑ */

/* ↓---------------------Раздел с общими функциями---------------------------------------↓ */
// Ф1
// Функция возвращает восьмеричный массив
// с ввода текущих/предыдущих показаний (данных) счетчика
function getOctalArray(dataCounter) {
  // Считываем строку
  const str = dataCounter;
  // Делаем из строки массив
  const arr = str.split('');
  if (arr.length === 8) {
    return arr;
  }
  // console.log('В массиве МЕНЬШЕ 8 символов');
  return ['null'];
}

// Ф2
// Возвращает число совпадений.
// Это своеобразная проверка, мы проверяем сколько чисел введено в инпут,
// если количество совпадений равно 8, то в инпут ввели все числа.
function getNumberOfMatches(octalArray) {
  // Массив цифр с которыми сравнивается восьмеричный массив
  const arrNum1 = '1234567890'.split('');
  // Счетчик совпадений!
  // Если ввили все цифры, он будет равен 8.
  let counter = 0;
  for (let i = 0; i < arrNum1.length; i++) {
    for (let j = 0; j < octalArray.length; j++) {
      if (arrNum1[i] === octalArray[j]) {
        counter += 1;
      }
    }
  }
  return counter;
}

// Ф3
// Функция выводит в li элементы, значения с инпута
// которые прошли проверку и являются числами
function outputNewElementsLi(listLi, inputData) {
  // Восьмеричный массив из показаний счетчика
  const octalArrayOfReadings = getOctalArray(inputData.value);
  // Число (количество) совпадений
  const numberOfMatches = getNumberOfMatches(octalArrayOfReadings);

  // console.log(octalArrayOfReadings);
  // console.log(numberOfMatches);

  if (numberOfMatches === 8) {
    // console.log('+++ условие true');
    for (let i = 0; i < octalArrayOfReadings.length; i++) {
      // присваиваем каждому элементу списка li
      // значение с инпута
      // listLi[i].innerHTML = octalArrayOfReadings[i];
      inputData.classList.remove('bordTwo');
    }
  } else {
    // console.log('--- условие false');
    inputData.classList.add('bordTwo');
  }
}

/* ↓↓---------------------Объединяющее все функции событие------------------------------------↓↓ */
// При потери фокуса после ввода в инпут чисел,
// эти числа автоматически появляются на счетчике №1 ХВС
// т.е. в списке li
inputCurrentT1.addEventListener('blur', () => {
  outputNewElementsLi(currentReadingsT1, inputCurrentT1);
});
// При потери фокуса после ввода в инпут чисел,
// эти числа автоматически появляются на счетчике №2 ХВС
// т.е. в списке li
inputPreviousT1.addEventListener('blur', () => {
  outputNewElementsLi(previousReadingsT1, inputPreviousT1);
});
/* ↑↑---------------------Объединяющее все функции событие------------------------------------↑↑ */

// ==================ДОДЕЛАТЬ!=========ДОДЕЛАТЬ!==============ДОДЕЛАТЬ!=====
// ==================ДОДЕЛАТЬ!=========ДОДЕЛАТЬ!==============ДОДЕЛАТЬ!=====
// ==================ДОДЕЛАТЬ!=========ДОДЕЛАТЬ!==============ДОДЕЛАТЬ!=====
