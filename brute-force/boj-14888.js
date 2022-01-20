const [[countNumbers], numbers, operatorCounts] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

const operateFunc = {
  0: (a, b) => a + b,
  1: (a, b) => a - b,
  2: (a, b) => a * b,
  3: (a, b) => {
    const positiveQuotient = Math.floor(Math.abs(a) / b);

    return a >= 0 ? positiveQuotient : -positiveQuotient;
  }
};

function solution(countNumbers, numbers, operatorCounts) {
  const calculatedResults = [];
  const numbersCopy = [...numbers];
  const operatorCountsCopy = [...operatorCounts];

  function recursion(currIndex, partialResult) {
    if (currIndex === numbers.length) {
      calculatedResults.push(partialResult);
      return;
    }

    const currNumber = numbersCopy[currIndex];

    Object.values(operateFunc).forEach((func, index) => {
      if (operatorCountsCopy[index] === 0) return;

      const nextPartialResult = func(partialResult, currNumber);
      operatorCountsCopy[index] -= 1;
      recursion(currIndex + 1, nextPartialResult);
      operatorCountsCopy[index] += 1;
    });
  }
  recursion(1, numbersCopy[0]);

  const [min, max] = calculatedResults.reduce(
    ([prevMin, prevMax], currValue) => [Math.min(prevMin, currValue), Math.max(prevMax, currValue)],
    [Infinity, -Infinity]
  );
  console.log(max ? max : 0);
  console.log(min ? min : 0);
}

solution(countNumbers, numbers, operatorCounts);
