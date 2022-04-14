const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split('').map(Number));

function solution(N, M, BOARD) {
  const cache = new Array(N + 1).fill(null).map(() => new Array(M + 1).fill(0));
  let max = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (BOARD[i][j] === 0) continue;
      if (cache[i][j] === 0 || cache[i][j + 1] === 0 || cache[i + 1][j] === 0) {
        cache[i + 1][j + 1] = 1;
      } else {
        const length = Math.min(Math.sqrt(cache[i][j]), Math.sqrt(cache[i][j + 1]), Math.sqrt(cache[i + 1][j])) + 1;
        cache[i + 1][j + 1] = length ** 2;
      }
      max = Math.max(max, cache[i + 1][j + 1]);
    }
  }

  console.log(max);
}

solution(N, M, BOARD);
