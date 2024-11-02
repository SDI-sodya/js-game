import { renderLog, logBattle } from "../../logs.js";
import { disabledFightButton } from "./functional.js";

export function renderDamage(character, enemy) {
  const { hp: characterHP, name: characterName } = character;
  const { hp: enemyHP, name: enemyName } = enemy;

  if (characterHP <= 0 && characterHP < enemyHP) {
    character.hp = 0;
    character.renderHP();
    disabledFightButton(0);
    disabledFightButton(1);
    logBattle(`${characterName} програв бій`);
  } else if (enemyHP <= 0 && characterHP > enemyHP) {
    enemy.hp = 0;
    enemy.renderHP();
    disabledFightButton(0);
    disabledFightButton(1);
    logBattle(`${enemyName} програв бій`);
  } else if (characterHP <= 0 && enemyHP <= 0) {
    character.hp = 0;
    enemy.hp = 0;
    character.renderHP();
    enemy.renderHP();
    disabledFightButton(0);
    disabledFightButton(1);
    logBattle(`Обидва програли бій`);
  } else {
    character.renderHP();
    enemy.renderHP();
    renderLog(character, enemy);
  }
}

export function pokemonAttack(character, enemy, damage = 0) {
  return character.attack(enemy, damage);
}