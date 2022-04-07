const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const T = Number(input[0]);
let rest = input.slice(1).map((line) => line.split(' ').map(Number));
const TEST_CASES = [];

for (let i = 0; i < T; i++) {
  const [N, M] = rest[0];
  const testCase = rest.slice(0, M + 1);
  TEST_CASES.push(testCase);
  rest = rest.slice(M + 1);
}

function solution(TEST_CASES) {
  const result = TEST_CASES.map(countMInFlight);
  console.log(result.join('\n'));
}

function countMInFlight(testCase) {
  const [N, M] = testCase[0];

  return N - 1;
}

solution(TEST_CASES);
