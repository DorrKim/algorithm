const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [K, N] = input[0].split(' ').map(Number);
const LINES = input.slice(1).map(Number);

function solution(K, N, LINES) {
  let lb = 0;
  let ub = 2 ** 31;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);
    let count = 0;

    for (let i = 0; i < LINES.length; i++) {
      count += Math.floor(LINES[i] / mid);
    }

    if (count < N) {
      ub = mid;
    } else {
      lb = mid + 1;
    }
  }
  console.log(lb - 1);
}

solution(K, N, LINES);
