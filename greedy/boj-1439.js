const number = require('fs').readFileSync('dev.stdin').toString().trim();

function solution(number) {
  const countZeroChunks = number.match(/0+/g)?.length ?? 0;
  const countOneChunks = number.match(/1+/g)?.length ?? 0;

  console.log(Math.min(countZeroChunks, countOneChunks));
}

solution(number);
