const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
const arrayA = input[2].split(' ').map(Number);
const arrayB = input[4].split(' ').map(Number);

function solution(T, arrayA, arrayB) {
  const subArrayASums = [];
  const subArrayBSums = [];
  let count = 0;
  const a = [];

  for (let i = 0; i < arrayA.length; i++) {
    let subArraySum = 0;
    for (let j = i; j < arrayA.length; j++) {
      subArraySum += arrayA[j];
      subArrayASums.push(subArraySum);
    }
  }

  for (let i = 0; i < arrayB.length; i++) {
    let subArraySum = 0;
    for (let j = i; j < arrayB.length; j++) {
      subArraySum += arrayB[j];
      subArrayBSums.push(subArraySum);
    }
  }
  const sortedSubArrayASums = subArrayASums.sort((a, b) => a - b);

  subArrayBSums.forEach((subSumB) => {
    let lb1 = -1;
    let ub1 = sortedSubArrayASums.length;

    while (lb1 < ub1 - 1) {
      const mid = Math.floor((lb1 + ub1) / 2);
      const subSumA = sortedSubArrayASums[mid];

      const subSum = subSumA + subSumB;

      if (subSum < T) {
        lb1 = mid;
      } else {
        ub1 = mid;
      }
    }

    let lb2 = -1;
    let ub2 = sortedSubArrayASums.length;

    while (lb2 < ub2 - 1) {
      const mid = Math.floor((lb2 + ub2) / 2);
      const subSumA = sortedSubArrayASums[mid];

      const subSum = subSumA + subSumB;

      if (subSum > T) {
        ub2 = mid;
      } else {
        lb2 = mid;
      }
    }
    count += ub2 - ub1;
  });
  console.log(count);
}

solution(T, arrayA, arrayB);
