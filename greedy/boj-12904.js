const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [start, end] = input;

function solution(start, end) {
  let currWord = end;

  while (currWord.length !== start.length) {
    if (currWord.endsWith('A')) {
      currWord = currWord.slice(0, -1);
      continue;
    }
    currWord = currWord.slice(0, -1).split('').reverse().join('');
  }

  console.log(currWord === start ? 1 : 0);
}

solution(start, end);
