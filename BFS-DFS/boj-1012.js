//========함수 작성 ===============
function solution(data) {
  const [cols, rows, countCabbage] = data[0];
  const cabbagePoses = data.slice(1).map((el) => [el[1], el[0]]);
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const map = Array.from({ length: rows }, () => new Array(cols).fill(0));
  let count = 0;

  cabbagePoses.forEach((el) => {
    const [row, col] = el;
    map[row][col] = 1;
  });

  for (let pos of cabbagePoses) {
    const [row, col] = pos;
    if (visited[row][col]) continue;
    let stack = [pos];

    while (stack.length) {
      const [row, col] = stack.pop();

      if (map[row][col] === 0) continue;

      if (visited[row][col]) continue;
      visited[row][col] = true;

      if (row - 1 >= 0) {
        stack.push([row - 1, col]);
      }

      if (col - 1 >= 0) {
        stack.push([row, col - 1]);
      }

      if (row + 1 < rows) {
        stack.push([row + 1, col]);
      }

      if (col + 1 < cols) {
        stack.push([row, col + 1]);
      }
    }
    count++;
  }
  console.log(count);
}
//==========================================
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line.split(' ').map((el) => +el));
}).on('close', function () {
  //============개발로직 작성===============

  const cases = [];

  for (let i = 1; i < input.length; i++) {
    const temp = input[i][2] + 2;
    const data = input.slice(i, i + temp - 1);
    cases.push(data);
    i += temp - 2;
  }

  cases.forEach((el) => {
    solution(el);
  });

  //===========프로세스 종료 =============
  process.exit();
});
