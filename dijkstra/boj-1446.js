const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, D] = input[0].split(' ').map(Number);
const SHORT_CUTS = input.slice(1).map((shortCut) => shortCut.split(' ').map(Number));

function solution(N, D, SHORT_CUTS) {
  const distances = new Array(D + 1).fill(null).map((_, i) => i);
  const sortedShortCuts = SHORT_CUTS.sort((a, b) => a[1] - a[0] - a[2] - (b[1] - b[0] - b[2]));

  sortedShortCuts.forEach(([s, e, l]) => {
    if (e - s <= l || e > D) return;
    if (distances[s] + l >= distances[e]) return;
    const diff = distances[e] - (distances[s] + l);

    for (let i = e; i <= D; i++) {
      distances[i] -= diff;
    }
  });
  console.log(distances[D]);
}

solution(N, D, SHORT_CUTS);
