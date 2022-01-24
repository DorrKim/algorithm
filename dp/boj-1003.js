const [countTestCases, ...testCases] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

function solution(countTestCases, testCases) {
  const maxTestCase = Math.max(...testCases);
  const dp = new Array(maxTestCase).fill(null);

  dp[0] = [1, 0];
  dp[1] = [0, 1];

  for (let i = 2; i <= maxTestCase; i++) {
    const [countZero1, countOne1] = dp[i - 1];
    const [countZero2, countOne2] = dp[i - 2];

    dp[i] = [countZero1 + countZero2, countOne1 + countOne2];
  }

  testCases.forEach((testCase) => {
    console.log(...dp[testCase]);
  });
}

solution(countTestCases, testCases);
