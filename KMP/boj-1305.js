const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const L = +input[0];
const string = input[1];

function solution(L, string) {
  const pi = failureFn(string);

  console.log(pi.length - pi.pop());
}

function failureFn(string) {
  const length = string.length;
  const pi = new Array(length).fill(0);

  let j = 0;
  for (let i = 1; i < length; i++) {
    while (j > 0 && string[i] !== string[j]) {
      j = pi[j - 1];
    }

    if (string[i] === string[j]) {
      pi[i] = ++j;
    }
  }

  return pi;
}

solution(L, string);
