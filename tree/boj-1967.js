const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1).map((link) => link.split(' ').map(Number));

function solution(N, LINKS) {
  const adjacentList = new Map();
  const visit = new Array(N + 1);
  let farthestNodeFromRoot = null;
  let diameter = 0;

  LINKS.forEach(([v1, v2, weight]) => {
    if (!adjacentList.has(v1)) {
      adjacentList.set(v1, new Map());
    }
    adjacentList.get(v1).set(v2, weight);

    if (!adjacentList.has(v2)) {
      adjacentList.set(v2, new Map());
    }
    adjacentList.get(v2).set(v1, weight);
  });

  visit.fill(false);
  visit[1] = true;
  dfs(1, 0);

  visit.fill(false);
  visit[farthestNodeFromRoot] = true;
  dfs(farthestNodeFromRoot, 0);

  console.log(diameter);

  function dfs(node, currWeight) {
    if (diameter < currWeight) {
      diameter = currWeight;
      farthestNodeFromRoot = node;
    }

    if (!adjacentList.has(node)) return;

    adjacentList.get(node).forEach((weight, childNode) => {
      if (visit[childNode]) return;
      visit[childNode] = true;
      dfs(childNode, currWeight + weight);
    });
  }
}

solution(N, LINKS);
