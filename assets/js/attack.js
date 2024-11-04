import { renderLog, logBattle } from "../../logs.js";
import { disabledFightButton } from "./functional.js";

function logDefeat(name = '') {
  disabledFightButton(0);
  disabledFightButton(1);
  logBattle(name ? `${name} програв бій` : 'Обидва програли бій');
}

export function renderDamage(character, enemy) {
  const { hp: characterHP, name: characterName } = character;
  const { hp: enemyHP, name: enemyName } = enemy;

  if(characterHP <= 0 || enemyHP <= 0) {
    if(characterHP <= 0) character.hp = 0;
    if(enemyHP <= 0) enemy.hp = 0;
    character.renderHP();
    enemy.renderHP();

    if(characterHP <= 0 && enemyHP <= 0) {
      logDefeat();
    } else {
      logDefeat(characterHP <= 0 ? characterName : enemyName);
    }
  } else {
    character.renderHP();
    enemy.renderHP();
    renderLog(character, enemy);
  }
}

export function pokemonAttack(character, enemy, damage = 0) {
  return character.attack(enemy, damage);
}