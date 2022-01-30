const [[boardSize], ...board] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(boardSize, board) {
  const cache = Array.from({ length: boardSize }, () => new Array(boardSize).fill(0n));
  cache[boardSize - 1][boardSize - 1] = 1n;

  for (let i = boardSize - 1; i >= 0; i--) {
    for (let j = boardSize - 1; j >= 0; j--) {
      if (i === boardSize - 1 && j === boardSize - 1) continue;
      const step = board[i][j];
      j + step < boardSize && (cache[i][j] += cache[i][j + step]);

      i + step < boardSize && (cache[i][j] += cache[i + step][j]);
    }
  }
  console.log(cache[0][0].toString());
}

solution(boardSize, board);
