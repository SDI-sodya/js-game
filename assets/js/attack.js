import { renderLog, logBattle, logDefeat  } from "./logs.js";
import { getRandomInt } from "./functional.js"

export function renderDamage(character, enemy, damage) {
  const enemyDamage = randomEnemyAttack(enemy);
  pokemonAttack(enemy, damage);
  pokemonAttack(character, enemyDamage);

  let characterHP = character.hp;
  let enemyHP = enemy.hp;

  if(characterHP <= 0 || enemyHP <= 0) {
    
    if(characterHP <= 0) character.hp = 0;
    if(enemyHP <= 0) enemy.hp = 0;
    
    renderHP(character);
    renderHP(enemy);
    
    if(characterHP <= 0 && enemyHP <= 0) {
      logDefeat();
    } else {
      logDefeat(characterHP <= 0 ? character.name : enemy.name);
    }
  } else {
    
    renderHP(character);
    renderHP(enemy);
  }
}

export function pokemonAttack(pokemon, damage) {
  return pokemon.hp -= damage;
}

export function randomEnemyAttack(enemy) {
  const attack = Math.random() < 0.5 ? enemy.attacks[0] : enemy.attacks[getRandomInt(1, 3)];
  return getRandomInt(attack.minDamage, attack.maxDamage);
}

export function renderHP(pokemon) {
  const characterHealth = document.getElementsByClassName('text')[pokemon.id];
  characterHealth.innerText = `${pokemon.hp} / ${pokemon.maxHP}`;
}