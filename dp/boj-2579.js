const [countStair, ...scores] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

function solution(countStair, scores) {
  const cache = new Array(countStair).fill(null);
  cache[0] = [scores[0], 0];
  cache[1] = [scores[0] + scores[1], scores[1]];

  for (let i = 2; i < countStair; i++) {
    cache[i] = [cache[i - 1][1] + scores[i], Math.max(...cache[i - 2]) + scores[i]];
  }

  console.log(Math.max(...cache[countStair - 1]));
}
solution(countStair, scores);
