export function init(character, enemy) {
  console.log('Ready, Steady, GO!');
  character.renderHP();
  enemy.renderHP();
}

export function disabledFightButton(numButt) {
  const buttons = document.getElementsByClassName('fight-button');
  buttons[numButt].disabled = true;
}