const input = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

const N = input[0];
const numbers = input.slice(1);

function solution(N, numbers) {
  let twoSums = new Set();

  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      twoSums.add(numbers[i] + numbers[j]);
    }
  }

  twoSums = [...twoSums].sort((a, b) => a - b);

  numbers.sort((a, b) => a - b);

  let result = null;

  loop1: for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      let lb = 0;
      let ub = twoSums.length - 1;
      const diff = numbers[i] - numbers[j];
      let find = false;

      while (lb <= ub) {
        const mid = Math.floor((lb + ub) / 2);

        if (twoSums[mid] > diff) {
          ub = mid - 1;
        } else if (twoSums[mid] < diff) {
          lb = mid + 1;
        } else {
          find = true;
          break;
        }
      }

      if (find) {
        result = numbers[i];

        break loop1;
      }
    }
  }
  console.log(result);
}

solution(N, numbers);
