const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [L, W] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split('').map(Number));

function solution(L, W, board) {
  const visit = new Array(L).fill(null).map(() => new Array(W).fill(null).map(() => new Array(2).fill(false)));
  const queue = [[0, 0, 1, 1]];
  let pointer = 0;
  visit[0][0][0] = true;

  let totalDistance = 0;

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  while (pointer < queue.length) {
    const [row, col, distance, countCrash] = queue[pointer++];

    totalDistance = distance;
    if (row === L - 1 && col === W - 1) break;

    for (let i = 0; i < 4; i++) {
      const nx = row + dx[i];
      const ny = col + dy[i];
      if (board[nx] === undefined || board[nx][ny] === undefined) continue;

      if (board[nx][ny] === 0 && !visit[nx][ny][countCrash]) {
        queue.push([nx, ny, distance + 1, countCrash]);
        visit[nx][ny][countCrash] = true;
      }
      if (board[nx][ny] === 1 && countCrash === 1 && !visit[nx][ny][0]) {
        queue.push([nx, ny, distance + 1, 0]);
        visit[nx][ny][0] = true;
      }
    }
  }

  console.log(visit[L - 1][W - 1][0] || visit[L - 1][W - 1][1] ? totalDistance : -1);
}

solution(L, W, board);
