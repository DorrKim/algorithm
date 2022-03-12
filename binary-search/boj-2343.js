const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const LECTURES = input[1].split(' ').map(Number);

function solution(N, M, LECTURES) {
  let lb = Math.max(...LECTURES);
  let ub = 10000 * lb + 1;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);
    let count = 0;
    let bundleLength = 0;

    LECTURES.forEach((lecture, index) => {
      const nextBundleLength = bundleLength + lecture;

      if (nextBundleLength > mid) {
        count++;
        bundleLength = lecture;
      } else {
        bundleLength = nextBundleLength;
      }

      if (index === N - 1) count++;
    });

    if (count <= M) {
      ub = mid;
    } else {
      lb = mid + 1;
    }
  }
  console.log(lb);
}

solution(N, M, LECTURES);
