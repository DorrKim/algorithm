const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const numbers = input[1].split(' ').map(Number);
const M = +input[2];
const targets = input[3].split(' ').map(Number);

function solution(numbers, targets) {
  numbers.sort((a, b) => a - b);

  const result = targets.map((target) => hasTarget(numbers, target)).join('\n');
  console.log(result);
}

function hasTarget(numbers, target) {
  let lowerBound = 0;
  let upperBound = numbers.length - 1;
  let result = 0;

  while (upperBound >= lowerBound) {
    let mid = Math.floor((lowerBound + upperBound) / 2);

    if (numbers[mid] > target) {
      upperBound = mid - 1;
    } else if (numbers[mid] < target) {
      lowerBound = mid + 1;
    } else {
      result = 1;
      break;
    }
  }
  return result;
}

solution(numbers, targets);
