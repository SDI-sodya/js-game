function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isPokemon(person) {
  return typeof person !== 'object' || !(person instanceof Pokemon);
}

function renderHPLife(person) {
  person.elHP.textContent = `${person.getHP()} / ${person.getMaxHP()}`;
}

function renderHPBar(person) {
  person.hpBar.style.width = `${person.getHP()}%`;
}

function renderHP(person) {
  renderHPLife(person);
  renderHPBar(person);
}

function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  renderHP(character);
  renderHP(enemy);
}

function disabledFightButton() {
  document.getElementById('btn-random-kick').setAttribute('disabled', '');
  document.getElementById('btn-static-kick').setAttribute('disabled', '');
}

function renderDamage(character, enemy) {
  if (character.hp <= 0 && character.hp < enemy.hp) {
    character.hp = 0;
    renderHP(character);
    disabledFightButton();
    alert(`${character.name} програв`);
  } else if (enemy.hp <= 0 && character.hp > enemy.hp) {
    enemy.hp = 0;
    renderHP(enemy);
    disabledFightButton();
    alert(`${enemy.name} програв бій`);
  } else if (character.hp <= 0 && enemy.hp <= 0) {
    character.hp = 0;
    enemy.hp = 0;
    renderHP(character);
    renderHP(enemy);
    disabledFightButton();
    alert(`Обидва програли програв бій`);
  }
  else {
    renderHP(character);
    renderHP(enemy);
  }
}

function attackRandom(character, enemy) {
  if (isPokemon(character) || isPokemon(enemy))
    throw new TypeError("One of them isn't a pockemon");
  character.hp -= getRandomInt(20);
  enemy.hp -= getRandomInt(20);
  renderDamage(character, enemy)
}

function attackStatic(character, enemy) {
  if (isPokemon(character) || isPokemon(enemy))
    throw new TypeError("It's not a pockemon");
  character.hp -= 10;
  enemy.hp -= 10;
  renderDamage(character, enemy)
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
}

let pokemonCharacter = new Pokemon('Pukachu', 100, 'electro', 'health-character', 'progressbar-character');
let pokemonEnemy = new Pokemon('Charmander', 100, 'flame', 'health-enemy', 'progressbar-enemy');

init(pokemonCharacter, pokemonEnemy);