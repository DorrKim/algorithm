const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1, 1 + N).map((row) => row.split(' ').map(Number));
const CASES = input.slice(1 + N).map((row) => row.split(' ').map(Number));

function solution(BOARD, CASES) {
  const accSums = new Array(BOARD.length + 1).fill(null).map(() => new Array(BOARD[0].length + 1).fill(0));

  for (let i = 1; i <= BOARD.length; i++) {
    for (let j = 1; j <= BOARD[0].length; j++) {
      accSums[i][j] = accSums[i - 1][j] + accSums[i][j - 1] - accSums[i - 1][j - 1] + BOARD[i - 1][j - 1];
    }
  }

  const result = CASES.map(
    ([x1, y1, x2, y2]) => accSums[x2][y2] - accSums[x1 - 1][y2] - accSums[x2][y1 - 1] + accSums[x1 - 1][y1 - 1]
  );
  console.log(result.join('\n'));
}

solution(BOARD, CASES);
