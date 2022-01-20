const [[boardSize], ...board] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(boardSize, board) {
  let maxNumber = 0;
  // 방향에 따라 블록이동

  function play(roundNum, prevRoundBoard) {
    if (roundNum > 5) {
      const localMaxNumber = getMaxNum(prevRoundBoard);

      maxNumber = Math.max(maxNumber, localMaxNumber);
      return;
    }
    const transposedBoard = transpose(prevRoundBoard);

    const leftMoveBoard = getNewBoard(prevRoundBoard);
    const rightMoveBoard = getNewBoard(prevRoundBoard, true);
    const upMoveBoard = transpose(getNewBoard(transposedBoard));
    const downMoveBoard = transpose(getNewBoard(transposedBoard, true));

    play(roundNum + 1, leftMoveBoard);
    play(roundNum + 1, rightMoveBoard);
    play(roundNum + 1, upMoveBoard);
    play(roundNum + 1, downMoveBoard);
  }

  play(1, board);
  console.log(maxNumber);
}

solution(boardSize, board);

function getMaxNum(board) {
  return board.reduce((untilMax, row) => {
    const rowMax = row.reduce((prevRowMax, curr) => Math.max(prevRowMax, curr), 0);
    return Math.max(untilMax, rowMax);
  }, 0);
}

function transpose(board) {
  return board[0].map((_, rowIndex) => board.map((row) => row[rowIndex]));
}

function getNewBoard(board, reverse) {
  const newBoard = board.map((row) => {
    const targetRow = reverse ? row.reverse() : [...row];
    const noneZerodRow = targetRow.filter((el) => el);

    for (let colIndex = 1; colIndex < noneZerodRow.length; colIndex++) {
      if (noneZerodRow[colIndex - 1] === noneZerodRow[colIndex]) {
        noneZerodRow[colIndex - 1] *= 2;
        noneZerodRow[colIndex] = 0;
      }
    }

    const moreThanZero = noneZerodRow.filter((el) => el);

    const movedRow = moreThanZero.concat(new Array(boardSize - moreThanZero.length).fill(0));

    return reverse ? movedRow.reverse() : movedRow;
  });
  return newBoard;
}
