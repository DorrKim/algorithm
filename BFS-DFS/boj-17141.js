const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const virusPuttablePositions = filtertVirusPuttablePositions(BOARD);
  const virusPositionsList = getCombination(virusPuttablePositions, M);
  let minLocalMaxTimes = N * N;

  virusPositionsList.forEach((virusPositions) => {
    const newBoard = JSON.parse(JSON.stringify(BOARD));
    const bfsqueue = [];
    let pointer = 0;
    let localMaxTime = 0;

    virusPositions.forEach(([row, col]) => {
      newBoard[row][col] = -1;
      bfsqueue.push([row, col, 0]);
    });

    while (pointer < bfsqueue.length) {
      const [row, col, time] = bfsqueue[pointer++];
      localMaxTime = Math.max(localMaxTime, time);

      for (let i = 0; i < 4; i++) {
        const nr = '1102'[i] - 1 + row;
        const nc = '0211'[i] - 1 + col;

        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (newBoard[nr][nc] === -1 || newBoard[nr][nc] === 1) continue;
        newBoard[nr][nc] = -1;
        bfsqueue.push([nr, nc, time + 1]);
      }
    }
    const isFullFilled = checkFullVirus(newBoard);
    localMaxTime = isFullFilled ? localMaxTime : N * N;
    minLocalMaxTimes = Math.min(minLocalMaxTimes, localMaxTime);
  });

  const result = minLocalMaxTimes === N * N ? -1 : minLocalMaxTimes;
  console.log(result);
}

function filtertVirusPuttablePositions(BOARD) {
  const virusPuttablePositions = [];

  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD.length; j++) {
      if (BOARD[i][j] !== 2) continue;
      virusPuttablePositions.push([i, j]);
    }
  }

  return virusPuttablePositions;
}

function getCombination(array, number) {
  if (number === 1) return array.map((el) => [el]);
  const result = [];

  for (let i = 0; i <= array.length - number; i++) {
    const fixed = array[i];
    const rest = array.slice(i + 1);

    getCombination(rest, number - 1).forEach((comb) => {
      result.push([fixed, ...comb]);
    });
  }
  return result;
}

function checkFullVirus(board) {
  return !board.some((row) => row.some((el) => el !== 1 && el !== -1));
}

solution(N, M, BOARD);
