const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);
const targets = input[3].split(' ').map(Number);

function solution(numbers, targets) {
  numbers.sort((a, b) => a - b);

  const result = targets
    .map((target) => {
      const count = findRight(target, numbers) - findLeft(target, numbers);
      return count;
    })
    .join(' ');
  console.log(result);
}

function findLeft(target, numbers) {
  let lb = 0;
  let ub = numbers.length;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);

    if (numbers[mid] < target) {
      lb = mid + 1;
    } else {
      ub = mid;
    }
  }

  return lb;
}

function findRight(target, numbers) {
  let lb = 0;
  let ub = numbers.length;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);

    if (numbers[mid] <= target) {
      lb = mid + 1;
    } else if (numbers[mid] > target) {
      ub = mid;
    }
  }

  return lb;
}

solution(numbers, targets);
