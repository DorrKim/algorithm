const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1).map((link) => link.split(' ').map(Number));

function solution(N, LINKS) {
  const parents = new Array(N).fill(null).map((_, i) => i);
  const costs = [];
  let count = 0;
  let totalCost = 0;

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const cost = getDistacne(LINKS[i], LINKS[j]);
      costs.push([i, j, cost]);
    }
  }

  costs.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < costs.length; i++) {
    if (count === N - 1) break;
    const [node1, node2, cost] = costs[i];

    const isUnioned = union(parents, node1, node2);

    if (isUnioned) {
      count++;
      totalCost += cost;
    }
  }
  console.log(totalCost.toFixed(2));
}

function getDistacne([x1, y1], [x2, y2]) {
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

solution(N, LINKS);
