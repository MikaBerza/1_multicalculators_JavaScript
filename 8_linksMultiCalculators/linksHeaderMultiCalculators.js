/* ----------------------------Ссылки для второстепенных страниц----------------------------*/
/*
 Для второстепенных страниц (название.html). В разделе Header считываем
 id элементов тега <a> на мультикалькуляторы,
 и присваиваем им ссылки, чтобы они были кликабельны.
 Присваиваем для удобства(оптимизации) их замены, в случае изменения их адреса,
 чтобы не искать их в огромном файле index.html.
*/
document.getElementById('main__page').href = 'http://192.168.1.101:5500/6_0_mainPage/mainIndex.html';
document.getElementById('header__borsch').href = 'http://192.168.1.101:5500/6_1_borschPage/borschIndex.html';
document.getElementById('header__pancake').href = 'http://192.168.1.101:5500/6_2_pancakesPage/pancakesPageIndex.html';
document.getElementById('header__pilaf').href = 'http://192.168.1.101:5500/6_3_pilafPage/pilafIndex.html';
document.getElementById('header__mortgage').href = 'http://192.168.1.101:5500/6_4_mortgageCalculatorPage/mortgageCalculatorIndex.html';
document.getElementById('header__day').href = 'http://192.168.1.101:5500/6_5_dailyCalculatorPage/dailyCalculatorIndex.html';
document.getElementById('header__factsCats').href = 'http://192.168.1.101:5500/6_6_factsAboutCatsPage/factsAboutCatsIndex.html';
document.getElementById('header__energy').href = 'http://192.168.1.101:5500/6_7_electricityCalculatorPage/electricityCalculatorIndex.html';
document.getElementById('header__coldWater').href = 'http://192.168.1.101:5500/6_8_waterCalculatorPage/waterCalculatorIndex.html';
document.getElementById('header__todoList').href = 'http://192.168.1.101:5500/6_9_dailyTodoListPage/dailyTodoListIndex.html';
document.getElementById('header__password').href = 'http://192.168.1.101:5500/6_10_passwordGeneratorPage/passwordGeneratorIndex.html';
document.getElementById('header__notepad').href = 'http://192.168.1.101:5500/6_11_notepadPage/notepadIndex.htm';
document.getElementById('header__informationIp').href = 'http://192.168.1.101:5500/6_12_informationIpPage/informationIpIndex.html';

/*
Адрес формы входа на главную страницу (домашних калькуляторов) (6_11_entrance)
http://127.0.0.1:5500/6_11_entrance/entranceIndex.html
*/
