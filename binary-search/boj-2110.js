const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const positions = input.slice(1).map(Number);

function solution(N, M, positions) {
  positions.sort((a, b) => a - b);

  let lb = 0;
  let ub = 1000000000;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);
    let count = 1;
    let left = 0;
    let right = left + 1;

    while (right < N) {
      if (positions[right] - positions[left] < mid) {
        right++;
        continue;
      }

      count++;
      left = right;
      right = left + 1;
    }

    if (count < M) {
      ub = mid;
    } else {
      lb = mid + 1;
    }
  }

  console.log(lb - 1);
}

solution(N, M, positions);
