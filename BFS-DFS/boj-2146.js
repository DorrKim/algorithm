const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const SIZE = +input[0];
const MAP = input.slice(1).map((row) => row.split(' ').map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const visit = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(false));

function solution(SIZE, MAP) {
  color(SIZE, MAP);

  const sides = [];

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (!MAP[i][j]) continue;
      let isSide = false;

      for (let k = 0; k < 4; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];
        if (MAP[nx] === undefined || MAP[nx][ny] === undefined || MAP[nx][ny] !== 0) continue;
        isSide = true;
      }

      if (isSide) sides.push([i, j]);
    }
  }

  let globalMinDistance = Number.MAX_SAFE_INTEGER;

  sides.forEach(([startRow, startCol]) => {
    const queue = [[startRow, startCol, 0]];
    let queuePointer = 0;
    const startColor = MAP[startRow][startCol];
    initalizeVisit();
    visit[startRow][startCol] = true;

    let localMinDistance = Number.MAX_SAFE_INTEGER;

    while (queuePointer < queue.length) {
      const [row, col, distance] = queue[queuePointer++];

      if (MAP[row][col] && MAP[row][col] !== startColor) {
        localMinDistance = Math.min(localMinDistance, distance - 1);
        break;
      }

      for (let k = 0; k < 4; k++) {
        const nx = row + dx[k];
        const ny = col + dy[k];
        if (MAP[nx] === undefined || MAP[nx][ny] === undefined || MAP[nx][ny] === startColor || visit[nx][ny]) continue;
        visit[nx][ny] = true;
        queue.push([nx, ny, distance + 1]);
      }
    }
    globalMinDistance = Math.min(globalMinDistance, localMinDistance);
  });

  console.log(globalMinDistance);
}

function color(SIZE, MAP) {
  let color = 2;

  while (true) {
    const stack = [];
    initalizeVisit();

    loop1: for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (MAP[i][j] === 1) {
          stack.push([i, j]);
          visit[i][j] = true;
          MAP[i][j] = color;
          break loop1;
        }
      }
    }

    if (stack.length === 0) break;

    while (stack.length) {
      const [row, col] = stack.pop();

      for (let i = 0; i < 4; i++) {
        const nx = row + dx[i];
        const ny = col + dy[i];

        if (MAP[nx] === undefined || MAP[nx][ny] === undefined || MAP[nx][ny] !== 1 || visit[nx][ny]) continue;
        MAP[nx][ny] = color;
        visit[nx][ny] = true;
        stack.push([nx, ny]);
      }
    }
    color++;
  }
}

function initalizeVisit() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      visit[i][j] = false;
    }
  }
}
solution(SIZE, MAP);
