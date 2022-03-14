const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M, R] = input[0].split(' ').map(Number);
const ITEMS = input[1].split(' ').map(Number);
const ROUTES = input.splice(2).map((route) => route.split(' ').map(Number));

function solution(N, M, R, ITEMS, ROUTES) {
  const dist = new Array(N + 1)
    .fill(null)
    .map((_, i) => new Array(N + 1).fill(null).map((_, j) => (i === j ? 0 : Infinity)));
  let maxItemSum = 0;

  ROUTES.forEach(([v1, v2, distance]) => {
    dist[v1][v2] = distance;
    dist[v2][v1] = distance;
  });

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    let localMaxItemSum = 0;
    for (let j = 1; j <= N; j++) {
      if (dist[i][j] === Infinity || dist[i][j] > M) continue;
      localMaxItemSum += ITEMS[j - 1];
    }
    maxItemSum = Math.max(maxItemSum, localMaxItemSum);
  }

  console.log(maxItemSum);
}

solution(N, M, R, ITEMS, ROUTES);
