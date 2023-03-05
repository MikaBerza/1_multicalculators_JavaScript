/*активация строго режима*/
'use strict';
//импортирую функцию стандартным синтаксисом (ES модуль)
import calculateNumberOfProducts from '../6_0_0_module/indexModule.js';

// Считываем инпут
const input = document.getElementById('idProductInput');
// Считываем кнопку Расчитать
const btn = document.getElementById('btnProduct');

// Считываем ячейки с именем продукта (получается массив)
const productsArr = document.querySelectorAll('.table-products');
// Считываем ячейки с колличеством данного продукта (получается массив)
const quantityArr = document.querySelectorAll('.table-quantity');
// Считываем ячейку справа от ячейки соль в столбце количество
const cellSalt = document.getElementById('salt');

// Объект содержит продукты для одной порции блюда (вес продукта в граммах)
const productPerServing = {
  'Баранина (молодая)': 100,
  Рис: 90,
  'Лук репчатый': 0.4,
  Морковь: 90,
  Чеснок: 0.4,
  'Масло растительное': 2,
  Зира: 2,
  Вода: 0.09,
};

// По нажатию на кнопку 'РАССЧИТАТЬ', ячейки столбца 'Количество' заполняются требуемым грамможем(граммами) продуктов
btn.addEventListener('click', function () {
  calculateNumberOfProducts(
    input,
    productsArr,
    quantityArr,
    cellSalt,
    productPerServing
  );
});
