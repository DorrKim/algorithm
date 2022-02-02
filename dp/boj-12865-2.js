const [[countStuff, weightLimit], ...stuffInfos] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));

function solution(countStuff, weightLimit, stuffInfos) {
  if (countStuff === 0) {
    console.log(0);
    return;
  }
  const cache = new Array(2).fill(null).map(() => new Array(weightLimit + 1).fill(0));

  for (let i = 1; i <= countStuff; i++) {
    const [W, V] = stuffInfos[i - 1];
    for (let j = 1; j < W; j++) {
      cache[i % 2][j] = cache[(i - 1) % 2][j];
    }
    for (let j = W; j <= weightLimit; j++) {
      cache[i % 2][j] = Math.max(cache[(i - 1) % 2][j], cache[(i - 1) % 2][j - W] + V);
    }
  }

  console.log(cache[countStuff % 2][weightLimit]);
}

solution(countStuff, weightLimit, stuffInfos);
