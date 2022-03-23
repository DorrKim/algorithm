const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const costs = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, costs) {
  const min = Math.min(getCostCacheByFirstColor(0), getCostCacheByFirstColor(1), getCostCacheByFirstColor(2));
  console.log(min);

  function getCostCacheByFirstColor(index) {
    const cache = new Array(N).fill(null).map(() => new Array(3).fill(null));
    cache[0] = new Array(3).fill(Infinity);
    cache[0][index] = costs[0][index];

    cache[N - 1][index] = Infinity;

    for (let i = 1; i < N - 1; i++) {
      cache[i][0] = Math.min(cache[i - 1][1], cache[i - 1][2]) + costs[i][0];
      cache[i][1] = Math.min(cache[i - 1][0], cache[i - 1][2]) + costs[i][1];
      cache[i][2] = Math.min(cache[i - 1][0], cache[i - 1][1]) + costs[i][2];
      if (i === 1) cache[i][index] = Infinity;
    }

    cache[N - 1][0] = index === 0 ? Infinity : Math.min(cache[N - 2][1], cache[N - 2][2]) + costs[N - 1][0];
    cache[N - 1][1] = index === 1 ? Infinity : Math.min(cache[N - 2][0], cache[N - 2][2]) + costs[N - 1][1];
    cache[N - 1][2] = index === 2 ? Infinity : Math.min(cache[N - 2][0], cache[N - 2][1]) + costs[N - 1][2];

    return Math.min(...cache[N - 1]);
  }
}

solution(N, costs);
