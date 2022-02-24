const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const ARRAY = input[1].split(' ').map(Number);

function solution(N, ARRAY) {
  const stack = [ARRAY[N - 1]];
  let result = '-1';

  for (let i = N - 2; i >= 0; i--) {
    while (stack.length !== 0 && stack[stack.length - 1] <= ARRAY[i]) {
      stack.pop();
    }
    const rightBigNumber = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(ARRAY[i]);
    result = `${rightBigNumber} ${result}`;
  }

  console.log(result);
}

solution(N, ARRAY);
