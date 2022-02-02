const [[countHouse], ...paintCostsByHouse] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(countHouse, paintCostsByHouse) {
  const cache = new Array(2).fill(null);
  cache[0] = paintCostsByHouse[0];
  let min = 0;

  for (let i = 1; i < countHouse; i++) {
    const [prevUseRedLocalMinCost, prevUseGreenLocalMinCost, prevUseBlueLocalMinCost] = cache[(i - 1) % 2];
    const [currRedCost, currGreenCost, currBlueCost] = paintCostsByHouse[i];
    const useRedLocalMinCost = Math.min(prevUseGreenLocalMinCost, prevUseBlueLocalMinCost) + currRedCost;
    const useGreenLocalMinCost = Math.min(prevUseRedLocalMinCost, prevUseBlueLocalMinCost) + currGreenCost;
    const useBlueLocalMinCost = Math.min(prevUseRedLocalMinCost, prevUseGreenLocalMinCost) + currBlueCost;

    i === countHouse - 1 && (min = Math.min(useRedLocalMinCost, useGreenLocalMinCost, useBlueLocalMinCost));
    cache[i % 2] = [useRedLocalMinCost, useGreenLocalMinCost, useBlueLocalMinCost];
  }

  console.log(min);
}

solution(countHouse, paintCostsByHouse);
