const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, BOARD) {
  const cache = new Array(1 << N).fill(null);

  let globalMin = Infinity;
  for (let i = 0; i < N; i++) {
    const result = dfs(0, 1 << i) + BOARD[i][0];
    globalMin = Math.min(result, globalMin);
  }

  console.log(globalMin);

  function dfs(depth, visited) {
    if (cache[visited] !== null) return cache[visited];
    if (visited === (1 << N) - 1) return 0;

    let min = Infinity;
    for (let i = 0; i < N; i++) {
      if (visited & (1 << i)) continue;

      const localMin = dfs(depth + 1, visited | (1 << i)) + BOARD[i][depth + 1];
      min = Math.min(localMin, min);
    }

    return (cache[visited] = min);
  }
}

solution(N, BOARD);
