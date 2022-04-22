const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [x1, y1, x2, y2] = input[0].split(' ').map(Number);
const [x3, y3, x4, y4] = input[1].split(' ').map(Number);

function solution(p1, p2, p3, p4) {
  const cross1 = ccw(p1, p2, p3) * ccw(p1, p2, p4);
  const cross2 = ccw(p3, p4, p1) * ccw(p3, p4, p2);
  let result;

  if (cross1 === 0 && cross2 === 0) {
    if (!compare(p1, p2)) [p1, p2] = [p2, p1];
    if (!compare(p3, p4)) [p3, p4] = [p4, p3];

    result = compare(p3, p2) && compare(p1, p4) ? 1 : 0;
  } else if (cross1 <= 0 && cross2 <= 0) {
    result = 1;
  } else result = 0;
  console.log(result);
}

function compare(p1, p2) {
  return p1[0] < p2[0] || (p1[0] === p2[0] && p1[1] <= p2[1]);
}

function ccw([x1, y1], [x2, y2], [x3, y3]) {
  return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}

solution([x1, y1], [x2, y2], [x3, y3], [x4, y4]);
