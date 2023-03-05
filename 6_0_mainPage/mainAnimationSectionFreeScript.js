/*активация строго режима*/
'use strict';

/*<!-----SectionThree--------------------------------------------------------------------------->*/
/*---------Анимация из картинок----------------------------------------------------*/
// Получаем доступ к нужному нам элементу
const elemImg = document.getElementById('imgSectionThree');
const elemBtnStart = document.getElementById('btnSectionThreeStart');
const elemBtnStop = document.getElementById('btnSectionThreeStop');

// Формируем массив ссылок на картинки (для анимации)
const imgArr = [
  '/5_img/5_0_mainImg/SectionThreeViking/1.png',
  '/5_img/5_0_mainImg/SectionThreeViking/2.png',
  '/5_img/5_0_mainImg/SectionThreeViking/3.png',
  '/5_img/5_0_mainImg/SectionThreeViking/4.png',
  '/5_img/5_0_mainImg/SectionThreeViking/5.png',
  '/5_img/5_0_mainImg/SectionThreeViking/6.png',
  '/5_img/5_0_mainImg/SectionThreeViking/7.png',
  '/5_img/5_0_mainImg/SectionThreeViking/8.png',
  '/5_img/5_0_mainImg/SectionThreeViking/9.png',
  '/5_img/5_0_mainImg/SectionThreeViking/10.png',
];

/* 
Инициализируем переменную (timer) как глобальную
чтобы в ней между запусками функции (start, stop)
хранилось значение
*/
let timer;
// инициализируем счетчик который будет отвечать за картинки
let counterImg = 0;

// Функция для запуска анимации
function startAnimation() {
  timer = setInterval(function () {
    // Прибавляем к счетчику +1
    ++counterImg;
    // по очереди из массива добавляем картинки
    elemImg.setAttribute('src', imgArr[counterImg]);
    if (counterImg > 0 && counterImg < 10) {
      // Ставим блок формы (кнопки)
      elemBtnStart.disabled = true;
    } else if (counterImg === 10) {
      // Проверяю что counterImg === 10
      console.log('Десять');
      // Выстовляю стартовую картинку
      elemImg.setAttribute('src', imgArr[0]);
      // Останавливаю таймер
      clearInterval(timer);
      // Сбрасываю счетчик на 0
      counterImg = 0;
      // Удаляю блок формы (кнопки)
      elemBtnStart.removeAttribute('disabled');
    }
  }, 300);
}

// Функция для остановки анимации
function stopAnimation() {
  // clearInterval останавливаем таймер
  clearInterval(timer);
  // Удаляю блок формы (кнопки)
  elemBtnStart.removeAttribute('disabled');
}

/*
Метод addEventListener - добавляет обработчик события к указанному элементу и 
запустить выполнение программы при совершении заданного действия
*/
elemBtnStart.addEventListener('dblclick', startAnimation);
elemBtnStop.addEventListener('click', stopAnimation);
