const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const countTestCases = +input[0];
const testCases = [];
const rest = input.slice(1);
let start = 0;

for (let i = 0; i < countTestCases; i++) {
  const [C, R] = rest[start].split(' ').map(Number);
  const MAP = rest.slice(start + 1, start + 1 + R).map((row) => row.split(''));
  const testCase = {
    R,
    C,
    MAP
  };
  testCases.push(testCase);
  start += R + 1;
}

function solution(R, C, MAP) {
  let jihunQueue1 = [];
  let fireQueue1 = [];
  const visit = new Array(R).fill(null).map(() => new Array(C).fill(false));
  let result = null;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (MAP[i][j] !== '@' && MAP[i][j] !== '*') continue;

      if (MAP[i][j] == '@') {
        jihunQueue1.push([i, j, 0]);
        visit[i][j] = true;
      } else {
        fireQueue1.push([i, j]);
      }
    }
  }

  loop1: while (true) {
    let fireQueue2 = [];
    while (fireQueue1.length) {
      const [fRow, fCol] = fireQueue1.shift();

      for (let i = 0; i < 4; i++) {
        const nx = '1102'[i] - 1 + fRow;
        const ny = '0211'[i] - 1 + fCol;

        if (nx < 0 || nx >= R || ny < 0 || ny >= C || MAP[nx][ny] === '#' || MAP[nx][ny] === '*') continue;
        MAP[nx][ny] = '*';
        fireQueue2.push([nx, ny]);
      }
    }

    fireQueue1 = fireQueue2;

    let jihunQueue2 = [];
    while (jihunQueue1.length) {
      const [jRow, jCol, move] = jihunQueue1.shift();

      if (jRow === R - 1 || jCol === C - 1 || jRow === 0 || jCol === 0) {
        result = move + 1;
        break loop1;
      }

      for (let i = 0; i < 4; i++) {
        const nx = '1102'[i] - 1 + jRow;
        const ny = '0211'[i] - 1 + jCol;
        if (nx < 0 || nx >= R || ny < 0 || ny >= C || MAP[nx][ny] !== '.' || visit[nx][ny]) continue;
        visit[nx][ny] = true;
        jihunQueue2.push([nx, ny, move + 1]);
      }
    }
    jihunQueue1 = jihunQueue2;

    if (jihunQueue2.length === 0) {
      result = 'IMPOSSIBLE';
      break;
    }
  }
  return result;
}

const result = testCases.map(({ R, C, MAP }) => solution(R, C, MAP)).join('\n');
console.log(result.trim());
