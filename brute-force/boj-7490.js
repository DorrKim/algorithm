const [countTestCase, ...endDigits] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

function solution(countTestCase, endDigits) {
  endDigits.forEach((endDigit) => {
    const expressions = [];

    function recursion(number, expression) {
      if (number === endDigit) {
        if (evaluate(expression) === 0) {
          expressions.push(expression);
        }
        return;
      }
      recursion(number + 1, `${expression}+${number + 1}`);
      recursion(number + 1, `${expression} ${number + 1}`);
      recursion(number + 1, `${expression}-${number + 1}`);
    }
    recursion(1, '1');
    console.log(expressions.sort().join('\n'));
    console.log('');
  });
}

solution(countTestCase, endDigits);

function evaluate(expression) {
  const tokens = expression.match(/[+-]{0,1}(\d(?=\S)|(\d )+\d|\d$)/g);
  const noneWhitespaceTokens = tokens.map((token) => {
    return token.replace(/\s/, '');
  });
  const numbers = noneWhitespaceTokens.map(Number);

  return numbers.reduce((acc, num) => acc + num, 0);
}
