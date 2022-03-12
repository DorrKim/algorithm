const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const heights = input[1].split(' ').map(Number);

function solution(M, heights) {
  let lb = 0;
  let ub = 2000000000;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);
    let totalLength = 0;

    for (let i = 0; i < heights.length; i++) {
      const currHeight = heights[i];
      if (currHeight <= mid) continue;
      totalLength += currHeight - mid;
    }

    if (totalLength < M) {
      ub = mid;
    } else if (totalLength >= M) {
      lb = mid + 1;
    }
  }
  console.log(lb - 1);
}

solution(M, heights);
