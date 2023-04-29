// 'use strict';  отключил строгий режим по требованию eslint

/* ↓↓---------------------Раздел переменных для ХВС-----------------------------------------↓↓ */
// Считываем элементы li (текущие показания) ХВС счетчика
const coldOneLi = document.getElementsByClassName('coldOneLi');
// Считываем (текущие показания) с input ХВС счетчика
const coldInpActual = document.querySelector('#coldInpActual');

// Считываем элементы li (предыдущие показания) XВС счетчика
const coldTwoLi = document.getElementsByClassName('coldTwoLi');
// Считываем (предыдущие показания) с input ХВС счетчика
const coldInpPrevious = document.querySelector('#coldInpPrevious');

// Считываем инпут тарифа XВС счетчика
const coldInpWaterRate = document.querySelector('#coldInpWaterRate');
// Считываем кнопку расчет XВС счетчика
const coldBtn = document.querySelector('#coldButton');
// Считываем параграф куда будем выводить результат(стоимость, руб) по XВС счетчику
const coldOutputOfCostResults = document.querySelector(
  '#coldOutputOfCostResults',
);
// Считываем параграф куда будем выводить результат(расхода, м3) по XВС счетчику
const coldOutputOfExpenditureResults = document.querySelector(
  '#coldOutputOfExpenditureResults',
);
/* ↑↑---------------------Раздел переменных для ХВС-----------------------------------------↑↑ */
//
//
//
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
      listLi[i].innerHTML = octalArrayOfReadings[i];
      inputData.classList.remove('bordTwo');
    }
  } else {
    // console.log('--- условие false');
    inputData.classList.add('bordTwo');
  }
}

// Ф4
// Функция выводит результат расчета (стоимость и расход)
function outputTheCostAndWaterConsumption(
  inpOne,
  inpTwo,
  inpThree,
  outputOne,
  outputTwo,
) {
  // Восьмеричный массив из текущих показаний счетчика
  const octalArrayOfCurrentReadings = getOctalArray(inpOne.value);
  // Восьмеричный массив из предыдущих показаний счетчика
  const octalArrayOfPreviousReadings = getOctalArray(inpTwo.value);
  // Проверка восьмеричных массивов на числа (чтобы там небыло других символов)
  // Проверка на числа текущих показаний счетчика
  const checkOne = getNumberOfMatches(octalArrayOfCurrentReadings);
  // Проверка на числа предыдущих показаний счетчика
  const checkTwo = getNumberOfMatches(octalArrayOfPreviousReadings);
  // Стоимость тарифа за воду
  const tariffNumber = Number(inpThree.value);
  // Результат
  let result = null;

  if (checkOne === 8 && checkTwo === 8) {
    // делаем из восьмеричного массива ЧИСЛО
    const currentReadings = Number(octalArrayOfCurrentReadings.join(''));
    const previousReadings = Number(octalArrayOfPreviousReadings.join(''));

    if (currentReadings < previousReadings) {
      // Класс и запись появляется если данные некорректны
      outputOne.innerHTML = 'Данные некорректны!!!';
      outputOne.classList.add('resultStyle');
      outputTwo.innerHTML = 'Данные некорректны!!!';
      outputTwo.classList.add('resultStyle');
    } else if (
      currentReadings >= previousReadings
      && tariffNumber !== 0
    ) {
      // т.к. счетчик восьмироликовый, первые 5 цифр это метры кубические,
      // а последнии 3 цифры это литры, чтобы производить вычитание
      // из одних и тех же условных вилечин, приводим значение нашего счетчика
      // к метрам кубическим деля его на 1000
      result = (currentReadings / 1000 - previousReadings / 1000) * tariffNumber;
      // Появившиеся класс и запись исчезают если данные корректны
      outputOne.classList.remove('resultStyle');
      outputTwo.classList.remove('resultStyle');
      // Выводим стоимость
      outputOne.innerHTML = `Стоимость ${result.toFixed(2)} ₽`;
      // Выводим расход
      // console.log(tariffNumber, 'ЭЭЭЭЭЭ');
      outputTwo.innerHTML = `Расход ${(result / tariffNumber).toFixed(2)} м3`;
    }
  }
}
/* ↑---------------------Раздел с общими функциями---------------------------------------↑ */
//
//
//
/* ↓↓---------------------Раздел функций для ХВС-----------------------------------------↓↓ */
// При потери фокуса после ввода в инпут чисел,
// эти числа автоматически появляются на счетчике №1 ХВС
// т.е. в списке li
coldInpActual.addEventListener('blur', () => {
  outputNewElementsLi(coldOneLi, coldInpActual);
});
// При потери фокуса после ввода в инпут чисел,
// эти числа автоматически появляются на счетчике №2 ХВС
// т.е. в списке li
coldInpPrevious.addEventListener('blur', () => {
  outputNewElementsLi(coldTwoLi, coldInpPrevious);
});
// По клику выводит стоимость и расход по счетчику ХВС
coldBtn.addEventListener('click', () => {
  outputTheCostAndWaterConsumption(
    coldInpActual,
    coldInpPrevious,
    coldInpWaterRate,
    coldOutputOfCostResults,
    coldOutputOfExpenditureResults,
  );
});
/* ↑↑---------------------Раздел функций для ХВС-----------------------------------------↑↑ */
