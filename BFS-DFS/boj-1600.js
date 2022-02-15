const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const K = +input[0];
const [W, H] = input[1].split(' ').map(Number);
const MAP = input.slice(2).map((row) => row.split(' ').map(Number));

function solution(K, W, H, MAP) {
  const visit = new Array(H).fill(null).map(() => new Array(W).fill(null).map(() => new Array(K + 1).fill(false)));

  const queue = [[0, 0, 0, 0]];
  for (let i = 0; i <= K; i++) {
    visit[0][0][i] = 0;
  }

  while (queue.length) {
    const [row, col, jump, move] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = '1102'[i] - 1 + row;
      const nc = '0211'[i] - 1 + col;
      if (nr < 0 || nr >= H || nc < 0 || nc >= W || MAP[nr][nc] === 1) continue;

      if (visit[nr][nc][jump] === false) {
        visit[nr][nc][jump] = move + 1;
        queue.push([nr, nc, jump, move + 1]);
      } else {
        if (visit[nr][nc][jump] <= move + 1) continue;
        else {
          visit[nr][nc][jump] = move + 1;
          queue.push([nr, nc, jump, move + 1]);
        }
      }
    }
    if (jump >= K) continue;

    for (let i = 0; i < 8; i++) {
      const nr = '00113344'[i] - 2 + row;
      const nc = '13040413'[i] - 2 + col;

      if (nr < 0 || nr >= H || nc < 0 || nc >= W || MAP[nr][nc] === 1) continue;
      if (visit[nr][nc][jump + 1] === false) {
        visit[nr][nc][jump + 1] = move + 1;
        queue.push([nr, nc, jump + 1, move + 1]);
      } else {
        if (visit[nr][nc][jump + 1] <= move + 1) continue;
        else {
          visit[nr][nc][jump + 1] = move + 1;
          queue.push([nr, nc, jump + 1, move + 1]);
        }
      }
    }
  }
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i <= K; i++) {
    if (visit[H - 1][W - 1][i] === false) continue;
    result = Math.min(result, visit[H - 1][W - 1][i]);
  }

  console.log(result === Number.MAX_SAFE_INTEGER ? -1 : result);
}

solution(K, W, H, MAP);
