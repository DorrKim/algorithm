const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const postions = input.slice(1, N + 1).map((line) => line.split(' ').map(Number));
const connectedPaths = input.slice(N + 1).map((path) => path.split(' ').map(Number));

function solution(N, M, postions, connectedPaths) {
  const parents = new Array(N + 1).fill(null).map((_, i) => i);
  const dists = [];
  let minDist = 0;
  let countEdge = 0;

  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      const dist = calculateDistance(postions[i], postions[j]);
      dists.push([i + 1, j + 1, dist]);
    }
  }

  dists.sort((a, b) => a[2] - b[2]);

  connectedPaths.forEach(([v1, v2]) => {
    if (countEdge === N - 1) return;
    if (v1 === v2) return;

    const parent1 = find(parents, v1);
    const parent2 = find(parents, v2);

    if (parent1 === parent2) return;

    union(parents, v1, v2);

    countEdge++;
  });

  for (let i = 0; i < dists.length; i++) {
    if (countEdge === N - 1) break;
    const [v1, v2, dist] = dists[i];
    if (v1 === v2) continue;

    const parent1 = find(parents, v1);
    const parent2 = find(parents, v2);

    if (parent1 === parent2) continue;

    union(parents, v1, v2);
    minDist += dist;
  }
  console.log(minDist.toFixed(2));
}

function calculateDistance([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
}

function find(parents, node) {
  if (parents[node] === node) return node;

  return (parents[node] = find(parents, parents[node]));
}

function union(parents, node1, node2) {
  const parent1 = find(parents, node1);
  const parent2 = find(parents, node2);

  if (parent1 === parent2) return false;

  if (parent1 < parent2) {
    parents[parent2] = parent1;
  } else {
    parents[parent1] = parent2;
  }

  return true;
}

solution(N, M, postions, connectedPaths);
