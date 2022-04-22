const [N, K] = require('fs').readFileSync('example.txt').toString().trim().split(' ').map(Number);

function solution(N, K) {
  const josephus = [];
  let stack = new Array(N).fill(null).map((_, i) => i + 1);
  let pointer = 0;

  while (stack.length) {
    pointer += K - 1;
    pointer = pointer % stack.length;
    josephus.push(stack[pointer]);
    stack = [...stack.slice(0, pointer), ...stack.slice(pointer + 1)];
  }

  console.log('<' + josephus.join(', ') + '>');
}

solution(N, K);
