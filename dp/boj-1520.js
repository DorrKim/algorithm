const [[length, width], ...board] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(length, width, board) {
  const cache = Array.from({ length: length }, () => new Array(width).fill(null));
  cache[length - 1][width - 1] = 1;
  const result = DFS(0, 0);
  console.log(result);

  function DFS(row, col) {
    if (cache[row][col] !== null) return cache[row][col];
    const currHeight = board[row][col];

    const a = row + 1 < length && board[row + 1][col] < currHeight ? DFS(1 + row, col) : 0;
    const b = col + 1 < width && board[row][col + 1] < currHeight ? DFS(row, 1 + col) : 0;

    const c = row - 1 >= 0 && board[row - 1][col] < currHeight ? DFS(-1 + row, col) : 0;
    const d = col - 1 >= 0 && board[row][col - 1] < currHeight ? DFS(row, -1 + col) : 0;
    return (cache[row][col] = a + b + c + d);
  }
}
solution(length, width, board);
