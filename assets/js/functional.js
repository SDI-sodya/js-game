export function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  character.renderHP();
  enemy.renderHP();
}

export function disabledFightButton(numButt) {
  const buttons = document.getElementsByClassName('fight-button');
  buttons[numButt].disabled = true;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Підрахування кліків (із замиканням)
export const createButtonClickCounter = (maxClicks, numAtackButt) => {
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