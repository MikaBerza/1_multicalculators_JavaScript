/*активация строго режима*/
'use strict';

//___Считываем textarea для записи/редактирования
let mainTextarea = document.querySelector('.main__textarea');
//___Считываем button для добавления записи
let mainBtn = document.querySelector('.main__button');
//___Считываем маркированный список ul
let elementUl = document.querySelector('.main__numbered-list');
//___Считываем input для поиска
let inpSearchElem = document.querySelector('.main__input-search');
//___Считываем meter для отображения индикатора выполненных задач
let mainIndicator = document.querySelector('.main__counter-indicator');
//___Считываем элемент select*/
let selectElem = document.querySelector('.main__filtering-select');

//___Массив с элементами списка
let arrayListItems = [];
// Переменная состояния, для манипулирования функцией редактирования (editNote)
let condition;

/*Объявляем переменную, которая будет хранить
дату в формате (дд/мм/гг, чч.мм) и перезаписываться*/
let recordingDate;
/*Объявляем переменную, которая будет хранить 
HTMLCollection(массивоподобная коллекция) из элементов списка li*/
let collectionLi;
/*Объявляем переменную, которая будет хранить 
HTMLCollection(массивоподобная коллекция) из элементов span
c классом (main__list-item-text)*/
let collectionText;
/*Объявляем переменную, которая будет хранить 
HTMLCollection(массивоподобная коллекция) из элементов input
c классом (main__list-item-checkbox)*/
let collectionCheckbox;
/*Объявляем переменную, которая будет хранить 
HTMLCollection(массивоподобная коллекция) из элементов span
c классом (main__list-item-close)*/
let collectionClose;

/*______________Проверка записей на повторение____________________________*/
/*___функция проверяет на повторение, введенную запись в textarea с уже 
  существующими записями в блокноте*/
function checkEntriesForRepetition() {
  // Метод includes проверяет наличие элемента в массиве.
  // true - элемент есть
  // false - элемента нет
  let result = arrayListItems.includes(mainTextarea.value.trim());
  if (result === false) {
    arrayListItems.push(mainTextarea.value.trim());
  } else {
    console.log('Элемент уже существует в списке');
  }
  return result;
}

/*______________Добавление нового элемента________________________________*/
/*___функция добавляет новую запись в нумерованный список*/
function addNewElementList() {
  // Метод createElement позволяет создать новый элемент,
  // передав в параметре имя тега.
  let liElem = document.createElement('li');
  // для элемента <li> назначаем класс "main__list-item",
  // который в дальнейшем будем стилизовать
  // метод add объекта classList позволяет добавлять CSS классы элементу
  liElem.classList.add('main__list-item');

  // Метод createElement позволяет создать новый элемент,
  // передав в параметре имя тега
  let divElem1 = document.createElement('div');
  let spanElem1 = document.createElement('span');
  let inputElem1 = document.createElement('input');

  let divElem2 = document.createElement('div');
  let spanElem2 = document.createElement('span');
  let spanElem3 = document.createElement('span');

  // дата записи
  recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  // Создаёт новый текстовый узел с заданным текстом:
  let dateElem1 = document.createTextNode(recordingDate);
  // Создаёт новый текстовый узел с заданным текстом:
  let crossElem2 = document.createTextNode('x');

  /*для элементов назначаем классы
  Метод add объекта classList позволяет добавлять CSS классы элементу. */
  divElem1.classList.add('main__list-item-block1');
  spanElem1.classList.add('main__list-item-text');
  inputElem1.classList.add('main__list-item-checkbox');
  //
  divElem2.classList.add('main__list-item-block2');
  spanElem2.classList.add('main__list-item-date');
  spanElem3.classList.add('main__list-item-close');

  // добавляем атрибут для тега <input>
  inputElem1.setAttribute('type', 'checkbox');

  /* Во внутрь тега <div> вставляем заданный текст.
      Метод appendChild позволяет вставить в конец какого-либо другой элемент*/
  divElem1.appendChild(spanElem1);
  divElem1.appendChild(inputElem1);

  /* Во внутрь тега <div> вставляем заданный текст.
      Метод appendChild позволяет вставить в конец какого-либо другой элемент*/
  divElem2.appendChild(spanElem2);
  divElem2.appendChild(spanElem3);
  /* Во внутрь тега <span> вставляем заданный текст.
      Метод appendChild позволяет вставить в конец какого-либо другой элемент*/
  spanElem2.appendChild(dateElem1);
  spanElem3.appendChild(crossElem2);

  // Эта запись будет добавляться
  spanElem1.textContent = `${mainTextarea.value}`;
  // После добавление записи, input очищаем
  mainTextarea.value = '';

  // Во внутрь тега <li> вставляем тег <span>
  liElem.appendChild(divElem1);
  liElem.appendChild(divElem2);
  /* Во внутрь тега <ul> вставляем тег <li>.
    Метод appendChild позволяет вставить в конец какого-либо другой элемент*/
  elementUl.appendChild(liElem);
}

