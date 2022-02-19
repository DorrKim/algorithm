const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const visit = new Array(N).fill(null).map(() => new Array(M).fill(false));
  let hour = 0;

  while (true) {
    visit.forEach((row) => row.fill(false));

    const stack = [[0, 0]];
    visit[0][0] = true;

    while (stack.length) {
      const [row, col] = stack.pop();

      for (let i = 0; i < 4; i++) {
        const nr = '1102'[i] - 1 + row;
        const nc = '0211'[i] - 1 + col;

        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        if (visit[nr][nc] || BOARD[nr][nc] !== 0) continue;
        visit[nr][nc] = true;
        stack.push([nr, nc]);
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (BOARD[i][j] === 0 || visit[i][j]) continue;
        stack.push([i, j]);
        visit[i][j] = true;
        const meltIndex = [];

        while (stack.length) {
          const [row, col] = stack.pop();

          let count = 0;

          for (let i = 0; i < 4; i++) {
            const nr = '1102'[i] - 1 + row;
            const nc = '0211'[i] - 1 + col;

            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            if (visit[nr][nc] && BOARD[nr][nc] === 0) count++;

            if (visit[nr][nc] || BOARD[nr][nc] !== 1) continue;
            visit[nr][nc] = true;
            stack.push([nr, nc]);
          }

          if (count >= 2) meltIndex.push([row, col]);
        }

        meltIndex.forEach(([row, col]) => {
          BOARD[row][col] = 0;
        });
      }
    }
    const isNotMelt = BOARD.some((row) => row.some((el) => el === 1));

    hour++;

    if (!isNotMelt) break;
  }

  console.log(hour);
}

solution(N, M, BOARD);
