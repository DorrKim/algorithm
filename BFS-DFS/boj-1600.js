const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const K = +input[0];
const [W, H] = input[1].split(' ').map(Number);
const MAP = input.slice(2).map((row) => row.split(' ').map(Number));

function solution(K, W, H, MAP) {
  const visit = new Array(H).fill(null).map(() => new Array(W).fill(null).map(() => new Array(K + 1).fill(Infinity)));

  const queue1 = [0];
  const queue2 = [0];
  const queue3 = [0];
  const queue4 = [0];
  let pointer = 0;
  let result = -1;

  while (pointer < queue1.length) {
    const row = queue1[pointer];
    const col = queue2[pointer];
    const jump = queue3[pointer];
    const move = queue4[pointer];
    pointer++;

    if (row === H - 1 && col === W - 1) {
      result = move;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nr = '1102'[i] - 1 + row;
      const nc = '0211'[i] - 1 + col;
      if (nr < 0 || nr >= H || nc < 0 || nc >= W || MAP[nr][nc] === 1) continue;
      if (visit[nr][nc][jump] <= move + 1) continue;

      visit[nr][nc][jump] = move + 1;
      queue1.push(nr);
      queue2.push(nc);
      queue3.push(jump);
      queue4.push(move + 1);
    }

    if (jump >= K) continue;

    for (let i = 0; i < 8; i++) {
      const nr = '00113344'[i] - 2 + row;
      const nc = '13040413'[i] - 2 + col;

      if (nr < 0 || nr >= H || nc < 0 || nc >= W || MAP[nr][nc] === 1) continue;
      if (visit[nr][nc][jump + 1] <= move + 1) continue;

      visit[nr][nc][jump + 1] = move + 1;
      queue1.push(nr);
      queue2.push(nc);
      queue3.push(jump + 1);
      queue4.push(move + 1);
    }
  }

  console.log(result);
}

solution(K, W, H, MAP);
