const [[countStuff, weightLimit], ...stuffInfos] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));

function solution(countStuff, weightLimit, stuffInfos) {
  if (countStuff === 0) {
    console.log(0);
    return;
  }
  const cache = new Array(countStuff).fill(null).map(() => new Array(weightLimit).fill(null));

  const [weight, value] = stuffInfos[0];
  cache[0][weight - 1] = value;

  stuffInfos.forEach((stuffInfo, index) => {
    if (index === 0) return;
    const [currWeight, currValue] = stuffInfo;
    cache[index] = [...cache[index - 1]].map((localMaxValue, localWeight, self) => {
      if (localWeight === currWeight - 1) return Math.max(localMaxValue, currValue);

      return localWeight > currWeight - 1 && self[localWeight - currWeight] !== null
        ? Math.max(self[localWeight - currWeight] + currValue, localMaxValue)
        : localMaxValue;
    });
  });

  console.log(Math.max(...cache[countStuff - 1]));
  console.log(cache);
}

const validStuffInfos = stuffInfos.filter(([weight, _]) => weight <= weightLimit);
solution(validStuffInfos.length, weightLimit, validStuffInfos);
