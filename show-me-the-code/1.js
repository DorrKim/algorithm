const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const costs = input[1].split(' ').map(Number);
const discountInfos = [];
let rest = input.slice(2).map((line) => line.split(' ').map(Number));

for (let i = 0; i < N; i++) {
  const [length] = rest[0];
  const discountInfo = rest.slice(1, 1 + length);
  discountInfos.push(discountInfo);
  rest = rest.slice(1 + length);
}

function solution(N, costs, discountInfos) {
  const isPurchased = new Array(N).fill(false);
  let minTotalCost = Number.MAX_SAFE_INTEGER;
  purchase(N, costs, isPurchased, 0);
  // const minTotalCost = Math.min(...totalCosts);
  // console.log(minTotalCost);
  console.log(minTotalCost);

  function purchase(number, costs, isPurchased, totalCost) {
    if (number === 1) {
      costs
        .filter((_, index) => !isPurchased[index])
        .forEach((cost) => {
          minTotalCost = Math.min(cost + totalCost, minTotalCost);
        });
      return;
    }
    const result = [];

    for (let i = 0; i < costs.length; i++) {
      if (isPurchased[i]) continue;
      isPurchased[i] = true;
      const pickedCost = costs[i];
      const updatedCosts = updateCosts(costs, discountInfos[i]);

      purchase(number - 1, updatedCosts, isPurchased, totalCost + pickedCost);
      isPurchased[i] = false;
    }

    return result;
  }
}

function updateCosts(currentCostInfo, discountInfo) {
  const copy = [...currentCostInfo];

  discountInfo.forEach(([number, discountAmount]) => {
    const index = number - 1;
    copy[index] = Math.max(1, copy[index] - discountAmount);
  });
  return copy;
}

solution(N, costs, discountInfos);
