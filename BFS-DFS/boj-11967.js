const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const switchInfos = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, switchInfos) {
  const BOARD = new Array(N + 1).fill(null).map(() => new Array(N + 1).fill(null));
  const visit = new Array(N + 1).fill(null).map(() => new Array(N + 1).fill(false));

  const switchMap = new Map();
  switchInfos.forEach(([currRow, currCol, targetRow, targetCol]) => {
    const key = makeKey(currRow, currCol);

    if (switchMap.has(key)) {
      switchMap.get(key).add([targetRow, targetCol]);
    } else {
      switchMap.set(key, new Set().add([targetRow, targetCol]));
    }
  });

  let queue = [[1, 1]];
  BOARD[1][1] = 1;
  visit[1][1] = true;
  let count = 1;

  while (queue.length) {
    const [row, col] = queue.pop();
    const key = makeKey(row, col);

    if (switchMap.has(key)) {
      [...switchMap.get(key)].forEach(([targetRow, targetCol]) => {
        if (BOARD[targetRow][targetCol] !== 1) {
          BOARD[targetRow][targetCol] = 1;
          count++;
        }
      });
      switchMap.delete(key);
      queue = [[row, col]];
      visit.forEach((row) => row.fill(false));
      visit[row][col] = true;
    }

    for (let i = 0; i < 4; i++) {
      const nr = '1102'[i] - 1 + row;
      const nc = '0211'[i] - 1 + col;

      if (nr < 1 || nr > N || nc < 1 || nc > N) continue;
      if (BOARD[nr][nc] !== 1 || visit[nr][nc]) continue;

      BOARD[nr][nc] = 1;
      queue.push([nr, nc]);
      visit[nr][nc] = true;
    }
  }
  console.log(count);
}

function makeKey(row, col) {
  return `${row} ${col}`;
}
solution(N, M, switchInfos);
