const [[citySize, maxChicken], ...cityMatrix] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

function solution(citySize, maxChicken, cityMatrix) {
  const chickenLocations = [];
  const houseLocations = [];

  for (let i = 0; i < citySize; i++) {
    for (let j = 0; j < citySize; j++) {
      if (cityMatrix[i][j] === 2) chickenLocations.push([i, j]);
      if (cityMatrix[i][j] === 1) houseLocations.push([i, j]);
    }
  }

  const aliveChickensArray = [];

  function combination(index, aliveChickens, count) {
    if (count === maxChicken) {
      aliveChickensArray.push(aliveChickens);
      return;
    }

    const visited = new Array(chickenLocations.length).fill(false);

    for (let i = index; i < chickenLocations.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      combination(i + 1, [...aliveChickens, chickenLocations[i]], count + 1);
    }
  }

  combination(0, [], 0);

  const minChickenDistances = aliveChickensArray.map((aliveChickens) => {
    const currMinChickenDistances = houseLocations.map(([houseRowIndex, houseColIndex]) => {
      const chickenDistance = aliveChickens.map(([chickenRowIndex, chickenColIndex]) => {
        return Math.abs(houseRowIndex - chickenRowIndex) + Math.abs(houseColIndex - chickenColIndex);
      });

      return Math.min(...chickenDistance);
    });
    return currMinChickenDistances.reduce((acc, curr) => acc + curr, 0);
  });

  console.log(Math.min(...minChickenDistances));
}

solution(citySize, maxChicken, cityMatrix);
