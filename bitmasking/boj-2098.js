const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const BOARD = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(N, BOARD) {
  const cache = new Array(N).fill(null).map(() => new Array(1 << N).fill(null));
  const result = tsp(0, 1);

  console.log(result);

  function tsp(current, visited) {
    if (cache[current][visited] !== null) return cache[current][visited];

    if (visited === (1 << N) - 1) {
      return (cache[current][visited] = BOARD[current][0] === 0 ? Infinity : BOARD[current][0]);
    }

    let min = Infinity;
    for (let i = 0; i < N; i++) {
      if (visited & (1 << i) || BOARD[current][i] === 0) continue;
      min = Math.min(min, tsp(i, visited | (1 << i)) + BOARD[current][i]);
    }
    return (cache[current][visited] = min);
  }
}

solution(N, BOARD);
