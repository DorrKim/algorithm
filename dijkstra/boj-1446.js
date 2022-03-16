const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, D] = input[0].split(' ').map(Number);
const SHORT_CUTS = input.slice(1).map((shortCut) => shortCut.split(' ').map(Number));

function solution(N, D, SHORT_CUTS) {
  const distances = new Array(D + 1).fill(null).map((_, i) => i);

  for (let i = 0; i <= D; i++) {
    if (i > 0) {
      distances[i] = Math.min(distances[i], distances[i - 1] + 1);
    }
    SHORT_CUTS.forEach(([s, e, l]) => {
      if (i !== s || e > D || distances[e] - distances[s] <= l) return;
      distances[e] = distances[i] + l;
    });
  }

  console.log(distances[D]);
}

solution(N, D, SHORT_CUTS);
