const [N, M] = require('fs').readFileSync('example.txt').toString().trim().split(' ').map(Number);

function solution(N, M) {
  const m = Math.min(M, N - M);
  const dp = Array.from({ length: 2 }, (_, i) =>
    Array.from({ length: m + 1 }, (__, j) => (j === 0 || j === i ? 1n : 0n))
  );

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[(i - 1) % 2][j - 1];
    }
  }

  console.log(dp[N % 2][m].toString());
}

solution(N, M);
