const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const board = input.map((line) => line.split(''));

function solution(N, M, board) {
  const visit = new Array(N).fill(null).map(() => new Array(M));
  let maxDistance = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'W') continue;
      visit.forEach((line) => line.fill(false));

      const queue = [[i, j, 0]];
      let pointer = 0;

      while (pointer < queue.length) {
        const [nr, nc, currDistance] = queue[pointer++];
        maxDistance = Math.max(currDistance, maxDistance);

        for (let i = 0; i < 4; i++) {
          const dr = '1102'[i] - 1;
          const dc = '0211'[i] - 1;

          const nextRow = nr + dr;
          const nextCol = nc + dc;

          if (
            nextRow < 0 ||
            nextRow >= N ||
            nextCol < 0 ||
            nextCol >= M ||
            visit[nextRow][nextCol] ||
            board[nextRow][nextCol] === 'W'
          )
            continue;

          visit[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol, currDistance + 1]);
        }
      }
    }
  }

  console.log(maxDistance);
}

solution(N, M, board);
