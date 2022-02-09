const [_, numbersString] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const numbers = numbersString.split(' ');

function solution(numbers) {
  const used = new Array(numbers.length + 1).fill(false);
  let max = 0;

  for (let i = 0; i < numbers.length; i++) {
    const currNum = numbers[i];
    const prevNum = numbers[i] - 1;
    used[currNum] = used[prevNum] ? used[prevNum] + 1 : 1;
    max = Math.max(max, used[currNum]);
  }

  console.log(numbers.length - max);
}

solution(numbers);
