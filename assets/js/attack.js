import { renderLog, logBattle, logDefeat  } from "./logs.js";
import { pokemons } from "./pokemons.js";
import { getRandomInt } from "./functional.js"
import { pokemonChoose, renderPokemon } from "../../main.js"

export function renderDamage(character, enemy, damage, characterHearts) {
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
    
    if(characterHearts <= 0) {
      logDefeat(character.name);
      return { enemy, characterHearts };
    }
    if(characterHP <= 0) {
      const heart = document.getElementsByClassName('heart')[characterHearts - 1];
      heart.src = './assets/images/broken_heart.png';
      characterHearts--;
      character.hp = character.maxHP;
    }
  } else {
    renderHP(character);
    renderHP(enemy);
  }
  if(enemyHP <= 0) {
    enemy = pokemonChoose(pokemons, getRandomInt(1, pokemons.length - 1));
    renderPokemon(enemy);
  }

  return { enemy, characterHearts };
}

export function pokemonAttack(pokemon, damage) {
  return pokemon.hp = pokemon.hp - damage;
}

export function randomEnemyAttack(enemy) {
  const attack = Math.random() < 0.5 ? enemy.attacks[0] : enemy.attacks[getRandomInt(1, 3)];
  return getRandomInt(attack.minDamage, attack.maxDamage);
}

export function renderHP(pokemon) {
  const characterHealth = document.getElementsByClassName('text')[pokemon.id];
  const healthBar = document.getElementById(`progressbar-${pokemon.id === 0 ? 'character' : 'enemy'}`);

  characterHealth.innerText = `${pokemon.hp} / ${pokemon.maxHP}`;

  const hpPercentage = (pokemon.hp / pokemon.maxHP) * 100;
  healthBar.style.width = `${hpPercentage}%`;

  healthBar.classList.remove('low', 'critical');

  if (hpPercentage < 20) {
    healthBar.classList.add('critical');
  } else if (hpPercentage < 60) {
    healthBar.classList.add('low');
  }
}
