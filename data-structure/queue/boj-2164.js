const input = require('fs').readFileSync('example.txt').toString().trim();
const N = +input;

function solution(N) {
  const numbers = new Array(N).fill(null).map((_, i) => i + 1);
  let pointer = 0;

  while (pointer < numbers.length) {
    pointer++;
    const number = numbers[pointer++];
    numbers.push(number);
  }

  console.log(numbers[pointer - 2]);
}

solution(N);
