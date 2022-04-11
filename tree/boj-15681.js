const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, R, Q] = input[0].split(' ').map(Number);
const LINKS = input.slice(1, N).map((link) => link.split(' ').map(Number));
const nodes = input.slice(N).map(Number);

function solution(R, LINKS, nodes) {
  const adjacentList = new Map();
  const visit = new Array(LINKS.length + 2).fill(false);
  const counts = new Array(LINKS.length + 2).fill(0);

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

  dfs(R);

  const result = nodes.map((node) => counts[node]).join('\n');
  console.log(result);

  function dfs(node) {
    visit[node] = true;
    if (!adjacentList.has(node)) return 1;

    const countSubTreeNodes = [...adjacentList.get(node)].reduce((count, child) => {
      if (visit[child]) return count;

      return count + dfs(child);
    }, 0);

    return (counts[node] = countSubTreeNodes + 1);
  }
}

solution(R, LINKS, nodes);
