let rest = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const testCases = [];

while (rest.length) {
  const [L, R, C] = rest.shift().split(' ').map(Number);
  const cube = [];
  for (let i = 0; i < L; i++) {
    const face = rest.slice(0, R);
    cube.push(face);

    rest = rest.slice(1 + R);
  }
  testCases.push(cube);
}

function solution(testCases) {
  const result = testCases.map(countEscapeTime);

  console.log(result.join('\n'));
}

function countEscapeTime(cube) {
  const L = cube.length;
  const R = cube[0].length;
  const C = cube[0][0].length;
  const visit = new Array(L).fill(null).map(() => new Array(R).fill(null).map(() => new Array(C).fill(false)));

  const queue = [];

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < R; j++) {
      for (let k = 0; k < C; k++) {
        if (cube[i][j][k] !== 'S') continue;
        queue.push([i, j, k, 0]);
        visit[i][j][k] = true;
        break;
      }
    }
  }

  let escapeTime = null;

  while (queue.length) {
    const [length, row, col, time] = queue.shift();
    if (cube[length][row][col] === 'E') {
      escapeTime = time;
      break;
    }

    for (let i = 0; i < 6; i++) {
      const dLength = '111102'[i] - 1;
      const dRow = '110211'[i] - 1;
      const dCol = '021111'[i] - 1;

      const nLength = length + dLength;
      const nRow = row + dRow;
      const nCol = col + dCol;

      if (
        nLength < 0 ||
        nLength >= L ||
        nRow < 0 ||
        nRow >= R ||
        nCol < 0 ||
        nCol >= C ||
        visit[nLength][nRow][nCol] ||
        cube[nLength][nRow][nCol] === '#'
      )
        continue;

      visit[nLength][nRow][nCol] = true;
      queue.push([nLength, nRow, nCol, time + 1]);
    }
  }

  return escapeTime === null ? 'Trapped!' : `Escaped in ${escapeTime} minute(s).`;
}

solution(testCases.slice(0, -1));
