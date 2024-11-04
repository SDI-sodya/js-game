import { pokemons } from "./assets/js/pokemons.js"
import { getRandomInt } from "./assets/js/functional.js"
import { renderDamage } from "./assets/js/attack.js"



function createGame() {
  const pokemonCharacter = pokemons[1];
  let pokemonEnemy = pokemons[getRandomInt(1, pokemons.length - 1)];
  renderAttackBtn(pokemonCharacter);
  renderPokemon(pokemonCharacter);
  // renderPokemon(pokemonEnemy);
}



function createAttackBtns(attackBtnsArr) {
  const control = document.getElementById('control');

  for(let i = 0; i < attackBtnsArr.length; i++) {
    const newBtn = document.createElement('button');
    newBtn.classList.add('button', 'fight-button');
    newBtn.textContent = attackBtnsArr[i].name;
    control.appendChild(newBtn);
  }
}



function addFuncToBtns(character, enemy) {
  const attackBtnsArr = document.getElementsByClassName('fight-button');
  for(let i = 0; i < attackBtnsArr.length; i++) {
    const attack = character.attacks[i];
    attackBtnsArr[i].addEventListener('click', () => {
      renderDamage(character, enemy, getRandomInt(attack.minDamage, attack.maxDamage));
    });
  }
}



function renderAttackBtn(character, enemy) {
  const pokemonsAttacks = character.attacks;

  createAttackBtns(pokemonsAttacks);
  addFuncToBtns(character, enemy);
}



function renderPokemon(pokemon) {
  
}



const pokemonCharacter = pokemons[0];
let pokemonEnemy = pokemons[getRandomInt(1, pokemons.length - 1)];

// Встановлюємо обробники подій
// document.getElementById('staticdamage').addEventListener('click', () => {
//     thunderJoltCounter();
//     pokemonAttack(pokemonCharacter, pokemonEnemy);
// });

// document.querySelector('.fight-button:nth-child(2)').addEventListener('click', () => {
//     fireballCounter();
//     pokemonAttack(pokemonCharacter, pokemonEnemy, 10);
// });


/*
  -1. Импортировать массив с покемонами import
  2. Функция вывода имени покемона. renderName()
    Долна принимать покемона и выводить его в определённый блок на странице
  3 ???. Функция вывода типа покемона
  4. Функция вывода ХП покемона rednerHP()
    Должна принимать покемона и выводить его ХП в определённый блок на странице
  5. Функция вывода картинки renderImg()
    Должна принимать покемона и выводить его картинку в определённый блок на странице
  -6_1. Функция созданяи кнопок с названиями атак createAttackBtn()
  -6_2. Функция вывода массива кнопок renderAttackBtn()
    Должна принимать покемона. Внутри 
  -7. Функция атаки attack()
    Должна принимать номер атаки у покемона.
    При нажатии на кнопку рандомиться кол-во дамага (getRandomInt) и минусуется у противника.
  -8. Присоединить функцию атаки к кнопке с указанными значениями минимального/максимального дамага
  9. Присоединить функция счётчика количества ударов к кнопкам с указанными значениями максимального кол-ва кликов
  10. 



  Доп задания:
  После того как вы победили врага, отрисуйте нового рандомного врага, чтобы продолжить драться...
  Кол-во уждаров у вас ограничено, как и жизней, так что пользуйтесь ударами с умом...
  Не все сильные удары самые эффективные...

  Доп-доп задания:
  Добавить классы .low и .critical.
  В методе renderProgressbarHP() допишите условия, если жизней меньше 60 но больше 20, то добавляйте класс low, если меньше 20, то класс .critical

*/