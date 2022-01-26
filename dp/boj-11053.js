const [[length], array] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));

function solution(length, array) {
  const dp = new Array(length).fill(1);
  let max = 1;

  for (let j = 1; j < length; j++) {
    for (let i = j - 1; i >= 0; i--) {
      if (array[j] <= array[i]) continue;
      dp[j] = Math.max(dp[j], dp[i] + 1);
      max = Math.max(max, dp[j]);
    }
  }

  console.log(max);
}

solution(length, array);
