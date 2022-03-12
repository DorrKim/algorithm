const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(Number);
const NUMBERS = input[1].split(' ').map(Number);

function solution(N, S, NUMBERS) {
  let s = 0;
  let e = 1;
  let partialSum = NUMBERS[0];
  let length = Infinity;

  while (s < N) {
    if (partialSum >= S || e >= N) {
      partialSum -= NUMBERS[s++];
    } else {
      partialSum += NUMBERS[e++];
    }

    if (partialSum >= S) {
      length = Math.min(length, e - s);
    }
  }

  console.log(length === Infinity ? 0 : length);
}

solution(N, S, NUMBERS);
