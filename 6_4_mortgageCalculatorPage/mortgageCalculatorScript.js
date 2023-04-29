// 'use strict';  отключил строгий режим по требованию eslint

// Получаем NodeList с элементами Флажков ввода input
// (Банковские процентные ставки, Собственные процентные ставки)
const inputArrayCheckbox = document.querySelectorAll('.form-check-flag-input');

// Получаем NodeList с элементами Диапазона ввода input
const inputRange = document.querySelectorAll('.form-range');
// Получаем NodeList с элементами Диапазона вывода Диапазона label
const labelRange = document.querySelectorAll('.form-label-number');

// Получаем элементы выпадающего списка
const dropDownList = document.querySelector('#dropDownList');

// Получаем NodeList с элементами Переключателя input
const inputArrayFlagSwitches = document.querySelectorAll('.form-check-input');

// Получаем NodeList с элементами Переключателя label
const labelTextPercent = document.querySelectorAll('.form-check-label-centre');

// Получаем NodeList с элементами вывода для правого столбца под иконкой (USBank)
const outputColNumber = document.querySelectorAll('.col__number');

/* ↓------------------Вспомогательные функции---------------------------------------------------↓ */
// Изначально элементы для выбора и расчета неактивны(функция createInactiveElements()
function createInactiveElements() {
  for (let i = 0; i < inputRange.length; i++) {
    // Делаем неактивным элемент (Диапазона)
    inputRange[i].setAttribute('disabled', '');
    // Значение элементов (Диапазона) устанавливаются по умолчанию
    labelRange[i].innerHTML = labelRange[i].dataset.valuelabel;
    inputRange[i].value = inputRange[i].dataset.valueinput;
    // Делаем неактивным элемент (Выпадающий список)
    dropDownList.setAttribute('disabled', '');
    // Делаем неактивным элемент (Переключатели)
    inputArrayFlagSwitches[i].setAttribute('disabled', '');
    inputArrayFlagSwitches[i].checked = false;
  }
}
createInactiveElements();

/* Функция устанавливает зависимость первоначального взноса от
стоимости недвижимости. Первоначальный взнос должен быть не менее 30%
и не более 100% от стоимости недвижимости.
Рассчитать первоначальный взнос */
function calculateTheInitialPayment() {
  // стоимость недвижимости
  const theCostOfRealEstate = Number(inputRange[1].value);
  // минимальный первоначальный взнос (30%)
  const minInitialPayment = (theCostOfRealEstate * 0.3).toFixed(0);
  // первоначальный взнос
  const initialPayment = Number(inputRange[2].value);

  if (initialPayment > theCostOfRealEstate) {
    inputRange[2].value = theCostOfRealEstate;
    // eslint-disable-next-line no-use-before-define
    labelRange[2].textContent = divideNumberByTheDischarge(theCostOfRealEstate);
  }
  if (Number(inputRange[2].value) < minInitialPayment) {
    inputRange[2].value = minInitialPayment;
    // eslint-disable-next-line no-use-before-define
    labelRange[2].textContent = divideNumberByTheDischarge(minInitialPayment);
  }
}

// С помощью цикла добираемся до каждого элемента диапазона
for (let i = 0; i < inputRange.length; i++) {
  // ловим событие для каждого диапазона
  inputRange[i].addEventListener('input', function changeTheTextOfTheRangeValue() {
    // запускаем функцию
    calculateTheInitialPayment();
    // изменяем текст значения диапазона
    // eslint-disable-next-line no-use-before-define
    labelRange[i].innerHTML = divideNumberByTheDischarge(this.value);
  });
}

/* Функции разделяет число на разряды пробелом. Берем целую часть числа
и в цикле проходится каждый разряд от старшего к младшему. Если порядковый номер
разряда делится на 3 (кроме самого старшего), тогда производится добавление пробела.
Таким образом, после 3, 6, 9 и т.д. разрядов появятся пробелы.
Разделить число на разряды */
function divideNumberByTheDischarge(number) {
  // нулевая строка
  const nullString = '';
  // строка с одним пробелом
  const stringWithOneSpace = ' ';
  // строка с точкой
  const stringWithDot = '.';

  const parts = (number + nullString).split(stringWithDot);
  const main = parts[0];
  const len = main.length;
  let output = '';
  let i = len - 1;

  while (i >= 0) {
    // метод charAt() возвращает символ по заданному индексу внутри строки.
    output = main.charAt(i) + output;
    if ((len - i) % 3 === 0 && i > 0) {
      output = stringWithOneSpace + output;
    }
    --i;
  }

  if (parts.length > 1) {
    output += stringWithDot + parts[1];
  }
  return output;
}

