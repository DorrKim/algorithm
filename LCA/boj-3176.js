const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1, N).map((link) => link.split(' ').map(Number));
const M = +input[N];
const pairNodes = input.slice(N + 1).map((line) => line.split(' ').map(Number));

function solution(N, LINKS, pairNodes) {
  const MAX_D = Math.floor(Math.log2(N - 1));
  const adjacencyList = new Map();
  const parents = new Array(N + 1).fill(null).map(() => new Array(MAX_D + 1).fill(-1));
  const minDistTable = new Array(N + 1).fill(null).map(() => new Array(MAX_D + 1).fill(Infinity));
  const maxDistTable = new Array(N + 1).fill(null).map(() => new Array(MAX_D + 1).fill(0));
  const depthList = new Array(N + 1).fill(0);
  const visit = new Array(N + 1).fill(false);

  LINKS.forEach(([v1, v2, dist]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Map());
    }

    if (!adjacencyList.has(v2)) {
      adjacencyList.set(v2, new Map());
    }

    adjacencyList.get(v1).set(v2, dist);
    adjacencyList.get(v2).set(v1, dist);
  });

  const stack = [[1, 0]];

  while (stack.length) {
    const [node, d] = stack.pop();
    visit[node] = true;
    depthList[node] = d;

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((dist, nextNode) => {
      if (visit[nextNode]) return;
      parents[nextNode][0] = node;
      minDistTable[nextNode][0] = dist;
      maxDistTable[nextNode][0] = dist;
      stack.push([nextNode, d + 1]);
    });
  }

  for (let j = 1; j <= MAX_D; j++) {
    for (let i = 1; i <= N; i++) {
      if (parents[i][j - 1] === -1) continue;
      parents[i][j] = parents[parents[i][j - 1]][j - 1];
      minDistTable[i][j] = Math.min(minDistTable[parents[i][j - 1]][j - 1], minDistTable[i][j - 1]);
      maxDistTable[i][j] = Math.max(maxDistTable[parents[i][j - 1]][j - 1], maxDistTable[i][j - 1]);
    }
  }

  const result = pairNodes.map(([node1, node2]) => {
    let u = node1;
    let v = node2;
    let minDist = Infinity;
    let maxDist = 0;

    if (depthList[u] < depthList[v]) {
      [u, v] = [v, u];
    }
    let diff = depthList[u] - depthList[v];
    let i = 0;

    while (diff) {
      if (diff % 2) {
        minDist = Math.min(minDist, minDistTable[u][i]);
        maxDist = Math.max(maxDist, maxDistTable[u][i]);
        u = parents[u][i];
      }
      diff = Math.floor(diff / 2);
      i++;
    }
    // console.log(111, minDist, maxDist);
    if (u !== v) {
      for (let j = MAX_D; j >= 0; j--) {
        if (parents[u][j] !== -1 && parents[u][j] !== parents[v][j]) {
          minDist = Math.min(minDist, minDistTable[u][j], minDistTable[v][j]);
          maxDist = Math.max(maxDist, maxDistTable[u][j], maxDistTable[v][j]);
          u = parents[u][j];
          v = parents[v][j];
        }
      }
      minDist = Math.min(minDist, minDistTable[u][0], minDistTable[v][0]);
      maxDist = Math.max(maxDist, maxDistTable[u][0], maxDistTable[v][0]);
      u = parents[u][0];
      v = parents[v][0];
    }

    return `${minDist} ${maxDist}`;
  });

  console.log(result.join('\n'));
}

solution(N, LINKS, pairNodes);
