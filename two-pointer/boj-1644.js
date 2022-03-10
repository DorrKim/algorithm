const N = +require('fs').readFileSync('example.txt').toString().trim();

function solution(N) {
  const primes = getLowerPrimes(N);
  let s = 0;
  let e = 0;
  let count = 0;
  let partialPrimeSum = 0;

  while (s < primes.length) {
    if (partialPrimeSum === N) count++;

    if (partialPrimeSum > N || e >= primes.length) {
      partialPrimeSum -= primes[s++];
    } else {
      partialPrimeSum += primes[e++];
    }
  }
  console.log(count);
}

function getLowerPrimes(N) {
  const primes = [];
  const isPrime = new Array(N + 1).fill(null).map((_, i) => Boolean(i % 2));
  isPrime[2] = true;
  if (N >= 2) {
    primes.push(2);
  }

  for (let i = 3; i <= N; i += 2) {
    if (!isPrime[i]) continue;
    primes.push(i);

    for (let j = i * i; j <= N; j += i * 2) {
      isPrime[j] = false;
    }
  }

  return primes;
}

solution(N);
