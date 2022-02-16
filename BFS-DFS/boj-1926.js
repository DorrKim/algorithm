const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [H, W] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(H, W, BOARD) {
  const visit = new Array(H).fill(null).map(() => new Array(W).fill(false));

  const widths = [];

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (BOARD[i][j] === 0 || visit[i][j]) continue;
      const stack = [];
      stack.push([i, j]);
      visit[i][j] = true;
      let width = 0;

      while (stack.length) {
        const [row, col] = stack.pop();
        width++;
        for (let i = 0; i < 4; i++) {
          const dx = '0211'[i] - 1;
          const dy = '1102'[i] - 1;
          const nx = row + dx;
          const ny = col + dy;

          if (nx < 0 || nx >= H || ny < 0 || ny >= W || BOARD[nx][ny] === 0 || visit[nx][ny]) continue;

          visit[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
      widths.push(width);
    }
  }
  console.log(`${widths.length}\n${widths.length ? Math.max(...widths) : 0}`);
}

solution(H, W, BOARD);
