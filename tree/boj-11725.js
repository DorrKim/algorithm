const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1).map((link) => link.split(' ').map(Number));

function solution(N, LINKS) {
  const adjacentList = new Map();
  const visit = new Array(N + 1).fill(false);
  const parent = new Array(N + 1).fill(null);

  LINKS.forEach(([v1, v2]) => {
    if (!adjacentList.has(v1)) {
      adjacentList.set(v1, new Set());
    }

    if (!adjacentList.has(v2)) {
      adjacentList.set(v2, new Set());
    }

    adjacentList.get(v1).add(v2);
    adjacentList.get(v2).add(v1);
  });

  visit[1] = true;
  const stack = [1];

  while (stack.length) {
    const node = stack.pop();

    adjacentList.get(node).forEach((childNode) => {
      if (visit[childNode]) return;
      visit[childNode] = true;
      parent[childNode] = node;

      stack.push(childNode);
    });
  }

  console.log(parent.slice(2).join('\n'));
}

solution(N, LINKS);
