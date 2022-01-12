const [power, rowIndex, colIndex] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map((number) => +number);

function solution(power, row, col) {
  let result = 0;

  function recursion(power, row, col) {
    if (power === 0) return;

    const sideLength = 2 ** power;
    const area = sideLength ** 2;
    result += row >= sideLength / 2 ? area / 2 : 0;
    result += col >= sideLength / 2 ? area / 4 : 0;

    const newRow = row % (sideLength / 2);
    const newCol = col % (sideLength / 2);
    recursion(power - 1, newRow, newCol);
  }

  recursion(power, row, col);
  console.log(result);
}

solution(power, rowIndex, colIndex);
