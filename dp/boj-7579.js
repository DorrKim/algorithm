const [[countApps, memoryLimit], memories, costs] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

function solution(countApps, memoryLimit, memories, costs) {
  const totalCost = costs.reduce((a, b) => a + b, 0);
  const cache = Array.from({ length: 2 }, () => new Array(totalCost + 1).fill(0));

  for (let i = 1; i <= countApps; i++) {
    for (let j = 1; j < costs[i - 1]; j++) {
      cache[i % 2][j] = cache[(i - 1) % 2][j];
    }
    for (let j = costs[i - 1]; j <= totalCost; j++) {
      cache[i % 2][j] = Math.max(cache[(i - 1) % 2][j], cache[(i - 1) % 2][j - costs[i - 1]] + memories[i - 1]);
    }
  }
  const result = cache[countApps % 2].findIndex((memory) => memory >= memoryLimit);
  console.log(result);
}

solution(countApps, memoryLimit, memories, costs);
