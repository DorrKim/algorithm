const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [R, C] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(R, C, BOARD) {
  const visit = new Array(R).fill(null).map(() => new Array(C).fill(false));
  let count = 0;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (visit[i][j] || BOARD[i][j] === 0) continue;
      const startHeight = BOARD[i][j];
      const stack = [[i, j]];
      visit[i][j] = true;

      let hasTop = false;

      while (stack.length) {
        const [row, col] = stack.pop();

        for (let k = 0; k < 8; k++) {
          const nx = '11000222'[k] - 1 + row;
          const ny = '02102102'[k] - 1 + col;

          if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue;
          hasTop = BOARD[nx][ny] > startHeight || hasTop;
          if (BOARD[nx][ny] !== startHeight || visit[nx][ny]) continue;
          visit[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
      if (!hasTop) count++;
    }
  }
  console.log(count);
}
solution(R, C, BOARD);
