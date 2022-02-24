const input = require('fs').readFileSync('example.txt').toString().trim().split('');

function solution(input) {
  const stack = [];
  let postfix = '';

  input.forEach((char) => {
    if (isOperand(char)) {
      postfix += char;
      return;
    }

    if (stack.length === 0 && char !== ')') {
      stack.push(char);

      return;
    }

    if (char === '(') {
      stack.push(char);
      return;
    }

    if (char === ')') {
      while (stack.length) {
        const popped = stack.pop();
        if (popped === '(') break;

        postfix += popped;
      }
      return;
    }

    const top = stack[stack.length - 1];
    if (top === '(') {
      stack.push(char);
      return;
    }

    if (char === '*' || char === '/') {
      let localTop = top;
      while (localTop === '*' || localTop === '/') {
        postfix += stack.pop();
        localTop = stack[stack.length - 1];
      }
      stack.push(char);
      return;
    }

    if (char === '+' || char === '-') {
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top === '(') break;
        const popped = stack.pop();
        postfix += popped;
      }
      stack.push(char);
    }
  });

  while (stack.length) {
    const popped = stack.pop();
    if (popped === '(') continue;
    postfix += popped;
  }

  console.log(postfix);
}

function isOperand(char) {
  const code = char.charCodeAt(0);

  return 65 <= code && code <= 90;
}

solution(input);

// A+B*C*((D-E)*G)

// A+((B*C)*((D-E)*G))
// A+(BC* * (D-E)G*)
// ABC*DE-G**+
