const [WLH, ...rest] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [W, L, H] = WLH.split(' ').map(Number);
const layers = [];

for (let i = 0; i < H; i++) {
  const layer = rest.slice(i * L, (i + 1) * L).map((line) => line.split(' ').map(Number));
  layers.push(layer);
}

function solution(W, L, H, layers) {
  const visit = new Array(H).fill(null).map(() => new Array(L).fill(null).map(() => new Array(W).fill(false)));
  const queue = [];
  let queuePointer = 0;

  const dx = [0, 0, 0, 0, 1, -1];
  const dy = [1, -1, 0, 0, 0, 0];
  const dz = [0, 0, 1, -1, 0, 0];

  let lastDay = 0;

  for (let i = 0; i < H; i++) {
    const currlayer = layers[i];
    for (let j = 0; j < L; j++) {
      for (let k = 0; k < W; k++) {
        if (currlayer[j][k] !== 1) continue;
        queue.push([i, j, k, 0]);
      }
    }
  }

  while (queuePointer < queue.length) {
    const [layerIndex, rowIndex, colIndex, day] = queue[queuePointer++];

    visit[layerIndex][rowIndex][colIndex] = true;
    lastDay = day;

    for (let i = 0; i < 6; i++) {
      const nx = colIndex + dx[i];
      const ny = rowIndex + dy[i];
      const nz = layerIndex + dz[i];

      if (layers[nz] === undefined || layers[nz][ny] === undefined || layers[nz][ny][nx] === undefined) continue;
      if (visit[nz][ny][nx] || layers[nz][ny][nx] !== 0) continue;
      layers[nz][ny][nx] = 1;
      queue.push([nz, ny, nx, day + 1]);
    }
  }

  const isNotAllRipened = layers.some((layer) => layer.some((line) => line.some((state) => state === 0)));

  if (isNotAllRipened) lastDay = -1;

  console.log(lastDay);
}

solution(W, L, H, layers);
