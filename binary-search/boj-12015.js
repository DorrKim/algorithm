const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const N = +input[0];
const numbers = input[1].split(' ').map(Number);

function solution(N, numbers) {
  const minNumberTodp = new Array(N).fill(Infinity);
  let max = 1;
  minNumberTodp[0] = numbers[0];

  for (let i = 1; i < N; i++) {
    let lb = 0;
    let ub = i;

    while (lb < ub) {
      const mid = Math.floor((lb + ub) / 2);
      if (minNumberTodp[mid] < numbers[i]) {
        lb = mid + 1;
      } else {
        ub = mid;
      }
    }
    max = Math.max(max, ub + 1);
    minNumberTodp[lb] = numbers[i];
  }
  console.log(max);
}

solution(N, numbers);
