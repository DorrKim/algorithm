const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const COMPARES = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(N, M, COMPARES) {
  const dist = new Array(N + 1).fill(null).map(() => new Array(N + 1).fill(Infinity));
  const know = new Array(N + 1).fill(0);

  COMPARES.forEach(([short, tall]) => {
    dist[short][tall] = 1;
  });

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (dist[i][j] === Infinity) continue;
      know[i] += 1;
      know[j] += 1;
    }
  }
  console.log(know.filter((el) => el === N - 1).length);
}
solution(N, M, COMPARES);
