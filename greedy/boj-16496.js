const [_, strNumbers] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const numbers = strNumbers.split(' ');

const comparer = (a, b) => {
  return b.repeat(10).localeCompare(a.repeat(10));
};

function solution(numbers) {
  if (numbers.every((number) => number === '0')) {
    console.log(0);
    return;
  }

  const a = numbers.sort(comparer).join('');

  console.log(a === '1111111111111111110111101111101111110111111011011101010101011010101010');
}

solution(numbers);
