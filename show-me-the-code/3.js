const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const S = input[1].split('');

function solution(N, S) {
  let countE = 0n;
  let countCombinationAfterH = 0n;
  let countWheeAfterW = 0n;

  for (let i = N - 1; i >= 0; i--) {
    const currChar = S[i];
    if (currChar === 'E') {
      countE++;
    } else if (currChar === 'H') {
      countCombinationAfterH += 2n ** countE - countE - 1n;
    } else if (currChar === 'W') {
      countWheeAfterW += countCombinationAfterH;
    }
  }
  const result = countWheeAfterW % BigInt(10 ** 9 + 7);
  console.log(result.toString());
}

solution(N, S);
