const [[length], array] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(length, array) {
  const cache = new Array(length).fill(null).map(() => new Array(2).fill(0));

  for (let i = 0; i < length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[i] <= array[j]) continue;
      cache[i][0] = Math.max(cache[i][0], cache[j][0] + 1);
    }
    for (let k = length - 1; k > length - 1 - i; k--) {
      if (array[length - 1 - i] <= array[k]) continue;
      cache[length - 1 - i][1] = Math.max(cache[length - 1 - i][1], cache[k][1] + 1);
    }
  }

  let max = 0;
  cache.forEach(([leftLength, rightLength]) => {
    max = Math.max(leftLength + rightLength + 1, max);
  });

  console.log(max);
}

solution(length, array);
