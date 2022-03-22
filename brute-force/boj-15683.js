const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const BOARD = input.map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const cctv = [];
  let minCount = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (BOARD[i][j] === 0 || BOARD[i][j] === 6) continue;
      cctv.push({
        type: BOARD[i][j],
        pos: [i, j]
      });
    }
  }

  recursion(BOARD, cctv);

  console.log(minCount);

  function recursion(BOARD, CCTV) {
    if (CCTV.length === 0) {
      const count = countBlindSpot(BOARD);
      minCount = Math.min(count, minCount);
      return;
    }

    const currentCCTV = CCTV[0];
    const restCCTV = CCTV.slice(1);

    for (let direction = 1; direction <= 4; direction++) {
      const newBoard = watch(BOARD, direction, currentCCTV.type, currentCCTV.pos);
      recursion(newBoard, restCCTV);
    }
  }
}

const watchMapper = {
  1: (BOARD, pos) => watch1(BOARD, pos),
  2: (BOARD, pos) => watch2(BOARD, pos),
  3: (BOARD, pos) => watch3(BOARD, pos),
  4: (BOARD, pos) => watch4(BOARD, pos)
};

function watch(BOARD, mainDirection, type, pos) {
  const newBoard = JSON.parse(JSON.stringify(BOARD));

  switch (type) {
    case 1:
      watchMapper[`${mainDirection}`](newBoard, pos);
      break;
    case 2:
      watchMapper[`${mainDirection}`](newBoard, pos);
      watchMapper[`${((mainDirection + 1) % 4) + 1}`](newBoard, pos);
      break;
    case 3:
      watchMapper[`${mainDirection}`](newBoard, pos);
      watchMapper[`${mainDirection + 1 === 5 ? 1 : mainDirection + 1}`](newBoard, pos);
      break;
    case 4:
      watchMapper[`${mainDirection}`](newBoard, pos);
      watchMapper[`${mainDirection + 1 >= 5 ? mainDirection + 1 - 4 : mainDirection + 1}`](newBoard, pos);
      watchMapper[`${mainDirection + 2 >= 5 ? mainDirection + 2 - 4 : mainDirection + 2}`](newBoard, pos);

      break;
    case 5:
      watch1(newBoard, pos);
      watch2(newBoard, pos);
      watch3(newBoard, pos);
      watch4(newBoard, pos);
      break;
  }
  return newBoard;
}

function countBlindSpot(BOARD) {
  let count = 0;

  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD[0].length; j++) {
      if (BOARD[i][j] !== 0) continue;
      count++;
    }
  }

  return count;
}

function watch1(BOARD, [row, col]) {
  for (let i = row - 1; i >= 0; i--) {
    if (BOARD[i][col] === 6) break;
    if (BOARD[i][col] !== 0) continue;
    BOARD[i][col] = '#';
  }
}

function watch2(BOARD, [row, col]) {
  for (let i = col + 1; i < BOARD[0].length; i++) {
    if (BOARD[row][i] === 6) break;
    if (BOARD[row][i] !== 0) continue;
    BOARD[row][i] = '#';
  }
}

function watch3(BOARD, [row, col]) {
  for (let i = row + 1; i < BOARD.length; i++) {
    if (BOARD[i][col] === 6) break;
    if (BOARD[i][col] !== 0) continue;
    BOARD[i][col] = '#';
  }
}

function watch4(BOARD, [row, col]) {
  for (let i = col - 1; i >= 0; i--) {
    if (BOARD[row][i] === 6) break;
    if (BOARD[row][i] !== 0) continue;
    BOARD[row][i] = '#';
  }
}

solution(N, M, BOARD);
