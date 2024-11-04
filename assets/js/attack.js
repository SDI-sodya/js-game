import { renderLog, logBattle, logDefeat  } from "./logs.js";
import { getRandomInt } from "./functional.js"

export function renderDamage(character, enemy, damage) {
  const characterHP = character.hp;
  const enemyHP = enemy.hp;

  if(characterHP <= 0 || enemyHP <= 0) {
    if(characterHP <= 0) character.hp = 0;
    if(enemyHP <= 0) enemy.hp = 0;

    renderHP(character, randomEnemyAttack(enemy), 0);
    renderHP(enemy, damage, 1);

    // if(characterHP <= 0 && enemyHP <= 0) {
    //   logDefeat();
    // } else {
    //   logDefeat(characterHP <= 0 ? character.name : enemy.name);
    // }
  } else {
    renderHP(character, randomEnemyAttack(enemy), 0);
    renderHP(enemy, damage, 1);
  }
}

export function pokemonAttack(character, enemy, damage = 0) {
  return character.attack(enemy, damage);
}

export function randomEnemyAttack(enemy) {
  const attack = Math.random() < 0.5 ? enemy.attacks[0] : enemy.attacks[getRandomInt(1, 3)];
  return getRandomInt(attack.minDamage, attack.maxDamage);
}

function renderHP(pokemon, damage) {
  pokemon.hp -= damage;
  const characterHealth = document.getElementsByClassName('text')[pokemon.id];
  characterHealth.innerText = `${pokemon.hp} / 100`;
}