const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const tops = input[1].split(' ').map(Number);

function solution(N, tops) {
  const stack = [];
  let result = '';

  for (let i = 1; i <= N; i++) {
    while (stack.length) {
      const index = stack[stack.length - 1];
      if (tops[index - 1] > tops[i - 1]) break;

      stack.pop();
    }
    stack.push(i);

    result += stack.length >= 2 ? `${stack[stack.length - 2]} ` : '0 ';
  }

  console.log(result.trim());
}

solution(N, tops);
