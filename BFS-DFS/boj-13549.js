const [N, K] = require('fs').readFileSync('example.txt').toString().trim().split(' ').map(Number);

function solution(N, K) {
  const visit = new Array(100001).fill(false);
  const queue = [[N, 0]];
  visit[N] = true;
  let result = Infinity;

  while (queue.length) {
    const [pos, time] = queue.shift();

    if (pos === K) {
      result = time;
      break;
    }

    if (pos * 2 <= 10 ** 5 && !visit[pos * 2]) {
      visit[pos * 2] = true;
      queue.unshift([pos * 2, time]);
    }

    if (pos - 1 >= 0 && !visit[pos - 1]) {
      visit[pos - 1] = true;
      queue.push([pos - 1, time + 1]);
    }

    if (pos + 1 <= 10 ** 5 && !visit[pos + 1]) {
      visit[pos + 1] = true;
      queue.push([pos + 1, time + 1]);
    }
  }

  console.log(result);
}

solution(N, K);
