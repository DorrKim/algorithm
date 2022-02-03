const [N, roadInfos, oilInfos] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const countCity = parseInt(N, 10);
const distances = roadInfos.split(' ').map(Number);
const oilCosts = oilInfos.split(' ').map(Number);

function solution(countCity, distances, oilCosts) {
  let mostCheapCost = Number.MAX_SAFE_INTEGER;
  let totalCost = 0n;

  for (let i = 0; i < countCity - 1; i++) {
    mostCheapCost = Math.min(oilCosts[i], mostCheapCost);
    totalCost += BigInt(mostCheapCost) * BigInt(distances[i]);
  }

  console.log(totalCost.toString());
}

solution(countCity, distances, oilCosts);
