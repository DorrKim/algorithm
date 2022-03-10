const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LIQUIDS = input[1].split(' ').map(Number);

function solution(N, LIQUIDS) {
  LIQUIDS.sort((a, b) => a - b);
  let s = 0;
  let e = N - 1;
  let min = Infinity;
  let left = 0;
  let right = 0;

  while (s < e) {
    const mixedLiquid = LIQUIDS[s] + LIQUIDS[e];
    if (min > Math.abs(mixedLiquid)) {
      min = Math.abs(mixedLiquid);
      left = LIQUIDS[s];
      right = LIQUIDS[e];
    }

    if (mixedLiquid < 0) {
      s++;
    } else e--;
  }
  console.log(left, right);
}

solution(N, LIQUIDS);
