const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [R, C] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(R, C, BOARD) {
  const visit = new Array(R).fill(null).map(() => new Array(C).fill(false));

  let startPositions = [];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (BOARD[i][j] === 0) continue;
      startPositions.push([i, j]);
    }
  }
  let years = 0;
  let isNotSeperated = true;

  while (startPositions.length) {
    let nextStartPostions = [];
    let countIce = 0;
    console.log(startPositions);
    visit.forEach((row) => row.fill(false));

    for (let start of startPositions) {
      const [startRow, startCol] = start;
      if (visit[startRow][startCol]) continue;
      visit[startRow][startCol] = true;

      countIce++;
      const dfsStack = [start];

      while (dfsStack.length) {
        const [row, col] = dfsStack.pop();

        for (let i = 0; i < 4; i++) {
          const nr = '1102'[i] - 1 + row;
          const nc = '0211'[i] - 1 + col;

          if (nr < 0 || nr >= R || nc < 0 || nc >= C || visit[nr][nc]) continue;
          if (BOARD[nr][nc] === 0) {
            BOARD[row][col] = BOARD[row][col] === 0 ? 0 : BOARD[row][col] - 1;
            continue;
          }
          dfsStack.push([nr, nc]);
          visit[nr][nc] = true;
        }

        if (BOARD[row][col] !== 0) nextStartPostions.push([row, col]);
      }
    }
    years++;
    startPositions = nextStartPostions;
    console.log(years, countIce, BOARD);
    if (countIce >= 2) {
      isNotSeperated = false;
      break;
    }
  }
  console.log(isNotSeperated ? 0 : years - 1);
}

solution(R, C, BOARD);
