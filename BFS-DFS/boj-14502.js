const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, BOARD) {
  const wallPositions = [];
  const virusOrigin = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (BOARD[i][j] === 2) virusOrigin.push([i, j]);
      if (BOARD[i][j]) continue;

      wallPositions.push([i, j]);
    }
  }

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const selectedWallPositions = getCombination(wallPositions, 3);

  let result = 0;

  for (let i = 0; i < selectedWallPositions.length; i++) {
    const wallPosition = selectedWallPositions[i];

    const visit = new Array(N).fill(null).map(() => new Array(M).fill(false));
    const newBoard = [];
    const [[row1, col1], [row2, col2], [row3, col3]] = wallPosition;

    for (let i = 0; i < N; i++) {
      const newRow = [];
      for (let j = 0; j < M; j++) {
        let pixel = BOARD[i][j];
        if ((i === row1 && j === col1) || (i === row2 && j === col2) || (i === row3 && j === col3)) pixel = 1;
        newRow.push(pixel);
      }
      newBoard.push(newRow);
    }

    const stack = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (newBoard[i][j] !== 2) continue;
        stack.push([i, j]);
      }
    }

    while (stack.length) {
      const [row, col] = stack.pop();
      if (visit[row][col]) continue;
      visit[row][col] = true;

      for (let i = 0; i < 4; i++) {
        const nx = row + dx[i];
        const ny = col + dy[i];
        if (newBoard[nx] === undefined || newBoard[nx][ny] === undefined || newBoard[nx][ny] !== 0 || visit[nx][ny])
          continue;

        newBoard[nx][ny] = 2;
        stack.push([nx, ny]);
      }
    }

    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (newBoard[i][j]) continue;
        count++;
      }
    }

    result = Math.max(count, result);
  }

  console.log(result);
}

solution(N, M, BOARD);

function getCombination(array, number) {
  const result = [];
  if (number === 1) return array.map((el) => [el]);

  for (let i = 0; i < array.length; i++) {
    const fixed = array[i];

    rest = array.slice(i + 1);
    const attached = getCombination(rest, number - 1).map((prev) => {
      return [fixed, ...prev];
    });

    result.push(...attached);
  }
  return result;
}
