const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const bridges = [];
  let landMark = 2;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (BOARD[i][j] !== 1) continue;
      const stack = [[i, j]];
      BOARD[i][j] = landMark;

      while (stack.length) {
        const [row, col] = stack.pop();

        for (let k = 0; k < 4; k++) {
          const dr = '1102'[k] - 1;
          const dc = '0211'[k] - 1;

          const nRow = row + dr;
          const nCol = col + dc;

          if (nRow < 0 || nRow >= N || nCol < 0 || nCol >= M || BOARD[nRow][nCol] !== 1) continue;
          BOARD[nRow][nCol] = landMark;
          stack.push([nRow, nCol]);
        }
      }
      landMark++;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (BOARD[i][j] === 0) continue;

      for (let k = 0; k < 4; k++) {
        const dr = '1102'[k] - 1;
        const dc = '0211'[k] - 1;

        let nr = i + dr;
        let nc = j + dc;

        let bridgeLength = 0;
        while (true) {
          if (nr < 0 || nr >= N || nc < 0 || nc >= M) break;
          if (BOARD[nr][nc] !== 0) {
            if (bridgeLength >= 2) bridges.push([BOARD[i][j], BOARD[nr][nc], bridgeLength]);
            break;
          }
          bridgeLength++;
          nr += dr;
          nc += dc;
        }
      }
    }
  }

  bridges.sort((a, b) => a[2] - b[2]);
  const parents = new Array(landMark).fill(null).map((_, i) => i);
  let minTotalDist = 0;
  let count = 0;

  for (let i = 0; i < bridges.length; i++) {
    if (count === landMark - 2) break;
    const [land1, land2, dist] = bridges[i];
    const unioned = union(parents, land1, land2);

    if (unioned) {
      minTotalDist += dist;
      count++;
    }
  }

  parents.forEach((_, i) => {
    if (i < 2) return;
    find(parents, i);
  });
  const set = new Set(parents.slice(2));

  if (set.size !== 1) console.log(-1);
  else console.log(minTotalDist);
}

function find(parents, node) {
  if (node === parents[node]) return node;

  return (parents[node] = find(parents, parents[node]));
}

function union(parents, node1, node2) {
  const parent1 = find(parents, node1);
  const parent2 = find(parents, node2);

  if (parent1 === parent2) return false;

  if (parent1 < parent2) {
    parents[parent2] = parent1;
  } else {
    parents[parent1] = parent2;
  }

  return true;
}

solution(N, M, BOARD);
