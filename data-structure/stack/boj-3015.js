const [N, ...heights] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(N, heights) {
  const stack = [[N - 1, 1]];
  let count = 0;

  for (let i = N - 2; i >= 0; i--) {
    if (stack.length && heights[stack[stack.length - 1][0]] > heights[i]) {
      count++;
      stack.push([i, 1]);
      continue;
    }

    while (stack.length && heights[stack[stack.length - 1][0]] < heights[i]) {
      const [_, continuous] = stack.pop();

      count += continuous;
    }

    if (stack.length && heights[stack[stack.length - 1][0]] === heights[i]) {
      const [_, continuous] = stack[stack.length - 1];

      stack.pop();
      stack.push([i, continuous + 1]);
      count += continuous;

      stack.length > 1 && count++;
      continue;
    }

    stack.length && count++;
    stack.push([i, 1]);
  }
  console.log(count);
}
solution(N, heights);
