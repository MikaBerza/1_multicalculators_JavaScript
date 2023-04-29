// 'use strict';  отключил строгий режим по требованию eslint
//
//
//

/* -----Формула для проектов: 6_1_borschPage, 6_2_pancakesPage, 6_3_pilafPage-------------------- */
function calculateNumberOfProducts(
  elemInput,
  elemProductsArr,
  elemQuantityArr,
  elemCellSalt,
  elemProductPerServing,
) {
  for (let i = 0; i < elemProductsArr.length; i++) {
    if (elemInput.value === '' || elemInput.value[0] === '-' || elemInput.value.length > 3) {
      // Инпут изменяется если в него вводят не числовое значение
      elemInput.value = 0;
      elemQuantityArr[i].innerHTML = 0;
      // если вводят число "0", то поля возвращаются в стандартные состояния
    } else if (Number(elemInput.value) === 0) {
      elemQuantityArr[i].innerHTML = 0;
      elemCellSalt.innerHTML = 0;
    } else {
      // формула для заполнения ячеек в колонке 'Количество'
      elemQuantityArr[i].innerHTML = (Number(elemInput.value)
      * elemProductPerServing[elemProductsArr[i].innerHTML]).toFixed(2);
      elemCellSalt.innerHTML = 'по вкусу';
    }
  }
}
export default calculateNumberOfProducts;
