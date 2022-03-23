const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [R, C] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((line) => line.split('').map((char) => char.charCodeAt() - 65));

function solution(R, C, BOARD) {
  let maxDistance = 0;
  const alphabets = new Array(26).fill(false);
  alphabets[BOARD[0][0]] = true;

  dfs([0, 0], 1);

  console.log(maxDistance);

  function dfs(pos, depth) {
    if (depth > maxDistance) {
      maxDistance = depth;
    }
    const dr = [0, 0, -1, 1];
    const dc = [-1, 1, 0, 0];

    const [row, col] = pos;
    for (let i = 0; i < 4; i++) {
      const nc = col + dc[i];
      const nr = row + dr[i];

      if (nr < 0 || nr >= R || nc < 0 || nc >= C || alphabets[BOARD[nr][nc]]) continue;

      alphabets[BOARD[nr][nc]] = true;
      dfs([nr, nc], depth + 1);
      alphabets[BOARD[nr][nc]] = false;
    }
  }
}

solution(R, C, BOARD);
