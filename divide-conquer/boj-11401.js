const [N, K] = require('fs').readFileSync('dev/stdin').toString().trim().split(' ').map(Number);
const PRIME = 1000000007n;

function solution(N, K) {
  const factorial = new Array(N + 1).fill(1n);
  const inverse = new Array(N + 1).fill(1n);

  for (let i = 2; i <= N; i++) {
    factorial[i] = (factorial[i - 1] * BigInt(i)) % PRIME;
  }

  inverse[N] = power(factorial[N] % PRIME, PRIME - 2n);

  for (let i = N - 1; i >= 1; i--) {
    inverse[i] = (inverse[i + 1] * BigInt(i + 1)) % PRIME;
  }

  const result = (factorial[N] * inverse[N - K] * inverse[K]) % PRIME;

  console.log(result.toString());
}

solution(N, K);

function power(base, exp) {
  if (exp === 1n) return base % PRIME;

  const isOdd = exp % 2n === 1n;

  const halfPower = isOdd ? (exp - 1n) / 2n : exp / 2n;

  const sqrt = power(base, halfPower);
  return (sqrt ** 2n * (isOdd ? base : 1n)) % PRIME;
}
