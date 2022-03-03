const input = require('fs').readFileSync('example.txt').toString().split('\n');
const [N, M] = input[0].split(' ').map(Number);

const LINKS = input.slice(1).map((link) => link.split(' ').map(Number));

function solution(N, M, LINKS) {
  const dist = new Array(N + 1).fill(Infinity);
  let minusCycle = false;
  dist[1] = 0;

  for (let i = 1; i <= N - 1; i++) {
    for (j = 0; j < M; j++) {
      const [start, end, time] = LINKS[j];
      if (dist[start] === Infinity || dist[end] <= dist[start] + time) continue;
      dist[end] = dist[start] + time;
    }
  }

  for (j = 0; j < M; j++) {
    const [start, end, time] = LINKS[j];
    if (dist[end] > dist[start] + time) {
      minusCycle = true;
      break;
    }
  }

  console.log(
    minusCycle
      ? -1
      : dist
          .slice(2)
          .map((el) => (el === Infinity ? -1 : el))
          .join('\n')
  );
}

solution(N, M, LINKS);
