const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const testCases = [];

for (let i = 0; i < N; i++) {
  const testCase = input.slice(1 + i * 3, 1 + (i + 1) * 3);
  testCases.push(testCase);
}

function solution(testCases) {
  const result = testCases.map((testCase) => getResult(testCase));
  console.log(result.join('\n').trim());
}

function getResult([commands, length, initialArray]) {
  let isLtr = true;

  const queue = initialArray.length > 2 ? initialArray.slice(1, -1).split(',') : [];

  let leftIndex = 0;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    if (command === 'R') {
      isLtr = !isLtr;
      continue;
    }

    if (command === 'D') {
      if (queue.length === 0 || leftIndex >= queue.length) {
        return 'error';
      }
      if (isLtr) {
        leftIndex++;
      } else {
        queue.pop();
      }
      continue;
    }
  }
  const result = isLtr ? `[${queue.slice(leftIndex).join(',')}]` : `[${queue.slice(leftIndex).reverse().join(',')}]`;
  return result;
}

solution(testCases);
