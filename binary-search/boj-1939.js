const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const [START, END] = input.pop().split(' ').map(Number);
const BRIDGES = input.slice(1).map((bridge) => bridge.split(' ').map(Number));

function solution(N, M, START, END, BRIDGES) {
  const visit = new Array(N + 1).fill(false);
  const adjList = new Map();
  let lb = Infinity;
  let ub = 0;

  for (let i = 1; i <= N; i++) {
    adjList.set(i, new Map());
  }

  for (let i = 0; i < M; i++) {
    const [v1, v2, limit] = BRIDGES[i];
    lb = Math.min(lb, limit);
    ub = Math.max(ub, limit + 1);

    if (adjList.get(v1).has(v2)) {
      const linkMaxLimit = adjList.get(v1).get(v2);
      adjList.get(v1).set(v2, Math.max(linkMaxLimit, limit));
    } else {
      adjList.get(v1).set(v2, limit);
    }

    if (adjList.get(v2).has(v1)) {
      const linkMaxLimit = adjList.get(v2).get(v1);
      adjList.get(v2).set(v1, Math.max(linkMaxLimit, limit));
    } else {
      adjList.get(v2).set(v1, limit);
    }
  }

  while (lb < ub - 1) {
    visit.fill(false);
    const mid = Math.floor((lb + ub) / 2);
    const queue = [START];
    visit[START] = true;

    let leachToEnd = false;

    while (queue.length) {
      const prev = queue.shift();

      if (prev === END) {
        leachToEnd = true;
        break;
      }

      [...adjList.get(prev).entries()].forEach(([next, limit]) => {
        if (visit[next] || limit < mid) return;
        queue.push(next);
        visit[next] = true;
      });
    }

    if (leachToEnd) {
      lb = mid;
    } else {
      ub = mid;
    }
  }

  console.log(lb);
}

solution(N, M, START, END, BRIDGES);
