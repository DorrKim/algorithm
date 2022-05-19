function solution(board) {
  const size = board.length;
  const dp = new Array(size).fill(null).map(() => new Array(size).fill(null).map(() => new Array(4).fill(Infinity)));

  dp[0][0].fill(0);

  const queue = [];

  if (board[0][1] === 0) {
    dp[0][1][2] = 100;
    queue.push([0, 1, 2, 100]);
  }

  if (board[1][0] === 0) {
    dp[1][0][3] = 100;
    queue.push([1, 0, 3, 100]);
  }

  while (queue.length) {
    const [row, col, inDirection, cost] = queue.shift();

    for (let outDirection = 0; outDirection < 4; outDirection++) {
      if (outDirection === inDirection) continue;
      const dx = '1210'[outDirection] - 1;
      const dy = '2101'[outDirection] - 1;

      const nx = dx + row;
      const ny = dy + col;

      if (nx < 0 || nx >= size || ny < 0 || ny >= size || board[nx][ny] === 1) continue;
      const nextIndirection = (outDirection + 2) % 4;
      const nextCost = cost + (nextIndirection === inDirection ? 100 : 600);

      if (dp[nx][ny][nextIndirection] <= nextCost) continue;
      dp[nx][ny][nextIndirection] = nextCost;
      queue.push([nx, ny, nextIndirection, nextCost]);
    }
  }

  return Math.min(...dp[size - 1][size - 1]);
}
function solution(board) {
  const size = board.length;
  const dp = new Array(size).fill(null).map(() => new Array(size).fill(null).map(() => new Array(4).fill(Infinity)));

  dp[0][0].fill(0);

  const queue = [];

  if (board[0][1] === 0) {
    dp[0][1][2] = 100;
    queue.push([0, 1, 2, 100]);
  }

  if (board[1][0] === 0) {
    dp[1][0][3] = 100;
    queue.push([1, 0, 3, 100]);
  }

  while (queue.length) {
    const [row, col, inDirection, cost] = queue.shift();

    for (let outDirection = 0; outDirection < 4; outDirection++) {
      if (outDirection === inDirection) continue;
      const dx = '1210'[outDirection] - 1;
      const dy = '2101'[outDirection] - 1;

      const nx = dx + row;
      const ny = dy + col;

      if (nx < 0 || nx >= size || ny < 0 || ny >= size || board[nx][ny] === 1) continue;
      const nextIndirection = (outDirection + 2) % 4;
      const nextCost = cost + (nextIndirection === inDirection ? 100 : 600);

      if (dp[nx][ny][nextIndirection] <= nextCost) continue;
      dp[nx][ny][nextIndirection] = nextCost;
      queue.push([nx, ny, nextIndirection, nextCost]);
    }
  }

  return Math.min(...dp[size - 1][size - 1]);
}
