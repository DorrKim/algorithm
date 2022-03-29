const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const [row, col, direction] = input[1].split(' ').map(Number);
const BOARD = input.slice(2).map((row) => row.split(' ').map(Number));

function solution([startRow, startCol, startDirection], BOARD) {
  let currentRow = startRow;
  let currentCol = startCol;
  let currentDirection = startDirection;
  let countClean = 0;

  loop1: while (true) {
    if (BOARD[currentRow][currentCol] === 0) {
      cleanCurrentPosition(BOARD, [currentRow, currentCol]);
      countClean++;
    }

    let rotateCount = 0;

    while (true) {
      if (rotateCount === 4) {
        const [backRow, backCol] = getBackPostion([currentRow, currentCol], currentDirection);
        if (BOARD[backRow][backCol] === 1) break loop1;
        currentRow = backRow;
        currentCol = backCol;
        rotateCount = 0;
        continue;
      }
      currentDirection = rotateLeft(currentDirection);
      rotateCount += 1;

      const [frontRow, frontCol] = getFrontPostion([currentRow, currentCol], currentDirection);
      if (BOARD[frontRow][frontCol]) continue;
      currentRow = frontRow;
      currentCol = frontCol;
      break;
    }
  }
  console.log(countClean);
}

function cleanCurrentPosition(BOARD, [currentRow, currentCol]) {
  BOARD[currentRow][currentCol] = 2;
}

function rotateLeft(currentDirection) {
  return currentDirection - 1 < 0 ? 3 : currentDirection - 1;
}

function getFrontPostion([currentRow, currentCol], currentDirection) {
  const dr = '0121'[currentDirection] - 1;
  const dc = '1210'[currentDirection] - 1;

  const nr = currentRow + dr;
  const nc = currentCol + dc;

  return [nr, nc];
}

function getBackPostion([currentRow, currentCol], currentDirection) {
  const dr = '0121'[currentDirection] - 1;
  const dc = '1210'[currentDirection] - 1;

  const nr = currentRow - dr;
  const nc = currentCol - dc;

  return [nr, nc];
}

solution([row, col, direction], BOARD);
