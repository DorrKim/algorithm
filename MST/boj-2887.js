const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const postions = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, postions) {
  const costs = [];
  const parents = new Array(N).fill(null).map((_, i) => i);
  let countEdge = 0;
  let totalCost = 0;
  const indexedPositions = postions.map((el, index) => [el, index]);

  for (let i = 0; i < 3; i++) {
    indexedPositions.sort((a, b) => a[0][i] - b[0][i]);

    for (let j = 0; j < N - 1; j++) {
      const cost = getCost(indexedPositions[j][0], indexedPositions[j + 1][0]);
      costs.push([indexedPositions[j][1], indexedPositions[j + 1][1], cost]);
    }
  }

  costs.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < costs.length; i++) {
    if (countEdge === N - 1) break;
    const [v1, v2, cost] = costs[i];

    if (find(parents, v1) === find(parents, v2)) continue;

    union(parents, v1, v2);
    totalCost += cost;
    countEdge++;
  }
  console.log(totalCost);
}

function find(parents, node) {
  if (node === parents[node]) return node;

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

function getCost(postion1, postion2) {
  const [x1, y1, z1] = postion1;
  const [x2, y2, z2] = postion2;

  return Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
}

solution(N, postions);
