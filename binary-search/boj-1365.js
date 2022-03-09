const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const numbers = input[1].split(' ').map(Number);

function solution(N, numbers) {
  const minNumbers = new Array(N + 1).fill(Infinity);
  let max = 1;
  minNumbers[1] = numbers[0];

  for (let i = 1; i < N; i++) {
    const currentNumber = numbers[i];
    let lb = 0;
    let ub = i + 1;

    while (lb < ub - 1) {
      const mid = Math.floor((lb + ub) / 2);

      if (minNumbers[mid] < currentNumber) {
        lb = mid;
      } else {
        ub = mid;
      }
    }
    max = Math.max(max, ub);
    minNumbers[lb + 1] = currentNumber;
  }

  console.log(N - max);
}

solution(N, numbers);
