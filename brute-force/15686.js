const [[citySize, maxChicken], ...cityMatrix] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

function solution(citySize, maxChicken, cityMatrix) {
  const chickenLocations = [];
  const houseLocations = [];

  cityMatrix.forEach((row, rowIndex) => {
    row.forEach((el, colIndex) => {
      el === 2 && chickenLocations.push([rowIndex, colIndex]);
      el === 1 && houseLocations.push([rowIndex, colIndex]);
    });
  });

  const aliveChickensArray = [];

  function combination(index, aliveChickens, count) {
    if (count === maxChicken) {
      aliveChickensArray.push(aliveChickens);
      return;
    }

    chickenLocations.forEach((location, i) => {
      if (i < index) return;
      combination(i + 1, [...aliveChickens, location], count + 1);
    });
  }

  combination(0, [], 0);

  const minChickenDistance = aliveChickensArray.reduce((prevMin, aliveChickens) => {
    const currMinChickenDistance = houseLocations
      .map(([houseRowIndex, houseColIndex]) => {
        const minChickenDistanceForHouse = aliveChickens.reduce((minDistance, [chickenRowIndex, chickenColIndex]) => {
          const chickenDistance = Math.abs(houseRowIndex - chickenRowIndex) + Math.abs(houseColIndex - chickenColIndex);

          return Math.min(minDistance, chickenDistance);
        }, 2 * citySize);

        return minChickenDistanceForHouse;
      })
      .reduce((acc, curr) => acc + curr, 0);

    return Math.min(prevMin, currMinChickenDistance);
  }, Infinity);

  console.log(minChickenDistance);
}

solution(citySize, maxChicken, cityMatrix);
