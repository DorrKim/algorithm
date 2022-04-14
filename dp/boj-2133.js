const N = +require('fs').readFileSync('example.txt').toString().trim().split('\n');

function solution(N) {
  if (N % 2) {
    console.log(0);
    return;
  }

  const cache = new Array(N / 2 + 1).fill(0);
  cache[0] = 1;

  for (let i = 1; i <= N / 2; i++) {
    cache[i] = cache[i] + cache[i - 1] * 3;

    for (let j = i - 2; j >= 0; j--) {
      cache[i] = cache[i] + cache[j] * 2;
    }
  }

  console.log(cache[N / 2]);
}

solution(N);
