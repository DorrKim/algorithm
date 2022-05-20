const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1, N).map((link) => link.split(' ').map(Number));
const M = +input[N];
const pairNodes = input.slice(N + 1).map((line) => line.split(' ').map(Number));

function solution(N, LINKS, pairNodes) {
  const MAX_D = Math.floor(Math.log2(N - 1));
  const depths = new Array(N + 1).fill(0);
  const adjacencyList = new Map();
  const visit = new Array(N + 1).fill(false);
  const next = new Array(N + 1).fill(null).map(() => new Array(MAX_D + 1).fill(0));

  LINKS.forEach(([v1, v2]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Set());
    }

    if (!adjacencyList.has(v2)) {
      adjacencyList.set(v2, new Set());
    }

    adjacencyList.get(v1).add(v2);
    adjacencyList.get(v2).add(v1);
  });

  const stack = [[1, 0]];

  while (stack.length) {
    const [node, depth] = stack.pop();
    visit[node] = true;
    depths[node] = depth;
    if (!adjacencyList.has(node)) continue;

    adjacencyList.get(node).forEach((nextNode) => {
      if (visit[nextNode]) return;
      stack.push([nextNode, depth + 1]);

      next[nextNode][0] = node;
    });
  }

  for (let j = 1; j <= MAX_D; j++) {
    for (let i = 1; i <= N; i++) {
      next[i][j] = next[next[i][j - 1]][j - 1];
    }
  }

  const result = pairNodes.map(([node1, node2]) => {
    let u = node1;
    let v = node2;

    if (depths[u] < depths[v]) [u, v] = [v, u];
    let diff = depths[u] - depths[v];
    let i = 0;
    while (diff) {
      if (diff % 2) u = next[u][i];
      diff = Math.floor(diff / 2);
      i++;
    }

    if (u !== v) {
      for (let j = MAX_D; j >= 0; j--) {
        if (next[u][j] !== 0 && next[u][j] !== next[v][j]) {
          u = next[u][j];
          v = next[v][j];
        }
      }
      u = next[u][0];
      v = next[v][0];
    }

    return u;
  });

  console.log(result.join('\n'));
}

solution(N, LINKS, pairNodes);
