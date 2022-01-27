const [_, ...testCases] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(testCase) {
  const cache = new Array(3);
  cache[0] = 1;
  cache[1] = 1;
  cache[2] = 1;

  for (let i = 3; i < testCase; i++) {
    cache[i % 3] = cache[(i - 2) % 3] + cache[(i - 3) % 3];
  }
  console.log(cache[(testCase - 1) % 3]);
}

testCases.forEach((testCase) => {
  solution(testCase);
});
