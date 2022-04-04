const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, BOARD) {
  const initialPosition = getInitialPostion(BOARD);
  let currentSharkPostion = initialPosition;
  let babySharkSize = 2;
  let countEatenFishesBeforeGrow = 0;
  let time = 0;

  while (true) {
    const closestEatableFish = findEatableFish(BOARD, babySharkSize, currentSharkPostion);
    if (closestEatableFish.length === 0) break;

    const [currRow, currCol] = currentSharkPostion;
    const [nextRow, nextCol, dist] = closestEatableFish;
    BOARD[currRow][currCol] = 0;

    countEatenFishesBeforeGrow++;
    if (babySharkSize === countEatenFishesBeforeGrow) {
      babySharkSize++;
      countEatenFishesBeforeGrow = 0;
    }
    BOARD[nextRow][nextCol] = babySharkSize;
    currentSharkPostion = [nextRow, nextCol];

    time += dist;
  }
  console.log(time);
}

function getInitialPostion(BOARD) {
  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD[0].length; j++) {
      if (BOARD[i][j] !== 9) continue;

      return [i, j];
    }
  }
}

function findEatableFish(BOARD, size, [currentRow, currentCol]) {
  const width = BOARD[0].length;
  const height = BOARD.length;
  const visit = new Array(height).fill(null).map(() => new Array(width).fill(false));
  const queue = [[currentRow, currentCol, 0]];
  let pointer = 0;
  visit[currentRow][currentCol] = true;

  const closestEatableFishes = [];
  let closestDist = Number.MAX_SAFE_INTEGER;

  while (pointer < queue.length) {
    const [row, col, dist] = queue[pointer++];
    if (BOARD[row][col] !== 0 && BOARD[row][col] < size && dist <= closestDist) {
      closestDist = dist;
      closestEatableFishes.push([row, col, dist]);
    }

    for (let i = 0; i < 4; i++) {
      const dRow = '1102'[i] - 1;
      const dCol = '0211'[i] - 1;

      const nextRow = row + dRow;
      const nextCol = col + dCol;

      if (
        nextRow < 0 ||
        nextRow >= height ||
        nextCol < 0 ||
        nextCol >= width ||
        visit[nextRow][nextCol] ||
        BOARD[nextRow][nextCol] > size
      )
        continue;
      visit[nextRow][nextCol] = true;

      queue.push([nextRow, nextCol, dist + 1]);
    }
  }

  if (closestEatableFishes.length === 0) return [];

  const closestEatableFishPosition = closestEatableFishes.reduce(([accRow, accCol], [currRow, currCol]) => {
    const currentIsPrefered = currRow < accRow || (currRow === accRow && currCol < accCol);
    return currentIsPrefered ? [currRow, currCol] : [accRow, accCol];
  });

  return [...closestEatableFishPosition, closestDist];
}
solution(N, BOARD);
