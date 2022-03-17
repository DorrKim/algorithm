const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input.shift();
const MATRIX = input.map((line) => line.split(' ').map(Number));

function solution(N, MATRIX) {
  let globalMinDiff = Infinity;

  for (let i = 0; i < N - 2; i++) {
    for (let j = 1; j < N - 1; j++) {
      const start = [i, j];

      for (let d1 = 1; d1 <= N; d1++) {
        for (let d2 = 1; d2 <= N; d2++) {
          if (i + d1 + d2 >= N) continue;
          if (j - d1 > 0 && j + d2 < N) {
            const minDiff = getDiff(MATRIX, start, d1, d2);
            globalMinDiff = Math.min(minDiff, globalMinDiff);
          }

          if (j - d2 > 0 && j + d1 < N) {
            const minDiff = getDiff(MATRIX, start, d1, d2);
            globalMinDiff = Math.min(minDiff, globalMinDiff);
          }
        }
      }
    }
  }

  console.log(globalMinDiff);
}

function getDiff(MATRIX, start, d1, d2) {
  const [startX, startY] = start;
  const leftEdge = [startX + d1, startY - d1];
  const rightEdge = [startX + d2, startY + d2];
  const bottomEdge = [startX + d1 + d2, startY - d1 + d2];

  let area1 = 0;
  let area2 = 0;
  let area3 = 0;
  let area4 = 0;
  let area5 = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (
        leftEdge[1] + Math.abs(i - leftEdge[0]) <= j &&
        j <= rightEdge[1] - Math.abs(i - rightEdge[0]) &&
        startX <= i &&
        i <= bottomEdge[0]
      ) {
        area5 += MATRIX[i][j];
        continue;
      }

      if (i < leftEdge[0] && j <= startY) {
        area1 += MATRIX[i][j];
        continue;
      }

      if (i <= rightEdge[0] && j > startY) {
        area2 += MATRIX[i][j];
        continue;
      }

      if (i >= leftEdge[0] && j < bottomEdge[1]) {
        area3 += MATRIX[i][j];
        continue;
      }

      if (i > rightEdge[0] && j >= bottomEdge[1]) {
        area4 += MATRIX[i][j];
        continue;
      }
    }
  }

  const max = Math.max(area1, area2, area3, area4, area5);
  const min = Math.min(area1, area2, area3, area4, area5);

  return max - min;
}

solution(N, MATRIX);
