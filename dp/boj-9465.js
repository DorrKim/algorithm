const [strCountTestCases, ...strTestCases] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const countTestCases = parseInt(strCountTestCases);

function solution(countTestCases, strTestCases) {
  const testCases = [];

  for (let i = 0; i < strTestCases.length; i += 3) {
    const testCase = strTestCases.slice(i, i + 3);
    testCases.push(testCase);
  }
  testCases.forEach((testCase) => {
    getMaxValueBycase(testCase);
  });
}

solution(countTestCases, strTestCases);

function getMaxValueBycase(testCase) {
  const [[width], firstRow, secondRow] = testCase.map(toNumberMapper);
  const cache = [
    [firstRow[0], secondRow[0], 0],
    [0, 0, 0]
  ];

  firstRow.forEach((stickerScore, index) => {
    if (index === 0) return;
    const relativePrevIndex = index % 2;
    const relativeCurrIndex = (index + 1) % 2;
    cache[relativePrevIndex][0] = Math.max(cache[relativeCurrIndex][1], cache[relativeCurrIndex][2]) + stickerScore;
    cache[relativePrevIndex][1] = Math.max(cache[relativeCurrIndex][0], cache[relativeCurrIndex][2]) + secondRow[index];
    cache[relativePrevIndex][2] = Math.max(...cache[relativeCurrIndex]);
  });
  console.log(Math.max(...cache[(width + 1) % 2]));
}

function toNumberMapper(el) {
  return el.split(' ').map(Number);
}
