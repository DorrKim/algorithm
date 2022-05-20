const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const energy = input.slice(1, N + 1).map(Number);
const links = input.slice(N + 1).map((line) => line.split(' ').map(Number));

function solution(N, energy, links) {
  const MAX_DEPTH = Math.floor(Math.log2(N));
  const [next, dist] = getSparseTable(N, MAX_DEPTH, links);

  const result = energy.map((e, index) => {
    let n = e;
    let x = index + 1;

    for (let i = MAX_DEPTH - 1; i >= 0; i--) {
      if (x === 1 || n === 0) break;
      if (n >= dist[x][i]) {
        n -= dist[x][i];
        x = next[x][i];
      }
    }

    return x;
  });

  console.log(result.join('\n'));
}

function getSparseTable(N, MAX_DEPTH, links) {
  const adjacencyList = new Map();
  const visit = new Array(N + 1).fill(false);
  const next = new Array(N + 1).fill(null).map(() => new Array(MAX_DEPTH).fill(0));
  const dist = new Array(N + 1).fill(null).map(() => new Array(MAX_DEPTH).fill(Infinity));

  links.forEach(([v1, v2, distance]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Map());
    }

    if (!adjacencyList.has(v2)) {
      adjacencyList.set(v2, new Map());
    }

    adjacencyList.get(v1).set(v2, distance);
    adjacencyList.get(v2).set(v1, distance);
  });

  const stack = [1];

  while (stack.length) {
    const node = stack.pop();
    visit[node] = true;

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((distance, nextNode) => {
      if (visit[nextNode]) return;
      next[nextNode][0] = node;
      dist[nextNode][0] = distance;
      stack.push(nextNode);
    });
  }
  for (let j = 1; j < MAX_DEPTH; j++) {
    for (let i = 1; i <= N; i++) {
      next[i][j] = next[next[i][j - 1]][j - 1];
      dist[i][j] = dist[next[i][j - 1]][j - 1] + dist[i][j - 1];
    }
  }

  return [next, dist];
}

solution(N, energy, links);