/*______________Поиск элементов___________________________________________*/
//___функция поиска элементов в списке
function search() {
  // переводим вводимою строку в верхний регистр
  let str = inpSearchElem.value.toUpperCase();
  /*Берем HTMLCollection элементов li списка ul, проходим по ним циклом, сравнивая их с
   переменной str предварительно переводя в верхний регистр.*/
  for (let i = 0; i < collectionLi.length; i++) {
    if (collectionText[i].textContent.toUpperCase().indexOf(str) > -1) {
      /*Если совпадение в строке найдено, 
      показываем элемент.
      Эквивалентно записи <li style="display: '' "></li>*/
      collectionLi[i].style.display = '';
    } else {
      /*Если совпадение в строке не найдено, 
      не показываем элемент.
      Эквивалентно записи <li style="display: none"></li>*/
      collectionLi[i].style.display = 'none';
    }
  }
}

/*______________Фильтрация________________________________________________*/
//___функция фильтрует записи в блокноте
function getFilteredItems() {
  if (selectElem.value === 'Все') {
    // console.log('Все');
    for (let i = 0; i < collectionCheckbox.length; i++) {
      collectionLi[i].style.display = '';
    }
  }
  if (selectElem.value === 'Выполненные') {
    // console.log('Выполненные');
    for (let i = 0; i < collectionCheckbox.length; i++) {
      if (collectionCheckbox[i].checked === true) {
        collectionLi[i].style.display = '';
      } else if (collectionCheckbox[i].checked === false) {
        collectionLi[i].style.display = 'none';
      }
    }
  }
  if (selectElem.value === 'Невыполненные') {
    // console.log('Невыполненные');
    for (let i = 0; i < collectionCheckbox.length; i++) {
      if (collectionCheckbox[i].checked === false) {
        collectionLi[i].style.display = '';
      } else if (collectionCheckbox[i].checked === true) {
        collectionLi[i].style.display = 'none';
      }
    }
  }
}

/*______________Счетчик выполненных/НЕвыполненных задач__________________*/
//___функция вычисляет количество выполненных и невыполненных задач
function calcCompletedAndUnfulfilledTasks() {
  //___Считываем элемент <span> (выполненные задачи)
  let completedTasks = document.querySelector('.main__counter-text-done');
  //___Считываем элемент <span> (НЕвыполненные задачи)
  let unfulfilledTasks = document.querySelector('.main__counter-text-notDone');
  // переменные (счетчики выполненных/невыполненных задач)
  let counterCompletedTasks = 0;
  let counterUnfulfilledTasks = 0;

  for (let elem of collectionCheckbox) {
    elem.checked ? counterCompletedTasks++ : counterUnfulfilledTasks++;
  }
  completedTasks.textContent = `выполненные - ${counterCompletedTasks}`;
  unfulfilledTasks.textContent = `невыполненные  - ${counterUnfulfilledTasks}`;

  // константы с процентами
  const twentyPercent = 0.2;
  const eightyPercent = 0.8;
  const ninetyPercent = 0.9;

  // Индикация выполненных задач
  mainIndicator.value = counterCompletedTasks;
  mainIndicator.low = (collectionCheckbox.length * twentyPercent).toFixed(2);
  mainIndicator.high = (collectionCheckbox.length * eightyPercent).toFixed(2);
  mainIndicator.max = collectionCheckbox.length;
  mainIndicator.optimum = (collectionCheckbox.length * ninetyPercent).toFixed(2);

  /*запускаем фильтрующую функцию, чтобы при установки/снятии флажка,
  запись в блокноте моментально отфильтровывалась, а не ждала, пока
  сделают клик по 'элементу (select)*/
  getFilteredItems();
}

