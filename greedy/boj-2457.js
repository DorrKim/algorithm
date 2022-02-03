const [N, ...flowers] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const countFlowers = parseInt(N, 10);
const flowerLifeTimes = flowers.map((flowers) => flowers.split(' ').map(Number));

function solution(countFlowers, flowerLifeTimes) {
  const sortedFlowerLifeTimes = flowerLifeTimes.sort(
    (flowerA, flowerB) =>
      flowerA[0] - flowerB[0] || flowerA[1] - flowerB[1] || flowerA[2] - flowerB[2] || flowerA[3] - flowerB[3]
  );
  let lastBloomMonth = 3;
  let lastBloomDay = 1;

  let restFlowers = sortedFlowerLifeTimes;
  let count = 0;

  while (true) {
    const validateFlowers = restFlowers.filter(
      ([bloomMonth, bloomDay]) =>
        bloomMonth < lastBloomMonth || (bloomMonth === lastBloomMonth && bloomDay <= lastBloomDay)
    );

    if (validateFlowers.length === 0) {
      console.log(0);
      return;
    }

    [bloomMonth, bloomDay, lastBloomMonth, lastBloomDay] = validateFlowers.sort(
      (flowerA, flowerB) => flowerB[2] - flowerA[2] || flowerB[3] - flowerA[3]
    )[0];

    if (bloomMonth === lastBloomMonth && bloomDay === lastBloomDay) {
      restFlowers = restFlowers.slice(validateFlowers.length);
      continue;
    }

    count++;
    if (lastBloomMonth === 12) break;

    restFlowers = restFlowers.slice(validateFlowers.length);
  }

  console.log(count);
}

solution(countFlowers, flowerLifeTimes);
