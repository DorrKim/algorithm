const [countWines, ...wines] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => +line);

function solution(countWines, wines) {
  const cache = new Array(countWines).fill(null);

  if (countWines === 1) {
    console.log(wines[0]);
    return;
  }
  let max = Math.max(wines[0], wines[1], wines[0] + wines[1]);
  cache[0] = [wines[0], wines[0], 0];
  cache[1] = [wines[0] + wines[1], wines[1], wines[0]];

  for (let i = 2; i < countWines; i++) {
    const drinkPrev = cache[i - 1][1] + wines[i];
    const noDrinkPrev = Math.max(...cache[i - 2]) + wines[i];
    const noDrinkCurr = Math.max(...cache[i - 1]);
    cache[i] = [drinkPrev, noDrinkPrev, noDrinkCurr];

    max = Math.max(max, drinkPrev, noDrinkPrev, noDrinkCurr);
  }

  console.log(max);
}

solution(countWines, wines);
