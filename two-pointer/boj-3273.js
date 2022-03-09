const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const numbers = input[1].split(' ').map(Number);
const X = +input[2];

function solution(N, numbers, X) {
  let s = 0;
  let e = N - 1;
  let count = 0;

  numbers.sort((a, b) => b - a);

  while (s < e) {
    const currSum = numbers[s] + numbers[e];
    if (currSum === X) count++;

    if (currSum >= X) {
      s++;
    } else {
      e--;
    }
  }

  console.log(count);
}

solution(N, numbers, X);