// Изначально элементы для вывода результатов в правом столбце под иконкой (USBank)
// установлены по умолчанию
// функция устанавливает стандартные входные значения
function setStandardOutputValues() {
  for (let i = 0; i < outputColNumber.length; i++) {
    outputColNumber[i].innerHTML = outputColNumber[i].dataset.value;
  }
}
setStandardOutputValues();

// Элементы активны при выборе левого флажка (Банковская годовая % ставка)
function createActiveElementsBankBet() {
  for (let i = 0; i < inputRange.length; i++) {
    // Делаем активным элемент (Диапазона)
    inputRange[i].removeAttribute('disabled');
    // Делаем неактивным элемент (Диапазона-Собственная годовая % ставка)
    inputRange[0].setAttribute('disabled', '');
    // Делаем активным элемент (Выпадающий список)
    dropDownList.removeAttribute('disabled');
    // Делаем активным элемент (Переключатели)
    inputArrayFlagSwitches[i].removeAttribute('disabled');
  }
  // Делаем активным элемент (правый флажок)
  inputArrayCheckbox[1].setAttribute('disabled', '');
}

// Элементы активны при выборе правого флажка (Собственная годовая % ставка)
function createActiveElementsOwnBet() {
  for (let i = 0; i < inputRange.length; i++) {
    // Делаем активным элемент (Диапазона)
    inputRange[i].removeAttribute('disabled');
    // Делаем неактивным элемент (Выпадающий список)
    dropDownList.setAttribute('disabled', '');
    // Делаем неактивным элемент (Переключатели)
    inputArrayFlagSwitches[i].setAttribute('disabled', '');
  }
  // Делаем активным элемент (левый флажок)
  inputArrayCheckbox[0].setAttribute('disabled', '');
}

// Функция добавляет (активирует) класс со стилем для элементов Переключателей
function addClass() {
  for (let i = 0; i < labelTextPercent.length; i++) {
    inputArrayFlagSwitches[i].addEventListener('click', () => {
      if (inputArrayFlagSwitches[i].checked === true) {
        labelTextPercent[i].classList.add('active-text');
      } else {
        labelTextPercent[i].classList.remove('active-text');
      }
    });
  }
}

// Функция удаляет (деактивирует) класс со стилем для элементов Переключателей
function deleteClass() {
  for (let i = 0; i < labelTextPercent.length; i++) {
    labelTextPercent[i].classList.remove('active-text');
  }
}
/* ↑------------------Вспомогательные функции---------------------------------------------------↑ */

/* ↓↓--------------Функции для расчета при акт.флажке (Собственная годовая % ставка)-----------↓↓ */
// [0]Функция вычисляет число суммы кредита
function calcLoanAmount() {
  const priceRealEstate = Number(inputRange[1].value);
  const initialPayment = Number(inputRange[2].value);

  const loanAmount = priceRealEstate - initialPayment;
  outputColNumber[0].innerHTML = divideNumberByTheDischarge(loanAmount);
  return loanAmount;
}

// [1]Функция возвращает число годовой процентной ставки
// (при акт. галочке - Собственная годовая % ставка)
function getDigitAnnualInterestRateRight() {
  const result = inputRange[0].value;
  outputColNumber[1].innerHTML = result;
  return Number(result);
}

// [2]Функция вычисляет число ежемесячного платежа
function calcMonthlyPaymentRight() {
  // сумма кредита
  const s = calcLoanAmount();
  // ежемесячная процентная ставка
  // eslint-disable-next-line no-use-before-define
  const i = calcMonthlyInterestRateRight();
  // срок на который берется кредит (в месяцах)
  const n = Number(inputRange[3].value) * 12;

  const result = s * (i + i / ((1 + i) ** n - 1));
  outputColNumber[2].innerHTML = divideNumberByTheDischarge(result.toFixed(3));
  return result;
}

// [3]Функция вычисляет число ежемесячной процентной ставки
function calcMonthlyInterestRateRight() {
  // ежемесячная процентная ставка
  const monthlyRate = getDigitAnnualInterestRateRight() / 100 / 12;
  outputColNumber[3].innerHTML = monthlyRate.toFixed(4);
  return monthlyRate;
}

// [4]Функция вычисляет сумму, которая идет на погашение процентов
function calcInterestRepaymentAmountRight() {
  // сумма оставшейся задолженности по кредиту, т.е. остаток
  const sn = calcLoanAmount();
  // ежемесячная процентная ставка
  const i = calcMonthlyInterestRateRight();
  const interestRepaymentAmount = sn * i;
  outputColNumber[4].innerHTML = divideNumberByTheDischarge(
    interestRepaymentAmount.toFixed(3),
  );
  return interestRepaymentAmount;
}

