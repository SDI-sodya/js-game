// Підключення логів з logs.js
import { renderLog, logBattle } from "./logs.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isPokemon(person) {
  return typeof person === 'object' || person instanceof Pokemon;
}

function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  character.renderHP();
  enemy.renderHP();
}

function disabledFightButton() {
  const buttons = document.getElementsByClassName('fight-button');
  Array.from(buttons).forEach(button => button.disabled = true);
}

function renderDamage(character, enemy) {
  const { hp: characterHP, name: characterName } = character;
  const { hp: enemyHP, name: enemyName } = enemy;

  if (characterHP <= 0 && characterHP < enemyHP) {
    character.hp = 0;
    character.renderHP();
    disabledFightButton();
    logBattle(`${characterName} програв бій`);
  } else if (enemyHP <= 0 && characterHP > enemyHP) {
    enemy.hp = 0;
    enemy.renderHP();
    disabledFightButton();
    logBattle(`${enemyName} програв бій`);
  } else if (characterHP <= 0 && enemyHP <= 0) {
    character.hp = 0;
    enemy.hp = 0;
    character.renderHP();
    enemy.renderHP();
    disabledFightButton();
    logBattle(`Обидва програли бій`);
  } else {
    character.renderHP();
    enemy.renderHP();
    
    renderLog(character, enemy);
  }
}

function pokemonAttack(character, enemy, damage = 0) {
  return character.attack(enemy, damage);
}

class Pokemon {
  constructor(name, max_hp, power, idHP, idBar) {
    this.name = name;
    this.hp = max_hp;
    this.max_hp = max_hp;
    this.power = power;
    this.elHP = document.getElementById(idHP);
    this.hpBar = document.getElementById(idBar);
  }

  getName() {
    return this.name;
  }

  getMaxHP() {
    return this.max_hp;
  }

  getHP() {
    return this.hp;
  }

  attack(enemy, damage = 0) {
    if (!isPokemon(enemy)) throw new TypeError("It's not a Pokémon");
    if (damage === 0) {
      this.hp -= getRandomInt(20);
      enemy.hp -= getRandomInt(20);
    } else {
      this.hp -= damage;
      enemy.hp -= damage;
    }
    renderDamage(this, enemy);
  }

  renderHP() {
    this.elHP.textContent = `${this.getHP()} / ${this.getMaxHP()}`;
    this.hpBar.style.width = `${(this.getHP() / this.getMaxHP()) * 100}%`;
  }
}

let pokemonCharacter = new Pokemon('Pikachu', 100, 'electro', 'health-character', 'progressbar-character');
let pokemonEnemy = new Pokemon('Charmander', 100, 'flame', 'health-enemy', 'progressbar-enemy');

init(pokemonCharacter, pokemonEnemy);


document.querySelector('.fight-button:nth-child(1)').addEventListener('click', () => {
  pokemonAttack(pokemonCharacter, pokemonEnemy);
});
document.querySelector('.fight-button:nth-child(2)').addEventListener('click', () => {
  pokemonAttack(pokemonCharacter, pokemonEnemy, 10);
});

export { getRandomInt };