const [T, ...rest] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const countTestCases = +T;
const testCases = [];

for (let i = 0; i < countTestCases; i++) {
  const [strCountDay, strStockCosts] = rest.slice(2 * i, 2 * (i + 1));

  const testCase = {
    countDay: +strCountDay,
    stockCosts: strStockCosts.split(' ').map(Number)
  };

  testCases.push(testCase);
}

function solution(countTestCases, testCases) {
  const maxEarnings = testCases.map((testCase) => getMaxEarning(testCase));

  console.log(maxEarnings.join('\n').trim());
}

function getMaxEarning({ countDay, stockCosts }) {
  let maxCost = 0;
  let earning = 0;

  for (let index = countDay - 1; index >= 0; index--) {
    const currCost = stockCosts[index];
    if (currCost > maxCost) maxCost = currCost;

    earning += maxCost - currCost;
  }
  console.log(earning);
}

solution(countTestCases, testCases);