// [5]функция вычисляет сумму, которая идет на погашение тела кредита
function calcRepaymentAmountLoanBodyRight() {
  // число ежемесячного платежа
  const p = calcMonthlyPaymentRight();
  // сумму, которая идет на погашение процентов
  const inn = calcInterestRepaymentAmountRight();
  const repaymentAmountLoanBody = p - inn;
  outputColNumber[5].innerHTML = divideNumberByTheDischarge(
    repaymentAmountLoanBody.toFixed(3),
  );
  return repaymentAmountLoanBody;
}

// функция запускает другие функции для расчета по собственной процентной ставке
function calcAtOwnInterestRate() {
  for (let i = 0; i < inputRange.length; i++) {
    // [0]Функция вычисляет число суммы кредита
    inputRange[i].addEventListener('click', calcLoanAmount);
    // [1]Функция возвращает число годовой процентной ставки
    inputRange[i].addEventListener('click', getDigitAnnualInterestRateRight);
    // [2]Функция вычисляет число ежемесячного платежа
    inputRange[i].addEventListener('click', calcMonthlyPaymentRight);
    // [3]Функция вычисляет число ежемесячной процентной ставки
    inputRange[i].addEventListener('click', calcMonthlyInterestRateRight);
    // [4]Функция вычисляет сумму, которая идет на погашение процентов
    inputRange[i].addEventListener('click', calcInterestRepaymentAmountRight);
    // [5]функция вычисляет сумму, которая идет на погашение тела кредита
    inputRange[i].addEventListener('click', calcRepaymentAmountLoanBodyRight);
  }
}
/* ↑↑----------Функции для расчета при акт.флажке (Собственная годовая % ставка)---------------↑↑ */

/* ↓↓----------Функции для расчета при акт.флажке (Банковская годовая % ставка)----------------↓↓ */
// [0]Функция вычисляет число суммы кредита
// calcLoanAmount() эту функцию перепременил

// [1]Функция возвращает число годовой процентной ставки
// (при акт. галочке - Банковская годовая % ставка)
// из выпадающего списка, с учетом услуг, снижающих ставку по кредиту
function getDigitAnnualInterestRateLeft() {
  // Ставка из выпадающего списка
  const betFromList = dropDownList[dropDownList.selectedIndex].value;
  // Результат с учетом снижающих ставок
  let result = 0;
  // Суммарное число услуг, снижающих ставку по кредиту
  let sum = 0;
  // С помощью цикла добираемся до каждой услуги и суммируем их
  for (let i = 0; i < inputArrayFlagSwitches.length; i++) {
    if (inputArrayFlagSwitches[i].checked === true) {
      sum += Number(inputArrayFlagSwitches[i].value);
    }
  }
  // Получаем результат с учетом всех снижающих ставок
  result = Number(betFromList) - sum;
  outputColNumber[1].innerHTML = result.toFixed(2);
  // возвращаем результат
  return result;
}

// [2]Функция вычисляет число ежемесячного платежа
function calcMonthlyPaymentLeft() {
  // сумма кредита
  const s = calcLoanAmount();
  // ежемесячная процентная ставка
  // eslint-disable-next-line no-use-before-define
  const i = calcMonthlyInterestRateLeft();
  // срок на который берется кредит (в месяцах)
  const n = Number(inputRange[3].value) * 12;

  const result = s * (i + i / ((1 + i) ** n - 1));
  outputColNumber[2].innerHTML = divideNumberByTheDischarge(result.toFixed(3));
  return result;
}

// [3]Функция вычисляет число ежемесячной процентной ставки
function calcMonthlyInterestRateLeft() {
  // ежемесячная процентная ставка
  const monthlyRate = getDigitAnnualInterestRateLeft() / 100 / 12;
  outputColNumber[3].innerHTML = monthlyRate.toFixed(4);
  return monthlyRate;
}

// [4]Функция вычисляет сумму, которая идет на погашение процентов
function calcInterestRepaymentAmountLeft() {
  // сумма оставшейся задолженности по кредиту, т.е. остаток
  const sn = calcLoanAmount();
  // ежемесячная процентная ставка
  const i = calcMonthlyInterestRateLeft();
  const interestRepaymentAmount = sn * i;
  outputColNumber[4].innerHTML = divideNumberByTheDischarge(
    interestRepaymentAmount.toFixed(3),
  );
  return interestRepaymentAmount;
}

// [5]функция вычисляет сумму, которая идет на погашение тела кредита
function calcRepaymentAmountLoanBodyLeft() {
  // число ежемесячного платежа
  const p = calcMonthlyPaymentLeft();
  // сумму, которая идет на погашение процентов
  const inn = calcInterestRepaymentAmountLeft();
  const repaymentAmountLoanBody = p - inn;
  outputColNumber[5].innerHTML = divideNumberByTheDischarge(
    repaymentAmountLoanBody.toFixed(3),
  );
  return repaymentAmountLoanBody;
}

