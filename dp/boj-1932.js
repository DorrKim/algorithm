const [[height], ...triangle] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(height, triangle) {
  const cache = new Array(2).fill(null);
  cache[0] = triangle[0];

  for (let i = 1; i < height; i++) {
    let newCache = [cache[(i - 1) % 2][0] + triangle[i][0]];
    for (let j = 1; j < i; j++) {
      const accValue = Math.max(cache[(i - 1) % 2][j - 1], cache[(i - 1) % 2][j]);
      newCache.push(accValue + triangle[i][j]);
    }
    newCache.push(cache[(i - 1) % 2][i - 1] + triangle[i][i]);
    cache[i % 2] = newCache;
  }

  console.log(Math.max(...cache[(height - 1) % 2]));
}

solution(height, triangle);
