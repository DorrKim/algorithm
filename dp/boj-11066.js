const [[countTestCase], ...unSlicedTestCases] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(countTestCase, unSlicedTestCases) {
  let result = '';

  for (let i = 0; i < unSlicedTestCases.length; i += 2) {
    const slicedTestCase = unSlicedTestCases.slice(i, i + 2);
    result += `${getMinCost(slicedTestCase)}\n`;
  }

  console.log(result.trim());
}

function getMinCost(testCase) {
  const [[countFiles], fileCosts] = testCase;
  const cache = Array.from({ length: countFiles }, () => new Array(countFiles).fill(0));
  const accSumCache = Array.from({ length: countFiles }, () => new Array(countFiles).fill(0));

  const minCost = recursion(0, countFiles - 1);
  return minCost;

  function getAccSum(start, end) {
    if (accSumCache[start][end]) return accSumCache[start][end];

    let localSum = 0;
    for (let i = start; i <= end; i++) {
      localSum += fileCosts[i];
    }

    return (cache[start][end] = localSum);
  }

  function recursion(start, end) {
    if (cache[start][end]) {
      return cache[start][end];
    }
    if (start === end) {
      return (cache[start][end] = 0);
    }

    if (start === end - 1) {
      return (cache[start][end] = getAccSum(start, end));
    }

    if (start === end - 2) {
      const headtSum = getAccSum(start, start + 1);
      const tailSum = getAccSum(start + 1, end);

      return (cache[start][end] = Math.min(headtSum, tailSum) + getAccSum(start, end));
    }

    let min = Infinity;

    for (let i = 0; i < end - start; i++) {
      const localMin = recursion(start, start + i) + recursion(start + i + 1, end);
      min = Math.min(localMin, min);
    }

    return (cache[start][end] = min + getAccSum(start, end));
  }
}

solution(countTestCase, unSlicedTestCases);
