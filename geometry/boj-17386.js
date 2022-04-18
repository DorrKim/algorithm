const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [x1, y1, x2, y2] = input[0].split(' ').map(Number);
const [x3, y3, x4, y4] = input[1].split(' ').map(Number);

function solution(p1, p2, p3, p4) {
  const cross = ccw(p1, p2, p3) * ccw(p1, p2, p4) < 0 && ccw(p3, p4, p1) * ccw(p3, p4, p2) < 0;
  console.log(cross ? 1 : 0);
}

function ccw([x1, y1], [x2, y2], [x3, y3]) {
  return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}

solution([x1, y1], [x2, y2], [x3, y3], [x4, y4]);
