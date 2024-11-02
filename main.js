// Підключення логів з logs.js
import { Pokemon, getRandomInt } from "./assets/js/Pokemon.js";
import { pokemonAttack } from "./assets/js/attack.js";
import { init, disabledFightButton } from "./assets/js/functional.js";




// Підразування кліків (із замиканням)
const createButtonClickCounter = (maxClicks, numAtackButt) => {
  let clickCount = 0;

  return () => {
    if (clickCount < maxClicks - 1) {
      clickCount++;
      console.log(`Button clicked ${clickCount} times. Remaining: ${maxClicks - clickCount}`);
    } else {
      console.log('Button has reached the maximum number of clicks.');
      disabledFightButton(numAtackButt);
    }
  };
}

let pokemonCharacter = new Pokemon('Pikachu', 100, 'electro', 'health-character', 'progressbar-character');
let pokemonEnemy = new Pokemon('Charmander', 100, 'flame', 'health-enemy', 'progressbar-enemy');

init(pokemonCharacter, pokemonEnemy);


const thunderJoltCounter = createButtonClickCounter(7, 0); // Лічильник для кнопки Thunder Jolt
const fireballCounter = createButtonClickCounter(9, 1); // Лічильник для кнопки Fireball

// Встановлюємо обробники подій
document.getElementById('staticdamage').addEventListener('click', () => {
    thunderJoltCounter();
    pokemonAttack(pokemonCharacter, pokemonEnemy);
});

document.querySelector('.fight-button:nth-child(2)').addEventListener('click', () => {
    fireballCounter();
    pokemonAttack(pokemonCharacter, pokemonEnemy, 10);
});


export { getRandomInt };