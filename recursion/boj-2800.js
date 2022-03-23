const expression = require('fs').readFileSync('dev/stdin').toString().trim().split('');

function solution(expression) {
  const bracketPositions = [];
  const stack = [];
  const result = new Set();

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === ')') {
      while (expression[stack[stack.length - 1]] !== '(') {
        stack.pop();
      }
      const openIndex = stack.pop();
      const closeIndex = i;
      bracketPositions.push([openIndex, closeIndex]);
    }
    stack.push(i);
  }

  for (let i = 1; i <= bracketPositions.length; i++) {
    getCombination(bracketPositions, i).forEach((removePositions) => {
      const bracketRemovedExpression = expression
        .filter((_, index) => !removePositions.flat().includes(index))
        .join('')
        .trim();
      result.add(bracketRemovedExpression);
    });
  }

  const sorted = [...result].sort();
  console.log(sorted.join('\n'));
}

function getCombination(array, number) {
  if (number === 1) return array.map((el) => [el]);
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const fixed = array[i];
    const rest = array.slice(i + 1);

    getCombination(rest, number - 1).forEach((comb) => {
      result.push([fixed, ...comb]);
    });
  }
  return result;
}

solution(expression);
