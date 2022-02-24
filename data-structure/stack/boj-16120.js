const input = require('fs').readFileSync('example.txt').toString().trim().split('');

function solution(input) {
  if (input.length === 1 && input[0] === 'P') {
    console.log('PPAP');
    return;
  }

  if (input.length <= 3) {
    console.log('NP');
    return;
  }

  const stack = [input[0], input[1], input[2]];

  for (let i = 3; i < input.length; i++) {
    const char = input[i];

    if (char === 'A') {
      stack.push(char);
      continue;
    }

    if (stack[stack.length - 1] === 'A' && stack[stack.length - 2] === 'P' && stack[stack.length - 3] === 'P') {
      stack.pop();
      stack.pop();
      continue;
    }
    stack.push(char);
  }

  if (stack.length === 1 && stack[stack.length - 1] === 'P') {
    console.log('PPAP');
  } else {
    console.log('NP');
  }
}

solution(input);
