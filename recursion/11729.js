const input = require('fs').readFileSync('/dev/stdin').toString();
const countRoundPlate = +input;

const isOdd = (number) => Boolean(number % 2);

let result = '';
let moves = '';
let count = 0;

const hanoiMove = (startPoint, endPoint, countPlate) => {
  const sparePoint = [1, 2, 3].find((number) => number !== startPoint && number !== endPoint);
  if (countPlate === 1) {
    moves += isOdd(countPlate) ? `${startPoint} ${endPoint}\n` : `${sparePoint} ${endPoint}\n`;
    count++;
    return;
  }
  hanoiMove(startPoint, sparePoint, countPlate - 1);
  moves += `${startPoint} ${endPoint}\n`;
  count++;
  hanoiMove(sparePoint, endPoint, countPlate - 1);
};

hanoiMove(1, 3, countRoundPlate);

result = `${count} \n${moves}`;
console.log(result);
