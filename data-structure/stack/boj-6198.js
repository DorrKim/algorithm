const [N, ...Hs] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n').map(Number);

function solution(N, Hs) {
  const stack = [];
  let result = 0;

  stack.push(N - 1);
  for (let i = N - 2; i >= 0; i--) {
    const currentHeight = Hs[i];
    let top = stack[stack.length - 1];

    if (currentHeight <= Hs[top]) {
      stack.push(i);
      continue;
    }

    while (stack.length > 0 && currentHeight > Hs[top]) {
      stack.pop();
      top = stack[stack.length - 1];
    }

    result += (stack.length > 0 ? top : N) - i - 1;
    stack.push(i);
  }
  console.log(result);
}

solution(N, Hs);
