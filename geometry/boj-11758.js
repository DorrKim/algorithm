const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [x1, y1] = input[0].split(' ').map(Number);
const [x2, y2] = input[1].split(' ').map(Number);
const [x3, y3] = input[2].split(' ').map(Number);

function solution([x1, y1], [x2, y2], [x3, y3]) {
  const sign = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);

  console.log(sign === 0 ? 0 : sign > 0 ? 1 : -1);
}

solution([x1, y1], [x2, y2], [x3, y3]);
