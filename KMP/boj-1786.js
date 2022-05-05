const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = input[0];
const P = input[1];

function solution(T, P) {
  const maxlengthOverlapped = getLengthMaxOverlapped(P);
  let count = 0;
  const answer = [];

  let j = 0;
  for (let i = 0; i < T.length; i++) {
    while (j > 0 && T[i] !== P[j]) {
      j = maxlengthOverlapped[j - 1];
    }

    if (T[i] === P[j]) {
      if (j === P.length - 1) {
        count++;
        answer.push(i - j + 1);
        j = maxlengthOverlapped[j];
      } else {
        j++;
      }
    }
  }

  console.log(count);
  console.log(answer.join(' '));
}

function getLengthMaxOverlapped(pattern) {
  const patternLength = pattern.length;
  const cache = new Array(patternLength).fill(0);
  let j = 0;

  for (let i = 1; i < patternLength; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = cache[j - 1];
    }

    if (pattern[i] === pattern[j]) {
      cache[i] = ++j;
    }
  }

  return cache;
}

solution(T, P);
