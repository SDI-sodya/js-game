import { getRandomInt } from "./functional.js"

const logs = [
  '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
  '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
  '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
  '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
  '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком \<вырезанно цензурой\> противника.',
  '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
  '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
  '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
  '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
  '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

function logBattle(message) {
  const logsDiv = document.getElementById('logs');
  const newLog = document.createElement('div');
  newLog.textContent = message;
  logsDiv.prepend(newLog); // Додаємо новий лог на початок
}

function renderLog(character, enemy) {
  let logMessage = logs[getRandomInt(logs.length)].replace('[ПЕРСОНАЖ №1]', character.name).replace('[ПЕРСОНАЖ №2]', enemy.name);
  logBattle(logMessage);
}

function logDefeat(name = '') {
  disabledFightButton(0);
  disabledFightButton(1);
  logBattle(name ? `${name} програв бій` : 'Обидва програли бій');
}

export { renderLog, logBattle, logDefeat };