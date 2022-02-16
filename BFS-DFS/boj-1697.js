const [start, end] = require('fs').readFileSync('dev/stdin').toString().trim().split(' ').map(Number);

function solution(START, END) {
  const queue = [[START, 0]];
  const visited = new Array(100000).fill(false);
  let result = 0;
  let queuePointer = 0;

  while (queuePointer < queue.length) {
    const [currentPos, time] = queue[queuePointer++];

    if (visited[currentPos]) continue;

    visited[currentPos] = true;

    if (currentPos === END) {
      result = time;
      break;
    }

    if (currentPos - 1 >= 0 && !visited[currentPos - 1]) {
      queue.push([currentPos - 1, time + 1]);
    }

    if (currentPos + 1 <= 100000 && !visited[currentPos + 1]) {
      queue.push([currentPos + 1, time + 1]);
    }

    if (currentPos * 2 <= 100000 && !visited[currentPos * 2]) {
      queue.push([currentPos * 2, time + 1]);
    }
  }
  console.log(result);
}

solution(start, end);
