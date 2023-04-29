// 'use strict';  отключил строгий режим по требованию eslint

const inpCurrent = document.querySelector('.input-currentID');
const btnCurrent = document.querySelector('.btn-currentID');

const inpData = document.querySelector('.input-dataID');
const btnData = document.querySelector('.btn-dataID');

const arrTableName = document.querySelectorAll('.content__table-name');
const arrTableMeaning = document.querySelectorAll('.content__table-meaning');

const arrTableNameError = document.querySelectorAll(
  '.content__table-name-error',
);
const arrTableMeaningError = document.querySelectorAll(
  '.content__table-meaning-error',
);

// API для получения своего IP
// eslint-disable-next-line camelcase
const url_IP = 'https://api.ipify.org?format=json';
// API для получения информации об IP (вместо-(161.185.160.93) подставить свой/чужой IP)
// eslint-disable-next-line camelcase, no-unused-vars
const url_data_IP = 'https://ipinfo.io/161.185.160.93/geo';

/* Глобальный fetch()метод запускает процесс извлечения ресурса из сети,
возвращая обещание (promise), которое выполняется, как только ответ
становится доступным. */

/* async - У этого слова один простой смысл: эта функция всегда возвращает промис.
Значения других типов оборачиваются в завершившийся успешно
промис автоматически. */

/* await - ключевое слово  заставит интерпретатор JavaScript ждать до тех пор, пока
промис справа от await не выполнится. После чего оно вернёт его результат,
и выполнение кода продолжится. */

// async await - асинхронное ожидание

// Функция для получения текущего IP адреса
async function getCurrentIPAddress(urlIP) {
  let result;
  try {
    // метод fetch возвращая обещание (promise)
    // ответ от сервера c текущим IP адресом
    const responseWithTheCurrentIP = await fetch(urlIP);
    // response.json() – декодирует ответ в формате JSON
    // тело ответа от сервера c текущим IP адресом
    const responseBodyCurrentIP = await responseWithTheCurrentIP.json();
    result = responseBodyCurrentIP;
    return result;
  } catch (error) {
    result = error;
    return result;
  }
}

// Функция для получения данных IP-адреса
async function getDataIP(ip) {
  let result;
  try {
    // метод fetch возвращая обещание (promise)
    // ответ от сервера c текущими данными по IP-адресу
    const responseWithCurrentIPData = await fetch(
      `https://ipinfo.io/${ip}/geo`,
    );
    // response.json() – декодирует ответ в формате JSON
    // тело ответа от сервера c текущими данными по IP-адресу
    const responseBodyCurrentIPData = responseWithCurrentIPData.json();
    result = responseBodyCurrentIPData;
    return result;
  } catch (error) {
    result = error;
    return result;
  }
}

// Функция проверяет код ответа
function checkTheResponseCode(status) {
  let responseCode;
  if (status >= 100 && status <= 103) {
    responseCode = `код ответа ${status} - (информационный)`;
    // console.log(`код ответа ${status} - (информационный)`);
  }
  if (status >= 200 && status <= 226) {
    responseCode = `код ответа ${status} - (успешно)`;
    // console.log(`код ответа ${status} - (успешно)`);
  }
  if (status >= 400 && status <= 499) {
    responseCode = `код ответа ${status} - (ошибка клиента)`;
    // console.log(`код ответа ${status} - (ошибка клиента)`);
  }
  if (status >= 500 && status <= 526) {
    responseCode = `код ответа ${status} - (ошибка сервера)`;
    // console.log(`код ответа ${status} - (ошибка сервера)`);
  }
  return responseCode;
}

// Функция заполняет пустыми ячейками таблицу
function fillTheTableWithEmptyCells(arrOfCells1, arrOfCells2) {
  for (let i = 0; i < arrOfCells1.length; i++) {
    arrOfCells1[i].textContent = '';
    arrOfCells2[i].textContent = '';
  }
}

// Функция выводит ответ от сервера в таблицу (таблица БЕЗ ОШИБОК)
function outputTheTableWithoutErrors(arrKeys, arrValues) {
  if (arrKeys.length === arrValues.length && arrKeys.length !== 2) {
    // Очищаем ячейки (таблица С ОШИБКАМИ)
    fillTheTableWithEmptyCells(arrTableNameError, arrTableMeaningError);
    // Заполняем таблицу (таблица БЕЗ ОШИБОК)
    for (let i = 0; i < arrKeys.length; i++) {
      arrTableName[i].textContent = `${arrKeys[i]}:`;
      arrTableMeaning[i].textContent = arrValues[i];
    }
  }
}

// Функция выводит ответ от сервера в таблицу (таблица С ОШИБКАМИ)
function outputTheTableWithAnError(arrKeys, arrValues) {
  if (arrKeys.length === 2) {
    // Очищаем ячейки (таблица БЕЗ ОШИБОК)
    fillTheTableWithEmptyCells(arrTableName, arrTableMeaning);
    // Заполняем таблицу (таблица С ОШИБКАМИ)
    arrTableNameError[0].textContent = `${arrKeys[0]} : `;
    arrTableNameError[1].textContent = `${arrKeys[1]} : `;

    arrTableMeaningError[0].textContent = checkTheResponseCode(arrValues[0]);
    const textError = `${arrValues[1].title}. ${arrValues[1].message}.`;
    arrTableMeaningError[1].textContent = textError;
  }
}

getCurrentIPAddress(url_IP).then((ipAddress) => {
  // console.log(ipAddress.ip);
  // по клику вывожу в инпут текущий IP-адрес
  btnCurrent.addEventListener('click', () => {
    inpCurrent.value = ipAddress.ip;
  });
});

btnData.addEventListener('click', () => {
  getDataIP(inpData.value).then((ipData) => {
    // массив с ключами объекта
    const arrKeysIpData = Object.keys(ipData);
    // массив с значениями объекта
    const arrValueIpData = Object.values(ipData);

    // Функция выводит ответ от сервера в таблицу (таблица БЕЗ ОШИБОК)
    outputTheTableWithoutErrors(arrKeysIpData, arrValueIpData);
    // Функция выводит ответ от сервера в таблицу (таблица С ОШИБКАМИ)
    outputTheTableWithAnError(arrKeysIpData, arrValueIpData);
  });
});
