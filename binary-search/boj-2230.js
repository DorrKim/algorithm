const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const numbers = input.slice(1).map(Number);

function solution(N, M, numbers) {
  numbers.sort((a, b) => a - b);

  let minDiff = Infinity;
  for (let i = 0; i < N; i++) {
    if (numbers[i] + M > numbers[N - 1]) continue;
    const lowerBoundIndex = lowerBound(0, N, numbers, numbers[i] + M);
    minDiff = Math.min(minDiff, numbers[lowerBoundIndex] - numbers[i]);
  }

  console.log(minDiff);
}

function lowerBound(start, end, array, number) {
  let left = start;
  let right = end;
  let mid;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (array[mid] >= number) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

solution(N, M, numbers);