/*______________Удаление записи___________________________________________*/
//___функция удаляет запись из списка
function deleteNoteElement() {
  /*Своим результатом метод bind возвращает новую функцию, 
    внутри которой this будет иметь жестко заданное значение. 
    Объект this указывает на элемент, в котором произошло событие.
    Метод remove позволяет удалить элемент.*/
  this.remove();

  // пересчитываем выполненные/невыполненные задачи
  calcCompletedAndUnfulfilledTasks();

  // переменная содержит элементы списка с классом (main__list-item-text)
  /*Свойство firstElementChild содержит первый дочерний элемент. 
  Дочерними элементами считаются все теги, которые непосредственно расположены внутри блока.*/
  let listItem = this.firstElementChild.firstElementChild.textContent;
  // удаление элемента из массива (arrayListItems)
  for (let i = 0; i < arrayListItems.length; i++) {
    if (listItem === arrayListItems[i]) {
      arrayListItems.splice(i, 1);
    }
  }
}

/*______________Редактирование записи_____________________________________*/
//___функция изменения состояния, если активна кнопка Добавить
function changingStateAddButton() {
  // меняем название кнопки
  mainBtn.textContent = 'Добавить';
  // меняем состояние
  condition = false;
}

//___функция изменения состояния, если активна кнопка Редактировать
function changingStateEditButton() {
  // меняем название кнопки
  mainBtn.textContent = 'Редактировать';
  // меняем состояние
  condition = true;
}

//___функция для редактирования записи
function editNote() {
  if (condition === false) {
    // после dblclick по редактируемому элементу, переходим в поле textarea
    mainTextarea.value = this.firstElementChild.firstElementChild.textContent;
    // Вызываем функцию изменения состояния, для кнопки Редактировать
    changingStateEditButton();

    /*======================================================================
    КОД дублируется из функции deleteNoteElement(), попробовать сделать так,
    чтобы он не дублировался, а переиспользовался в этих функциях!!!
    ======================================================================*/
    this.remove();
    calcCompletedAndUnfulfilledTasks();
    let listItem = this.firstElementChild.firstElementChild.textContent;
    for (let i = 0; i < arrayListItems.length; i++) {
      if (listItem === arrayListItems[i]) {
        arrayListItems.splice(i, 1);
      }
    }
  }
}

//___функция запускает считывание элементов с заданными классами
function startReadingElements() {
  //___считываемые элементы с классом main__list-item-text
  collectionText = document.getElementsByClassName('main__list-item-text');
  //___считываем элементы с классом main__list - item
  collectionLi = document.getElementsByClassName('main__list-item');
  //___считываем элементы с классом main__list-item-checkbox
  collectionCheckbox = document.getElementsByClassName(
    'main__list-item-checkbox'
  );
  //___считываемые элементы с классом main__list-item-close
  collectionClose = document.getElementsByClassName('main__list-item-close');
}

/*______________Объединяющее все функции событие___________________________*/
// Отслеживаем событие click при нажатии на кнопку
mainBtn.addEventListener('click', function () {
  /*Проверяем записанную строку в поле textarea на:
  -длина этой строки больше 0;
  -наличие этой строки в уже существующем списке записей*/
  if (
    mainTextarea.value.trim().length > 0 &&
    checkEntriesForRepetition() === false
  ) {
    // Вызываем функцию (добавление нового элемента списка)
    addNewElementList();
    // Вызываем функцию (считывание элементов с заданными классами)
    startReadingElements();
    // Вызываем функцию (Подсчет выполненных/НЕвыполненных задач)
    calcCompletedAndUnfulfilledTasks();
    // Вызываем функцию изменения состояния, для кнопки Добавить
    changingStateAddButton();

    /*В цикле мы получаем доступ к каждому элементу списка,
  а функция будет вызываться всякий раз, когда указанное событие доставляется 
  целевому объекту*/
    for (let i = 0; i < collectionLi.length; i++) {
      //=====Редактирование записи
      if (condition === false) {
        collectionLi[i].addEventListener('dblclick', editNote);
      }

      //=====Установить/убрать флажок
      collectionCheckbox[i].addEventListener(
        'click',
        calcCompletedAndUnfulfilledTasks
      );

      //=====Удалить запись из списка
      // методом bind привязываем навсегда контекст к функции (deleteNoteElement)
      collectionClose[i].addEventListener(
        'click',
        deleteNoteElement.bind(collectionLi[i])
      );
    }
    //=====Фильтрация
    selectElem.addEventListener('click', getFilteredItems);
    //=====Поиск
    inpSearchElem.addEventListener('keyup', search);
  }
});
