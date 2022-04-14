const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const visit = new Array(M).fill(null).map(() => new Array(N).fill(false));
  const localArea = new Array(M).fill(null).map(() => new Array(N).fill(0));
  const areas = new Map();
  const maxAreas = new Set();
  let mark = 0;

  BOARD.forEach((row, rIndex) => {
    row.forEach((pixel, cIndex) => {
      if (visit[rIndex][cIndex]) return;
      visit[rIndex][cIndex] = true;
      const [area, positions] = DFS(rIndex, cIndex);
      positions.forEach(([row, col]) => {
        localArea[row][col] = mark;
      });
      areas.set(mark, area);
      mark += 1;
    });
  });

  BOARD.forEach((row, rIndex) => {
    row.forEach((pixel, cIndex) => {
      if (cIndex < N - 1 && localArea[rIndex][cIndex] !== localArea[rIndex][cIndex + 1]) {
        maxAreas.add(areas.get(localArea[rIndex][cIndex]) + areas.get(localArea[rIndex][cIndex + 1]));
      }
      if (rIndex < M - 1 && localArea[rIndex][cIndex] !== localArea[rIndex + 1][cIndex]) {
        maxAreas.add(areas.get(localArea[rIndex][cIndex]) + areas.get(localArea[rIndex + 1][cIndex]));
      }
    });
  });

  console.log(areas.size);
  console.log(Math.max(...areas.values()));

  console.log(Math.max(...maxAreas));

  function DFS(cRow, cCol) {
    const flags = (15 & BOARD[cRow][cCol]).toString(2).padStart(4, 0);

    const [area, positions] = flags.split('').reduce(
      ([prevArea, positions], flag, fIndex) => {
        if (flag === '1') return [prevArea, positions];

        const dRow = '2101'[fIndex] - 1;
        const dCol = '1210'[fIndex] - 1;

        const nRow = dRow + cRow;
        const nCol = dCol + cCol;

        if (nRow < 0 || nRow >= M || nCol < 0 || nCol >= N || visit[nRow][nCol]) return [prevArea, positions];
        visit[nRow][nCol] = true;
        const [area, accPositinons] = DFS(nRow, nCol);
        return [prevArea + area, [...positions, ...accPositinons]];
      },
      [1, []]
    );

    return [area, [...positions, [cRow, cCol]]];
  }
}

solution(N, M, BOARD);
