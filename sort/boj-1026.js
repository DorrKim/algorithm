const [[length], arrayA, arrayB] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const ascendingSorter = (a, b) => a - b;
const descendingSorter = (a, b) => b - a;

function solution(length, arrayA, arrayB) {
  const ascendingSortedArrayB = [...arrayB].sort(ascendingSorter);
  const descendingSortedArrayA = [...arrayA].sort(descendingSorter);
  const min = descendingSortedArrayA.reduce((a, b, index) => a + b * ascendingSortedArrayB[index], 0);
  console.log(min);
}
solution(length, arrayA, arrayB);
