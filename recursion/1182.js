const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [countNumber, targetNumber] = input[0].split(' ').map((number) => +number);
const numbers = input[1].split(' ').map((stringTypeNumber) => +stringTypeNumber);

function solution(numbers, countNumber, targetNumber) {
  let count = 0;

  function recursion(index, targetNumber) {
    if (index === countNumber) return;

    if (targetNumber === numbers[index]) count++;

    const newTargetNumber = targetNumber - numbers[index];

    recursion(index + 1, newTargetNumber);
    recursion(index + 1, targetNumber);
  }

  recursion(0, targetNumber);
  console.log(count);
}

solution(numbers, countNumber, targetNumber);
