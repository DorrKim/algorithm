const BOARD = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

function solution(BOARD) {
  const size = BOARD.length;
  const visit = new Array(size).fill(null).map(() => new Array(size).fill(false));
  let countMake7Princess = 0;
  console.log(visit);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (BOARD[i][j] === 'Y') continue;
      //visit[i][j] = true;
      recursion({ nx: i, ny: j, countS: 1, countY: 0 });
    }
  }

  console.log(countMake7Princess);

  function recursion({ nx: cx, ny: cy, countS: currCountS, countY: currCountY }) {
    if (currCountS + currCountY === 7) {
      if (currCountS > currCountY) {
        countMake7Princess++;
      }
      return;
    }

    if (currCountY === 4) return;

    for (let i = 0; i < 4; i++) {
      const dx = '1102'[i] - 1;
      const dy = '0211'[i] - 1;

      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || nx >= size || ny < 0 || ny >= size || visit[nx][ny]) continue;

      if (BOARD[nx][ny] === 'S') {
        //visit[nx][ny] = true;
        recursion({ nx, ny, countS: currCountS + 1, countY: currCountY });
        //visit[nx][ny] = false;
      } else {
        //visit[nx][ny] = true;
        recursion({ nx, ny, countS: currCountS, countY: currCountY + 1 });
        //visit[nx][ny] = false;
      }
    }
  }
}
solution(BOARD);
