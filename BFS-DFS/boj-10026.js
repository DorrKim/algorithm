const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = parseInt(input[0].trim(), 10);
const BOARD = input.slice(1).map((row) => row.split(''));

function solution(N, BOARD) {
  const visit = new Array(N).fill(null).map(() => new Array(N).fill(false));

  const notColorBlindness = searchArea(N, BOARD, visit);
  initalize(visit);
  const colorBlindness = searchArea(N, colorBlindnessBoard(BOARD), visit);

  console.log(`${notColorBlindness} ${colorBlindness}`);
}

function searchArea(N, board, visit) {
  let countArea = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visit[i][j]) continue;

      const stack = [[i, j]];
      visit[i][j] = true;
      const areaColor = board[i][j];

      while (stack.length) {
        const [row, col] = stack.pop();

        for (let k = 0; k < 4; k++) {
          const nx = '1102'[k] - 1 + row;
          const ny = '0211'[k] - 1 + col;

          if (nx < 0 || ny < 0 || nx >= N || ny >= N || visit[nx][ny] || board[nx][ny] !== areaColor) continue;
          visit[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
      countArea++;
    }
  }

  return countArea;
}

function initalize(visit) {
  visit.forEach((row) => row.fill(false));
}

function colorBlindnessBoard(board) {
  return board.map((row) => row.map((el) => (el === 'G' ? 'R' : el)));
}
solution(N, BOARD);
