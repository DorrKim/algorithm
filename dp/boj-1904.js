const n = Number(require('fs').readFileSync('example.txt').toString().trim());

function solution(n) {
  const cache = new Array(2);
  cache[0] = 1;
  cache[1] = 2;

  for (let i = 2; i < n; i++) {
    cache[i % 2] = (cache[(i - 1) % 2] + cache[(i - 2) % 2]) % 15746;
  }
  console.log(cache[(n - 1) % 2]);
}
solution(n);
