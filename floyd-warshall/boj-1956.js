const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [V, E] = input[0].split(' ').map(Number);
const ROUTES = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(V, E, ROUTES) {
  const dist = new Array(V + 1).fill(null).map(() => new Array(V + 1).fill(Infinity));

  ROUTES.forEach(([from, to, length]) => {
    dist[from][to] = length;
  });

  for (let k = 1; k <= V; k++) {
    for (let i = 1; i <= V; i++) {
      for (let j = 1; j <= V; j++) {
        if (dist[i][k] === Infinity || dist[k][j] === Infinity) continue;
        dist[i][j] = Math.min(dist[i][k] + dist[k][j], dist[i][j]);
      }
    }
  }

  let minCycleLength = Infinity;

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i === j) continue;
      if (dist[i][j] === Infinity || dist[j][i] === Infinity) continue;
      minCycleLength = Math.min(dist[i][j] + dist[j][i], minCycleLength);
    }
  }

  console.log(minCycleLength === Infinity ? -1 : minCycleLength);
}

solution(V, E, ROUTES);
