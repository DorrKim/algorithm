const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const N = +input[0];
const EDGES = input.slice(1).map((edge) => edge.split(' ').map(Number));

function solution(N, EDGES) {
  const adjacentList = getAdjacentList(EDGES);
  const visit = new Array(N + 1).fill(false);

  const START = Math.floor(N / 2);
  visit[START] = true;
  console.log(Math.min(...dfs(START)));

  function dfs(node) {
    let contain = 1;
    let notCotain = 0;

    if (!adjacentList.has(node)) return [0, 0];

    for (let child of adjacentList.get(node)) {
      if (visit[child]) continue;
      visit[child] = true;
      const [containChild, notContainChild] = dfs(child);

      contain += Math.min(containChild, notContainChild);
      notCotain += containChild;
    }

    return [contain, notCotain];
  }
}

function getAdjacentList(edges) {
  const adjacentList = new Map();

  edges.forEach(([v1, v2]) => {
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

solution(N, EDGES);
