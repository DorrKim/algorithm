const [_, strNumbers] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const numbers = strNumbers.split(' ');

const comparer = (a, b) => {
  return b.repeat(10).localeCompare(a.repeat(10));
};

function solution(numbers) {
  const a = numbers.sort(comparer).join('');

  console.log(BigInt(a).toString());
}

solution(numbers);
