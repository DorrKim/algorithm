const [[length], withdrawTimes] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(/\n/)
  .map((el) => el.trim().split(' ').map(Number));

function solution(length, withdrawTimes) {
  const copy = [...withdrawTimes];

  copy.sort((a, b) => a - b);
  const result = copy.reduce((acc, number, index) => acc + number * (length - index), 0);
  console.log(result);
}

solution(length, withdrawTimes);
