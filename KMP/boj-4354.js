const TEST_CASES = require('fs').readFileSync('example.txt').toString().trim().split('\n').slice(0, -1);

function solution(TEST_CASES) {
  const result = TEST_CASES.map(getMaxPower);

  console.log(result.join('\n'));
}

function getMaxPower(string) {
  const pi = failureFn(string);

  const power = string.length / (string.length - pi[string.length - 1]);

  return power === Math.floor(power) ? power : 1;
}

function failureFn(string) {
  const length = string.length;
  const pi = new Array(length).fill(0);

  let j = 0;
  for (let i = 1; i < length; i++) {
    while (j > 0 && string[i] !== string[j]) {
      j = pi[j - 1];
    }

    if (string[j] === string[i]) {
      pi[i] = ++j;
    }
  }

  return pi;
}

solution(TEST_CASES);
