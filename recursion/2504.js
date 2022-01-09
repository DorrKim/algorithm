const brackets = require('fs').readFileSync('/dev/stdin').toString().trim();
const openBrackets = {
  ')': '(',
  ']': '['
};

function solution(brackets) {
  /**
   * 1. 종료조건
   * 2. 완벽한 괄호 확인 / 분할
   * 3. 계산
   */
  let result = 0;
  const bracketArray = brackets.split('');

  function recrusion(brackets) {
    const stack = [];
    const completeBracketsArray = [];
    let completeBracket = '';

    brackets.forEach((bracket) => {
      stack.push(bracket);
      completeBracket += bracket;

      if (stack.length <= 1) return;
      const bracketPair = stack.slice(-2).join('');

      if (bracketPair === '()' || bracketPair === '[]') {
        stack.pop();
        stack.pop();
      }

      if (stack.length === 0) {
        completeBracketsArray.push(completeBracket);
        completeBracket = '';
      }
    });

    if (stack.length) {
      result = 0;
      return;
    }

    const calculateNumbers = completeBracketsArray.map((completeBrackets) => {
      if (completeBrackets === '()') return 2;
      if (completeBrackets === '[]') return 3;
      const innerCalcRes = recrusion(completeBrackets.slice(1, -1).split(''));

      return completeBrackets.startsWith('(') ? innerCalcRes * 2 : innerCalcRes * 3;
    });

    const sum = calculateNumbers.reduce((acc, item) => acc + item, 0);
    result = sum;
    return result;
  }

  recrusion(bracketArray);
  console.log(result);
}

solution(brackets);
