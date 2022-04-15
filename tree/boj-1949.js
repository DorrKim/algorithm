const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const POPULATIONS = input[1].split(' ').map(Number);
const EDGES = input.slice(2).map((edge) => edge.split(' ').map(Number));

function solution(N, POPULATIONS, EDGES) {
  const adjacentList = getAdjacentList(EDGES);
  const visit = new Array(N + 1).fill(false);

  visit[1] = true;
  console.log(Math.max(...dfs(1)));

  function dfs(node) {
    if (!adjacentList.has(node)) return [0, 0];
    let contain = POPULATIONS[node - 1];
    let notContain = 0;

    const adjacentNodes = adjacentList.get(node);

    for (let child of adjacentNodes) {
      if (visit[child]) continue;
      visit[child] = true;
      const [containChild, notContainChild] = dfs(child);

      contain += notContainChild;
      notContain += Math.max(containChild, notContainChild);
    }
    return [contain, notContain];
  }
}

function getAdjacentList(EDGES) {
  const adjacentList = new Map();

  EDGES.forEach(([v1, v2]) => {
    if (!adjacentList.has(v1)) {
      adjacentList.set(v1, new Set());
    }

    if (!adjacentList.has(v2)) {
      adjacentList.set(v2, new Set());
    }

    adjacentList.get(v1).add(v2);
    adjacentList.get(v2).add(v1);
  });

  return adjacentList;
}

solution(N, POPULATIONS, EDGES);
