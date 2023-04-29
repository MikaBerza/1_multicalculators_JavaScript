('use strict');
//
//
//
const fact = document.querySelector('.card__fact');
// console.log(fact);
const img = document.querySelector('.card__img');
// console.log(img);

// Cat Facts API
const urlCatFact = 'https://catfact.ninja/fact';
// console.log(urlCatFact);

/*Глобальный fetch()метод запускает процесс извлечения ресурса из сети, 
возвращая обещание (promise), которое выполняется, как только ответ 
становится доступным. */

/*async - У этого слова один простой смысл: эта функция всегда возвращает промис. 
Значения других типов оборачиваются в завершившийся успешно 
промис автоматически.*/

/*await - ключевое слово  заставит интерпретатор JavaScript ждать до тех пор, пока 
промис справа от await не выполнится. После чего оно вернёт его результат, 
и выполнение кода продолжится. */

// async await - асинхронное ожидание
async function fetchHandler() {
  try {
    /*здесь храниться ответ от сервера, если бы не была написано 
    конструкция async await, то мы бы получали промис.*/
    const responseFact = await fetch(urlCatFact);
    // console.log(responseFact);

    // поучаем тело ответа
    const dataFact = await responseFact.json();
    // console.log(dataFact);

    fact.textContent = dataFact.fact;
  } catch (error) {
    // если возникнет ошибка, то мы выведем текст (Ошибка загрузки !!!)
    fact.textContent = 'Ошибка загрузки !!!';
    console.log(error);
  }
}

img.addEventListener('click', fetchHandler);