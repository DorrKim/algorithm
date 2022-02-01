const [[length, width], ...board] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

function solution(length, width, board) {
  const cache = Array.from({ length: 2 }, () => new Array(width + 1).fill(0));

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= width; j++) {
      cache[i % 2][j] =
        Math.max(cache[(i - 1) % 2][j], cache[i % 2][j - 1], cache[(i - 1) % 2][j - 1]) + board[i - 1][j - 1];
    }
  }

  console.log(cache[length % 2][width]);
}

solution(length, width, board);
