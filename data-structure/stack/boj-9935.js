const [string, bomb] = require('fs').readFileSync('example.txt').toString().trim().split('\n');

function solution(string, bomb) {
  const stack = [];

  for (let i = 0; i < string.length; i++) {
    stack.push(string[i]);
    if (stack.length < bomb.length) continue;
    let hasBomb = true;

    for (let j = 0; j < bomb.length; j++) {
      if (stack[stack.length - 1 - j] !== bomb[bomb.length - 1 - j]) {
        hasBomb = false;
        break;
      }
    }
    if (!hasBomb) continue;
    for (let k = 0; k < bomb.length; k++) {
      stack.pop();
    }
  }

  console.log(stack.length ? stack.join('') : 'FRULA');
}

solution(string, bomb);
