import { renderDamage } from "./attack.js";

function isPokemon(person) {
  return typeof person === 'object' || person instanceof Pokemon;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export class Pokemon {
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