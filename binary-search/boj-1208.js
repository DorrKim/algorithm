const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(Number);
const NUMBERS = input[1].split(' ').map(Number);

function solution(N, S, NUMBERS) {
  const mid = Math.ceil(N / 2);
  const list1 = NUMBERS.slice(0, mid);
  const list2 = NUMBERS.slice(mid);

  const subSumList1 = [];
  const subSumList2 = [];
  let count = 0;

  for (let i = 0; i <= mid; i++) {
    getCombinationSum(list1, i).forEach((el) => subSumList1.push(el));
    getCombinationSum(list2, i).forEach((el) => subSumList2.push(el));
  }

  const sortedSubSumList1 = subSumList1.sort((a, b) => a - b);
  const sortedSubSumList2 = subSumList2.sort((a, b) => a - b);

  sortedSubSumList2.forEach((subSum2) => {
    let lb1 = -1;
    let ub1 = sortedSubSumList1.length;

    while (lb1 < ub1 - 1) {
      const mid = Math.floor((lb1 + ub1) / 2);
      const subSum1 = sortedSubSumList1[mid];

      const subSum = subSum1 + subSum2;

      if (subSum < S) {
        lb1 = mid;
      } else {
        ub1 = mid;
      }
    }

    let lb2 = -1;
    let ub2 = sortedSubSumList1.length;

    while (lb2 < ub2 - 1) {
      const mid = Math.floor((lb2 + ub2) / 2);
      const subSum1 = sortedSubSumList1[mid];

      const subSum = subSum1 + subSum2;

      if (subSum <= S) {
        lb2 = mid;
      } else {
        ub2 = mid;
      }
    }
    count += ub2 - ub1;
  });

  if (S === 0) {
    count--;
  }
  console.log(count);
}

function getCombinationSum(array, number) {
  if (number === 0) return [0];
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const fix = array[i];
    const rest = array.slice(i + 1);

    getCombinationSum(rest, number - 1).forEach((el) => {
      result.push(el + fix);
    });
  }

  return result;
}

solution(N, S, NUMBERS);
