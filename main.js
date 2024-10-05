function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isPokemon(person) {
  return typeof person == 'object' || person instanceof Pokemon;
}

function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  renderHP(character);
  renderHP(enemy);
}

function disabledFightButton() {
  let arr = document.getElementsByClassName('fight-button');
  for (i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
}

function renderDamage(character, enemy) {
  if (character.hp <= 0 && character.hp < enemy.hp) {
    character.hp = 0;
    character.renderHP();
    disabledFightButton();
    alert(`${character.name} програв бій`);
  } else if (enemy.hp <= 0 && character.hp > enemy.hp) {
    enemy.hp = 0;
    enemy.renderHP();
    disabledFightButton();
    alert(`${enemy.name} програв бій`);
  } else if (character.hp <= 0 && enemy.hp <= 0) {
    character.hp = 0;
    enemy.hp = 0;
    character.renderHP();
    enemy.renderHP();
    disabledFightButton();
    alert(`Обидва програли бій`);
  }
  else {
    character.renderHP();
    enemy.renderHP();
  }
}

function pokemonAttack(character, enemy, damage) {
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
    if (!isPokemon(enemy))
      throw new TypeError("It's not a pockemon");
    if(damage === 0) {
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
    this.hpBar.style.width = `${this.getHP()}%`;
  }
}

let pokemonCharacter = new Pokemon('Pukachu', 100, 'electro', 'health-character', 'progressbar-character');
let pokemonEnemy = new Pokemon('Charmander', 100, 'flame', 'health-enemy', 'progressbar-enemy');

init(pokemonCharacter, pokemonEnemy);