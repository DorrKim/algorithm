const BOARD = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

function solution(BOARD) {
  const size = BOARD.length;
  const visit = new Array(7);
  const indexBoard = new Array(size * size).fill(null).map((_, index) => [Math.floor(index / 5), index % 5]);

  const sevenCombinations = getCombination(indexBoard, 7);

  const countfilteredCombinations = sevenCombinations.filter((comb) => {
    const filtered = comb.filter(([rowIndex, colIndex]) => BOARD[rowIndex][colIndex] === 'S');

    return filtered.length >= 4;
  });

  const continuousCombinations = countfilteredCombinations.filter((comb) => {
    visit.fill(false);
    const stack = [[...comb[0], 0]];
    visit[0] = true;

    while (stack.length) {
      const [row, col, index] = stack.pop();

      for (let i = 0; i < 4; i++) {
        const dx = '1102'[i] - 1;
        const dy = '0211'[i] - 1;

        const nx = row + dx;
        const ny = col + dy;

        if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue;
        const foundIndex = comb.findIndex(([rowIndex, colIndex]) => rowIndex === nx && colIndex === ny);
        if (foundIndex === -1 || visit[foundIndex]) continue;
        visit[foundIndex] = true;
        stack.push([nx, ny, foundIndex]);
      }
    }

    return visit.every((el) => el === true);
  });

  console.log(continuousCombinations.length);
}

function getCombination(array, number) {
  if (number === 1) return array.map((el) => [el]);
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const fixed = array[i];
    const rest = array.slice(i + 1);

    getCombination(rest, number - 1).forEach((el) => result.push([fixed, ...el]));
  }

  return result;
}

solution(BOARD);
