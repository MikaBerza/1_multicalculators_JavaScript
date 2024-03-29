// 'use strict';  отключил строгий режим по требованию eslint

// импортирую функцию стандартным синтаксисом (ES модуль)
// eslint-disable-next-line import/extensions
import calculateNumberOfProducts from '../6_0_0_module/indexModule.js';

// Считываем инпут
const input = document.getElementById('idProductInput');
// Считываем кнопку рассчитать
const btn = document.getElementById('btnProduct');

// Считываем ячейки с именем продукта (получается массив)
const productsArr = document.querySelectorAll('.table-products');
// Считываем ячейки с количеством данного продукта (получается массив)
const quantityArr = document.querySelectorAll('.table-quantity');
// Считываем ячейку справа от ячейки соль в столбце количество
const cellSalt = document.getElementById('salt');

// Объект содержит продукты для одной порции блюда (вес продукта в граммах)
const productPerServing = {
  Молоко: 0.12,
  Яйца: 1,
  Мука: 35,
  'Масло сливочное, растопленное': 5,
  Соль: 0.5,
  Сахар: 5,
};

/* По нажатию на кнопку 'РАССЧИТАТЬ', ячейки столбца 'Количество'
заполняются требуемым грамможем(граммами) продуктов */
btn.addEventListener('click', () => {
  calculateNumberOfProducts(
    input,
    productsArr,
    quantityArr,
    cellSalt,
    productPerServing,
  );
});
