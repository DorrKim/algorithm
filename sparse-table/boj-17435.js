const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const M = +input[0];
const fns = input[1].split(' ').map(Number);
const Q = +input[2];
const querys = input.slice(3, 3 + Q).map((query) => query.split(' ').map(Number));
const MAX = 5 * 10 ** 5 + 1;
const MAX_D = Math.ceil(Math.log2(MAX));

function solution(M, fns, Q, querys) {
  const next = new Array(M + 1).fill(null).map(() => new Array(MAX_D).fill(0));

  fns.forEach((fn, i) => {
    next[i + 1][0] = fn;
  });

  for (let j = 1; j <= MAX_D; j++) {
    for (let i = 1; i <= M; i++) {
      next[i][j] = next[next[i][j - 1]][j - 1];
    }
  }

  const result = querys.map(([n, x]) => {
    let underParam = n;
    let currentParam = x;

    for (let i = 0; i <= MAX_D; i++) {
      if (underParam >= 1 << (MAX_D - i)) {
        underParam -= 1 << (MAX_D - i);
        currentParam = next[currentParam][MAX_D - i];
      }
    }

    return currentParam;
  });

  console.log(result.join('\n'));
}

solution(M, fns, Q, querys);
