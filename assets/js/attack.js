import { renderLog, logBattle, logDefeat  } from "./logs.js";
import { getRandomInt } from "./functional.js"

export function renderDamage(character, enemy, damage) {
  const characterHP = character.hp;
  const enemyHP = enemy.hp;

  if(characterHP <= 0 || enemyHP <= 0) {
    if(characterHP <= 0) character.hp = 0;
    if(enemyHP <= 0) enemy.hp = 0;

    renderHP(character, randomEnemyAttack(enemy));
    renderHP(enemy, damage);

    // if(characterHP <= 0 && enemyHP <= 0) {
    //   logDefeat();
    // } else {
    //   logDefeat(characterHP <= 0 ? character.name : enemy.name);
    // }
  } else {
    renderHP(character, randomEnemyAttack(enemy));
    renderHP(enemy, damage);
  }
}

export function pokemonAttack(character, enemy, damage = 0) {
  return character.attack(enemy, damage);
}

export function randomEnemyAttack(enemy) {
  const attack = Math.random() < 0.5 ? enemy.attacks[0] : enemy.attacks[getRandomInt(1, 3)];
  return getRandomInt(attack.minDamage, attack.maxDamage);
}

export function renderHP(pokemon, damage = 0) {
  if(damage != 0) pokemon.hp -= damage;
  const characterHealth = document.getElementsByClassName('text')[pokemon.id];
  characterHealth.innerText = `${pokemon.hp} / ${pokemon.maxHP}`;
}