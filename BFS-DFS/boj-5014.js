const [TOP_FLOOR, START_FLOOR, TARGET_FLOOR, UP_MOVE, DOWN_MOVE] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

function solution(TOP_FLOOR, START_FLOOR, TARGET_FLOOR, UP_MOVE, DOWN_MOVE) {
  const visit = new Array(TOP_FLOOR + 1).fill(false);
  const queue = [
    {
      currFloor: START_FLOOR,
      countPressBtn: 0
    }
  ];
  let result = 'use the stairs';

  while (queue.length) {
    const { currFloor, countPressBtn } = queue.shift();
    if (currFloor === TARGET_FLOOR) {
      result = countPressBtn;
      break;
    }

    const upMoveNextFloor = currFloor + UP_MOVE;
    const downMoveNextFloor = currFloor - DOWN_MOVE;
    if (upMoveNextFloor <= TOP_FLOOR && !visit[upMoveNextFloor]) {
      queue.push({ currFloor: upMoveNextFloor, countPressBtn: countPressBtn + 1 });
      visit[upMoveNextFloor] = true;
    }
    if (downMoveNextFloor >= 1 && !visit[downMoveNextFloor]) {
      queue.push({ currFloor: downMoveNextFloor, countPressBtn: countPressBtn + 1 });
      visit[downMoveNextFloor] = true;
    }
  }

  console.log(result);
}

solution(TOP_FLOOR, START_FLOOR, TARGET_FLOOR, UP_MOVE, DOWN_MOVE);
