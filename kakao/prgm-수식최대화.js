function solution(expression) {
  const operatorPriorityList = permutation(['+', '-', '*'], 3);
  const expressionTokens = expression.match(/\d+|\D/g);
  let max = 0;

  operatorPriorityList.forEach((operatorPriority) => {
    const calculated = calculate(expressionTokens, operatorPriority);
    max = Math.max(max, calculated);
  });

  return max;
}

function calculate(expressionTokens, operatorPriority) {
  const postFix = convertPostFix(expressionTokens, operatorPriority);

  const numbers = [];

  postFix.forEach((token) => {
    if (!isNaN(token)) {
      numbers.push(Number(token));
      return;
    }

    const operator = token;
    const rightOperand = numbers.pop();
    const leftOperand = numbers.pop();

    let calulated = null;
    if (operator === '+') {
      calulated = leftOperand + rightOperand;
    } else if (operator === '-') {
      calulated = leftOperand - rightOperand;
    } else if (operator === '*') {
      calulated = leftOperand * rightOperand;
    }
    numbers.push(calulated);
  });

  const result = Math.abs(numbers.pop());
  return result;
}

function convertPostFix(expressionTokens, operatorPriority) {
  const result = [];
  const operators = [];

  for (let i = 0; i < expressionTokens.length; i++) {
    const char = expressionTokens[i];

    if (!isNaN(char)) {
      result.push(char);
      continue;
    }

    while (operators.length) {
      const top = operators[operators.length - 1];
      const isTopPrior =
        operatorPriority.findIndex((operator) => operator === top) <=
        operatorPriority.findIndex((operator) => operator === char);
      if (!isTopPrior) break;
      const popped = operators.pop();
      result.push(popped);
    }

    operators.push(char);
  }

  while (operators.length) {
    result.push(operators.pop());
  }

  return result;
}

function permutation(arr, n) {
  if (arr.length === 1) return arr.map((el) => [el]);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const picked = arr[i];
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];

    permutation(rest, n - 1).forEach((subPermutation) => {
      result.push([picked, ...subPermutation]);
    });
  }
  return result;
}
