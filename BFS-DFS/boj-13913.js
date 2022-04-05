const [N, K] = require('fs').readFileSync('dev/stdin').toString().trim().split(' ').map(Number);

function solution(N, K) {
  const visit = new Array(500001).fill(null).map(() => [false, -1]);

  const queue = [[N, 0]];
  visit[N] = [true, -1];
  let pointer = 0;
  let minTime = Number.MAX_SAFE_INTEGER;

  while (pointer < queue.length) {
    const [pos, time] = queue[pointer++];

    if (pos === K) {
      minTime = time;
      break;
    }
    const dx = [1, -1, pos];

    for (let i = 0; i < 3; i++) {
      const nx = pos + dx[i];
      if (nx < 0 || nx > 500000 || visit[nx][0]) continue;
      visit[nx] = [true, pos];

      queue.push([nx, time + 1]);
    }
  }

  let lastPos = K;
  let result = [];
  while (lastPos !== -1) {
    result.push(lastPos);
    lastPos = visit[lastPos][1];
  }

  console.log(minTime);
  console.log(result.reverse().join(' '));
}

solution(N, K);
