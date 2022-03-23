const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, C] = input[0].split(' ').map(Number);
const WEIGHTS = input[1].split(' ').map(Number);

function solution(N, C, WEIGHTS) {
  const length = Math.ceil(N / 2);
  const weightsA = WEIGHTS.slice(0, length);
  const weightsB = WEIGHTS.slice(length);

  const subSetA = [];
  const subSetB = [];

  let count = 0;

  for (let i = 0; i <= length; i++) {
    getCombination(weightsA, i).forEach((el) => subSetA.push(el));

    getCombination(weightsB, i).forEach((el) => subSetB.push(el));
  }
  const ascendingSortedSubSetA = [...subSetA].sort((a, b) => a - b);

  subSetB.forEach((subSumB) => {
    if (subSumB > C) return;

    let lb = 0;
    let ub = ascendingSortedSubSetA.length + 1;

    while (lb < ub - 1) {
      const mid = Math.floor((lb + ub) / 2);
      const sumSumA = ascendingSortedSubSetA[mid];

      const subSum = sumSumA + subSumB;

      if (subSum <= C) {
        lb = mid;
      } else {
        ub = mid;
      }
    }

    count += ub;
  });

  console.log(count);
}

function getCombination(array, number) {
  if (array.length < number) return [];
  if (number === 0) return [0];
  if (number === 1) return array;
  let result = [];

  for (let i = 0; i < array.length; i++) {
    const fix = array[i];
    const rest = array.slice(i + 1);
    getCombination(rest, number - 1)
      .map((comb) => fix + comb)
      .forEach((el) => result.push(el));
  }

  return result;
}

solution(N, C, WEIGHTS);
