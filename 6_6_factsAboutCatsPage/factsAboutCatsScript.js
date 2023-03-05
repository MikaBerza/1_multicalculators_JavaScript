('use strict');
//
//
//
const container = document.querySelector('.container');
// console.log(container);
const fact = document.querySelector('.card__fact');
// console.log(fact);
const img = document.querySelector('.card__img');
// console.log(img);
const imgNone = document.querySelector('.card__img-none');
// console.log(imgNone);
const urlCatPhoto = 'https://aws.random.cat/meow';
// console.log(urlCatPhoto);
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
    const responsePhoto = await fetch(urlCatPhoto);
    const responseFact = await fetch(urlCatFact);
    // console.log(responsePhoto);
    // console.log(responseFact);

    // чтобы получить тело ответа
    const dataPhoto = await responsePhoto.json();
    const dataFact = await responseFact.json();
    // console.log(dataPhoto);
    // console.log(dataFact);

    img.src = dataPhoto.file;
    fact.textContent = dataFact.fact;
  } catch (error) {
    // если возникнет ошибка, то мы выведем картинку Ошибка загрузки!
    img.src = '/5_img/5_6_factsAboutCats/loading_error.jpg';
    fact.textContent = 'Ошибка загрузки !!!';
    console.log(error);
  }
}

img.addEventListener('click', function () {
  /*Проверьте, завершена ли загрузка изображения:
  Если загрузка изображения завершена, свойство завершения возвращает значение true.
  Если загрузка изображения не завершена, это свойство возвращает значение false.*/
  if (img.complete) {
    // если загрузка завершена, можем загружать следующую картинку
    fetchHandler();
  }
});