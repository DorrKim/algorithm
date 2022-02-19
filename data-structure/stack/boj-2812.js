const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const number = input[1].split('').map(Number);

function solution(N, K, number) {
  const stack = [number[0]];
  let count = 0;
  let sliceIndex = N;

  for (let i = 1; i < N; i++) {
    const currDigit = number[i];
    if (stack[stack.length - 1] >= currDigit) {
      stack.push(currDigit);
      continue;
    }

    while (stack[stack.length - 1] < currDigit && count < K) {
      stack.pop();
      count++;
    }

    if (count > K) {
      sliceIndex = i + 1;
      break;
    }

    stack.push(currDigit);
  }

  const leftCount = K - count;

  for (let i = 0; i < leftCount; i++) {
    stack.pop();
  }

  console.log(stack.join('') + number.slice(sliceIndex).join(''));
}

solution(N, K, number);
