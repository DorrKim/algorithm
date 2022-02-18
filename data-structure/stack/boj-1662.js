const input = require('fs').readFileSync('example.txt').toString().trim().split('');

function solution(input) {
  const stack = [];

  for (let i = input.length - 1; i >= 0; i--) {
    const char = input[i];

    if (char === ')' || char === '(') {
      stack.push(char);

      continue;
    }

    if (stack[stack.length - 1] === ')') {
      stack.push(1);
      continue;
    }

    if (stack[stack.length - 1] === '(') {
      stack.pop();

      let length = 0;

      while (stack[stack.length - 1] !== ')') {
        length += stack.pop();
      }

      stack.pop();

      stack.push(length * char);
      continue;
    }

    if (stack.length === 0) {
      stack.push(1);
      continue;
    }

    if (!isNaN(stack[stack.length - 1])) {
      stack.push(stack.pop() + 1);
    }
  }

  console.log(stack.reduce((a, b) => a + b));
}

solution(input);
