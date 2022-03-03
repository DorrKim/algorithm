const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const M = +input[1];
const LINKS = input.slice(2).map((link) => link.split(' ').map(Number));

function solution(N, M, LINKS) {
  const dist = new Array(N).fill(null).map((_, i) => new Array(N).fill(null).map((_, j) => (i === j ? 0 : Infinity)));

  LINKS.forEach(([start, end, cost]) => {
    dist[start - 1][end - 1] = Math.min(dist[start - 1][end - 1], cost);
  });

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        dist[i][j] = Math.min(dist[i][k] + dist[k][j], dist[i][j]);
      }
    }
  }

  console.log(dist.map((row) => row.map((el) => (el === Infinity ? 0 : el)).join(' ')).join('\n'));
}

solution(N, M, LINKS);
