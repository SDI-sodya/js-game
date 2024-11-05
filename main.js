import { pokemons } from "./assets/js/pokemons.js"
import { getRandomInt, createButtonClickCounter, disabledFightButton } from "./assets/js/functional.js"
import { renderDamage, renderHP } from "./assets/js/attack.js"



function createGame() {
  const pokemonCharacter = pokemons[0];
  let pokemonEnemy = pokemonChoose(pokemons, getRandomInt(1, pokemons.length - 1));
  let characterHearts = 3;
  renderPokemon(pokemonCharacter, 0);
  renderPokemon(pokemonEnemy, 1);

  renderHearts(characterHearts);
  
  renderAttackBtn(pokemonCharacter, pokemonEnemy, characterHearts);
}


function renderHearts(heartsCount) {
  createHearts(heartsCount);
}


function createHearts(heartsCount) {
  const allHearts = document.getElementById('hearts');
  for(let i = 0; i < heartsCount; i++) {
    const heart = document.createElement('img');
    heart.src = "./assets/images/heart.webp";
    heart.alt = 'Heart of life';
    heart.className = 'heart';
    allHearts.appendChild(heart);
  }
}

function createAttackBtns(attackBtnsArr) {
  const control = document.getElementById('control');
  for(let i = 0; i < attackBtnsArr.length; i++) {
    const newBtn = document.createElement('button');
    newBtn.classList.add('button', 'fight-button');
    newBtn.textContent = attackBtnsArr[i].name;
    control.appendChild(newBtn);

    const newCounter = document.createElement('span');
    newCounter.className = 'click';
    newCounter.textContent = attackBtnsArr[i].maxCount;
    newBtn.appendChild(newCounter);
  }
}



function addFuncToBtns(character, enemy, characterHearts) {
  const attackBtnsArr = document.getElementsByClassName('fight-button');
  const countText = document.getElementsByClassName('click');
  for(let i = 0; i < attackBtnsArr.length; i++) {
    const attack = character.attacks[i];
    let counter;

    attackBtnsArr[i].addEventListener('click', () => {
      const result = renderDamage(character, enemy, getRandomInt(attack.minDamage, attack.maxDamage), characterHearts);
      enemy = result.enemy;
      characterHearts = result.characterHearts;
      if(counter === undefined)
        counter = createButtonClickCounter(attack.maxCount);
      let clicks = counter();
      countText[i].innerText = `${attack.maxCount - clicks}`;
      if (clicks === 0)
        disabledFightButton(i);
      renderHP(character);
      renderHP(enemy);
    });
  }
}



function renderAttackBtn(character, enemy, characterHearts) {
  const pokemonsAttacks = character.attacks;

  createAttackBtns(pokemonsAttacks, character);
  addFuncToBtns(character, enemy, characterHearts);
}



export function renderPokemon(pokemon, id = 1) {
  if(pokemon.maxHP === undefined) pokemon.maxHP = pokemon.hp;
  pokemon.id = id;
  pokemon.hp = pokemon.maxHP;
  renderHP(pokemon);

  // Name, Images
  const name = document.getElementsByClassName('name')[pokemon.id];
  const img = document.getElementsByClassName('sprite')[pokemon.id];

  name.innerText = pokemon.name;
  img.attributes.src.value = pokemon.img;
  // textContent, value, nodeVlue
}



export function pokemonChoose(pokemonArr, i) {
  return pokemonArr.slice(i, i+1)[0];
}

/*
  У персонажда есть 3 жизни которые тратятся, пока он сражается с врагами.
  После рендера покемонов нужно прописать Пикачу 3 жизни, котоыре будут тратиться в тот момент, когда он будет погибать (когда хп будет равно 0, то будет сниматься одно сердечко и востанавливаться здоровье).
  После утраты 3-х сердец игра останавливается


*/

createGame();


/*
  Доп задания:
  -После того как вы победили врага, отрисуйте нового рандомного врага, чтобы продолжить драться...
  Кол-во уждаров у вас ограничено, как и жизней, так что пользуйтесь ударами с умом...
  Не все сильные удары самые эффективные...

  Доп-доп задания:
  Добавить классы .low и .critical.
  В методе renderProgressbarHP() допишите условия, если жизней меньше 60 но больше 20, то добавляйте класс low, если меньше 20, то класс .critical

*/