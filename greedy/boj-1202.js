const [NK, ...rest] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [countJewel, countBag] = NK.split(' ').map(Number);
const jewels = rest.slice(0, countJewel).map((jewelInfo) => jewelInfo.split(' ').map(Number));
const limitWeights = rest.slice(countJewel).map(Number);

function solution(jewels, limitWeights) {
  const ascendingSortedLimits = limitWeights.sort((a, b) => a - b);
  const sortedJewels = jewels.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let maxTotalValue = 0;
  let restJewwls = sortedJewels;

  ascendingSortedLimits.forEach((limit) => {
    const underLimitJewels = restJewwls.filter(([weight]) => weight <= limit);
    maxTotalValue += underLimitJewels[underLimitJewels.length - 1][1];

    restJewwls = [...restJewwls.slice(0, underLimitJewels.length), ...restJewwls.slice(underLimitJewels.length + 1)];
  });

  console.log(maxTotalValue);
}

solution(jewels, limitWeights);
