const [N, ...arr] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(N, arr) {
  const stack = [];
  let currNumber = 1;
  let result = '';

  for (let i = 0; i < N; i++) {
    const targetNumber = arr[i];
    if (stack.length === 0 || stack[stack.length - 1] < targetNumber) {
      for (let i = currNumber; i <= targetNumber; i++) {
        stack.push(i);
        result += '+\n';
      }
      stack.pop();
      result += '-\n';
      currNumber = targetNumber + 1;
      continue;
    }

    if (stack[stack.length - 1] === targetNumber) {
      stack.pop();
      result += '-\n';
      continue;
    }

    result = 'NO';
    break;
  }
  console.log(result.trim());
}

solution(N, arr);
