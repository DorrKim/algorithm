const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [V, E] = input[0].split(' ').map(Number);
const LINKS = input.slice(1).map((link) => link.split(' ').map(Number));

function solution(V, E, LINKS) {
  const ascendingWeightLinks = [...LINKS].sort((a, b) => a[2] - b[2]);
  const parents = new Array(V + 1).fill(null).map((_, i) => i);

  let count = 0;
  const totalWeight = ascendingWeightLinks.reduce((accWeight, currentLink) => {
    if (count === V - 1) return accWeight;
    const [v1, v2, w] = currentLink;

    const parent1 = find(parents, v1);
    const parent2 = find(parents, v2);
    if (parent1 === parent2) return accWeight;

    union(parents, v1, v2);
    count++;
    return accWeight + w;
  }, 0);

  console.log(totalWeight);
}

function find(parents, node) {
  if (node === parents[node]) return node;

  return (parents[node] = find(parents, parents[node]));
}

function union(parents, node1, node2) {
  const parent1 = find(parents, node1);
  const parent2 = find(parents, node2);
  if (parent1 === parent2) return;

  if (parent1 < parent2) {
    parents[parent2] = parent1;
  } else {
    parents[parent1] = parent2;
  }
}

solution(V, E, LINKS);
