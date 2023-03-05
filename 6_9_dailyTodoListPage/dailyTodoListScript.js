/*активация строго режима*/
'use strict';
/*______________Считываем элементы____________*/

//___Считываем ввод рядом с кнопкой "Добавить"
let mainInput = document.querySelector('#main-input');
// console.log(mainInput);
//___Считываем кнопку "Добавить"
let mainButton = document.querySelector('#main-button');
// console.log(mainButton);
//___Считываем нумерованный список (тег <ol>)
let contentItems = document.querySelector('.content-items');
// console.log(contentItems);

/*___Объявляем переменную, которая в дальнейшем 
будет хранить считываемые элементы списка li (тег <li>)*/
let listItemsLi;

/*___Объявляем переменную, которая в дальнейшем 
будет хранить считываемые элементы с классом close*/
let closeElem;

/*______________Добавление нового элемента__________*/
/*___функция добавляет новую заметку в нумерованный список
 (после введенной записи заметки в input, мы добавляем:
  саму запись, элемент крестик, чтобы по нажатию на него, 
  мы могли удалить заметку)*/
function addNewNoteElement() {
  // Метод createElement позволяет создать новый элемент,
  // передав в параметре имя тега.
  let liElem = document.createElement('li');
  console.log(liElem);
  // для элемента <li> назначаем класс "content-items__li",
  // который в дальнейшем будем стилизовать
  // метод add объекта classList позволяет добавлять CSS классы элементу
  liElem.classList.add('content-items__li');

  // Метод createElement позволяет создать новый элемент,
  // передав в параметре имя тега.
  let spanElem = document.createElement('span');

  // Создаёт новый текстовый узел с заданным текстом (x):
  let crossElem = document.createTextNode('x');

  // для элемента <span> назначаем класс "close",
  // который в дальнейшем будем стилизовать
  // Метод add объекта classList позволяет добавлять CSS классы элементу.
  spanElem.classList.add('close');

  /* Во внутрь тега <span> вставляем крестик (x).
  Метод appendChild позволяет вставить в конец какого-либо другой элемент
  Получим: <span class="close">x;</span>___*/
  spanElem.appendChild(crossElem);

  // Эту запись будет добавляться в заметки
  liElem.textContent = `${mainInput.value}`;
  // После добавление заметки, input очищаем
  mainInput.value = '';

  /* Во внутрь тега <li> вставляем тег <span>.
  Метод appendChild позволяет вставить в конец какого-либо другой элемент
  Получим: <li><span class="close">x;</span></li>___*/
  liElem.appendChild(spanElem);
  /* Во внутрь тега <ol> вставляем тег <li>.
  Метод appendChild позволяет вставить в конец какого-либо другой элемент
  Получим: <ol><li><span class="close">x;</span></li></ol>___*/
  contentItems.appendChild(liElem);
}

/*______________Отметить заметку как сделано____________*/
//___функция добавляет класс (заметка становится перечеркнутой)
function markAsDone() {
  // Метод add объекта classList позволяет добавлять CSS классы элементу.
  if (this.classList.contains('done')) {
    this.classList.remove('done');
  } else {
    this.classList.add('done');
  }
}

/*______________Редактировать замету____________________*/
// ___функция для редактирования заметки
function editNote() {
  // записываем строку без крайнего символа(в нашем случаи-'x')
  let str = this.textContent.slice(0, this.textContent.length - 1);
  /*так наша строка будет, при редактирование появляться в поле
  input без крайнего символа 'x'; */
  mainInput.value = str;
}

/*______________Удаление элемента_______________________*/
//___функция удаляет заметку из нумерованного списка
function deleteNoteElement() {
  /*Своим результатом этот метод bind возвращает новую функцию, 
  внутри которой this будет иметь жестко заданное значение. */
  // console.log('click close');
  // метод remove позволяет удалить элемент.
  this.remove();
}

/*______________Объединяющий все функции модуль_________*/

// По нажатию на кнопку, выполняется операция добавления заметки,
// после ее добавления, ее можно пометить как выполнена или отредактировать
mainButton.addEventListener('click', function () {
  // если в input есть символы, то заметка добавляется
  if (mainInput.value.length > 0) {
    // Вызываем функцию
    addNewNoteElement();
    /*считываем элементы списка li (тег <li>)
    свойство children хранит в себе псевдомассив дочерних элементов */
    listItemsLi = document.querySelector('.content-items').children;
    // console.log(listItemsLi, 'listItemsLi');
    // если длина элементов списка больше 0
    if (listItemsLi.length > 0) {
      //___считываемые элементы с классом close
      closeElem = document.querySelectorAll('.close');
      // console.log(closeElem);
      // в цикле к каждому элементу списка получаем доступ
      for (let i = 0; i < listItemsLi.length; i++) {
        // нажатием на крестик удаляем заметку
        // методом bind привязываем навсегда контекст к функции (deleteNoteElement)
        closeElem[i].addEventListener(
          'click',
          deleteNoteElement.bind(listItemsLi[i])
        );
        // одинарным нажатием на текст заметки, мы отмечаем(зачеркиваем его)
        listItemsLi[i].addEventListener('click', markAsDone);
        // двойным нажатием на текст заметки, мы можем редактировать его
        listItemsLi[i].addEventListener('dblclick', editNote);
      }
    }
    // если в input нет символов, пустая заметка не добавляется
  } else if (mainInput.value.length === 0) {
    console.log('в поле для ввода записи нет');
  }
});
