const expression = require('fs').readFileSync('example.txt').toString().trim();

function solution(expression) {
  const result = expression
    .split('-')
    .map(evaluate)
    .reduce((a, b) => a - b);

  console.log(result);
}

function evaluate(expression) {
  return expression.split('+').reduce((a, b) => +a + +b, 0);
}

solution(expression);