// функция запускает другие функции для расчета по банковской процентной стваке
function calcAtBankInterestRate() {
  for (let i = 0; i < inputArrayFlagSwitches.length; i++) {
    /*
    Можно сделать через this, решение получиться короче!,
    Объект this указывает на элемент, в котором произошло событие!!!
    this.addEventListener('click', calcLoanAmount);
    this.addEventListener('click', getDigitAnnualInterestRateRight);
    this.addEventListener('click', calcMonthlyPaymentRight);
    this.addEventListener('click', calcMonthlyInterestRateRight);
    this.addEventListener('click', calcInterestRepaymentAmountRight);
    this.addEventListener('click', calcRepaymentAmountLoanBodyRight);
    Но в строгом режиме('use strict') --- (Объект this) ---Выдает ошибку!
    Делаю по другому)))!
    */
    // [0]Функция вычисляет число суммы кредита
    inputRange[i].addEventListener('click', calcLoanAmount);
    // [1]Функция возвращает число годовой процентной ставки
    dropDownList.addEventListener('click', getDigitAnnualInterestRateLeft);
    inputArrayFlagSwitches[i].addEventListener(
      'click',
      getDigitAnnualInterestRateLeft,
    );
    // [2]Функция вычисляет число ежемесячного платежа
    inputRange[i].addEventListener('click', calcMonthlyPaymentLeft);
    dropDownList.addEventListener('click', calcMonthlyPaymentLeft);
    inputArrayFlagSwitches[i].addEventListener('click', calcMonthlyPaymentLeft);
    // [3]Функция вычисляет число ежемесячной процентной ставки
    dropDownList.addEventListener('click', calcMonthlyInterestRateLeft);
    inputArrayFlagSwitches[i].addEventListener(
      'click',
      calcMonthlyInterestRateLeft,
    );
    // [4]Функция вычисляет сумму, которая идет на погашение процентов
    inputRange[i].addEventListener('click', calcInterestRepaymentAmountLeft);
    dropDownList.addEventListener('click', calcInterestRepaymentAmountLeft);
    inputArrayFlagSwitches[i].addEventListener(
      'click',
      calcInterestRepaymentAmountLeft,
    );
    // [5]функция вычисляет сумму, которая идет на погашение тела кредита
    inputRange[i].addEventListener('click', calcRepaymentAmountLoanBodyLeft);
    dropDownList.addEventListener('click', calcRepaymentAmountLoanBodyLeft);
    inputArrayFlagSwitches[i].addEventListener(
      'click',
      calcRepaymentAmountLoanBodyLeft,
    );
  }
}
/* ↑↑----------Функции для расчета при акт.флажке (Банковская годовая % ставка)----------------↑↑ */

/* ↓↓↓---------Результирующая функции---------------------------------------------------------↓↓↓ */
// функция определяет по какой ставки будет производиться расчет
// по Банковской годовой % ставки или по Собственной годовой % ставки
function determinesToBeCalculated() {
  for (let i = 0; i < inputArrayCheckbox.length; i++) {
    inputArrayCheckbox[i].addEventListener('click', () => {
      if (inputArrayCheckbox[0].checked === true) {
        // Проверяем
        // console.log('Выбран левый флажек');
        // Элементы активны при выборе левого влажка (Банковская годовая % ставка)
        createActiveElementsBankBet();
        // Функция добавляет (активирует) класс со стилем для элементов Переключателей
        addClass();
        // функция запускает другие функции для расчета по банковской процентной стваке
        calcAtBankInterestRate();
      } else if (inputArrayCheckbox[1].checked === true) {
        // console.log('Выбран правый флажек');
        // Элементы активны при выборе правого влажка (Собственная годовая % ставка)
        createActiveElementsOwnBet();
        // функция запускает другие функции для расчета по собственной процентной стваке
        calcAtOwnInterestRate();
      } else {
        // console.log('Флажки не выбраны');
        // Делаем активными (правый и левый флажки)
        inputArrayCheckbox[0].removeAttribute('disabled');
        inputArrayCheckbox[1].removeAttribute('disabled');
        // Элементы для выбора и расчета неактивны(функция createInactiveElements()
        createInactiveElements();
        // Функция удаляет класс со стилем для элементов Переключателей
        deleteClass();
        // устанавливаем значения по умолчанию для правого столбца вывода
        setStandardOutputValues();
      }
    });
  }
}
determinesToBeCalculated();
/* ↑↑↑---------Результирующая функции---------------------------------------------------------↑↑↑ */
