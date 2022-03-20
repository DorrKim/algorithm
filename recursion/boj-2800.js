const expression = require('fs').readFileSync('example.txt').toString().trim().split('');

function solution(expression) {
  console.log(recursion(expression));
}

function recursion(subExpression) {
  const result = [];
  let prefix = '';
  //  console.log(subExpression);

  for (let i = 0; i < subExpression.length; i++) {
    const char = subExpression[i];

    if (char === '(') {
      const nextSubExpression = subExpression.slice(i + 1);
      recursion(nextSubExpression).forEach(([el, index]) => {
        result.push(prefix + el);
        result.push(prefix + '(' + el + ')');
        i = index + 1;
      });
    } else if (char === ')') {
      result.push([prefix, i]);
      return result;
    } else {
      prefix += char;
    }
  }
}

solution(expression);
