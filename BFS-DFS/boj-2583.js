const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [M, N, K] = input[0].split(' ').map(Number);
const rectangles = [];

for (let i = 1; i <= K; i++) {
  const rec = input[i].split(' ').map(Number);
  rectangles.push(rec);
}

function solution(M, N, rectangles) {
  const BOARD = new Array(M).fill(null).map(() => new Array(N).fill(0));

  const areas = [];

  rectangles.forEach(([x1, y1, x2, y2]) => {
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        BOARD[j][i] += 1;
      }
    }
  });

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (BOARD[i][j] !== 0) continue;
      let area = 1;
      const stack = [[i, j]];
      BOARD[i][j] = 1;

      while (stack.length) {
        const [row, col] = stack.pop();

        for (let i = 0; i < 4; i++) {
          const nx = '1102'[i] - 1 + row;
          const ny = '0211'[i] - 1 + col;

          if (nx < 0 || nx >= M || ny < 0 || ny >= N || BOARD[nx][ny] !== 0) continue;
          BOARD[nx][ny] = 1;
          stack.push([nx, ny]);
          area++;
        }
      }

      areas.push(area);
    }
  }
  console.log(`${areas.length}\n${areas.sort((a, b) => a - b).join(' ')}`);
}

solution(M, N, rectangles);
