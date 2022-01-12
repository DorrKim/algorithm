const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const brackets = input.split('');
const expressionToken = {
  '(': '+ 2 * (',
  ')': ')',
  '[': '+ 3 * (',
  ']': ') '
};

function solution(brackets) {
  if (!checkComplete(brackets)) {
    console.log(0);
    return;
  }
  const parsedExpression = brackets.map((bracket) => expressionToken[bracket]).join('');

  const validExpression = removeInvalidToken(parsedExpression);
  const result = eval(validExpression);
  console.log(result);
}

solution(brackets);

function checkComplete(brackets) {
  let buffer = '';

  brackets.forEach((bracket, index) => {
    buffer += bracket;

    if (index < 1) return;

    if (buffer.endsWith('()') || buffer.endsWith('[]')) {
      buffer = buffer.slice(0, -2);
    }
  });

  return !buffer.length;
}

function removeInvalidToken(expression) {
  return expression.replace(/(\(\)|\[\])/g, '1');
}
