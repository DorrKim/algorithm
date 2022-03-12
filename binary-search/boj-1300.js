const [N, K] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(N, K) {
  let lowerBound = 1;
  let upperBound = K + 1;

  while (lowerBound < upperBound - 1) {
    const mid = Math.floor((lowerBound + upperBound) / 2);
    let count = 0;

    for (let i = 1; i <= N; i++) {
      count += Math.min(Math.floor((mid - 1) / i), N);
    }

    if (count < K) {
      lowerBound = mid;
    } else {
      upperBound = mid;
    }
  }

  console.log(lowerBound);
}

for (let i = 1; i <= 25; i++) {
  solution(5, i);
}
solution(N, K);

// 1 2 2 3 3 4 4 4 5 5 6 6 8 8 9 10 10 12 12 15 15 16 20 20 25
// 1 2 2 3 3 4 6 6 9
