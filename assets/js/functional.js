export function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  character.renderHP();
  enemy.renderHP();
}

export function disabledFightButton(numButt = -1) {
  const buttons = document.getElementsByClassName('fight-button');
  if(numButt === -1) {
    for(let i = 0; i < buttons.length; i++) 
      buttons[i].disabled = true;
  } else {
    buttons[numButt].disabled = true;
  }
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Підрахування кліків (із замиканням)
export const createButtonClickCounter = (maxClicks) => {
  let clickCount = 0;

  return () => {
    if (clickCount < maxClicks - 1) {
      clickCount++;
      console.log(`Button clicked ${clickCount} times. Remaining: ${maxClicks - clickCount}`);
      return clickCount;
    } else {
      console.log('Button has reached the maximum number of clicks.');
      return clickCount = 0;
    }
  };
}