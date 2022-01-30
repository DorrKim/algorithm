const [[countWires], ...wires] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const sorter = (a, b) => a[0] - b[0];

function solution(countWires, wires) {
  wires.sort(sorter);
  const cache = new Array(countWires);
  cache[0] = 1;
  let maxLength = 0;

  for (let i = 1; i < countWires; i++) {
    let localMax = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (wires[i][1] <= wires[j][1]) continue;
      localMax = Math.max(cache[j] + 1, localMax);
    }
    cache[i] = localMax;
    maxLength = Math.max(localMax, maxLength);
  }
  console.log(countWires - maxLength);
}

solution(countWires, wires);
