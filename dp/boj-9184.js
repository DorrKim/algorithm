const testCases = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));

function solution(testCases) {
  const dp = Array(21)
    .fill()
    .map((v) =>
      Array(21)
        .fill()
        .map((v) => Array(21).fill(null))
    );

  testCases.forEach(([a, b, c]) => {
    if (a === -1 && b === -1 && c === -1) return;

    console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
  });

  function w(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) return 1;

    if (a > 20 || b > 20 || c > 20) {
      return w(20, 20, 20);
    }
    if (dp[a - 1][b - 1][c - 1] !== null) return dp[a - 1][b - 1][c - 1];

    if (a < b && b < c) {
      const result = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
      dp[a - 1][b - 1][c - 1] = result;
      return result;
    }
    const result = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1);
    dp[a - 1][b - 1][c - 1] = result;
    return result;
  }
}

solution(testCases);
