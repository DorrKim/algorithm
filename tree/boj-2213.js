const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const weights = input[1].split(' ').map(Number);
const edges = input.slice(2).map((edge) => edge.split(' ').map(Number));

function solution(N, weights, edges) {
  const adjcentList = getAdjacentList(edges);
  const visit = new Array(N + 1).fill(false);

  const [notContainRoot, containRoot] = dfs(1);

  if (containRoot[0] > notContainRoot[0]) {
    console.log(containRoot[0]);
    console.log(containRoot[1].sort((a, b) => a - b).join(' '));
  } else {
    console.log(notContainRoot[0]);
    console.log(notContainRoot[1].sort((a, b) => a - b).join(' '));
  }

  function dfs(node) {
    visit[node] = true;
    const notContainNodes = [];
    const containNodes = [node];
    let notContainWeight = 0;
    let containWeight = weights[node - 1];

    if (!adjcentList.has(node))
      return [
        [0, []],
        [0, []]
      ];

    [...adjcentList.get(node)]
      .filter((v2) => !visit[v2])
      .forEach((child) => {
        const [[notContainChildWeight, notContainChildNodes], [containChildWeight, containChildNodes]] = dfs(child);
        containWeight += notContainChildWeight;

        notContainChildNodes.forEach((el) => {
          containNodes.push(el);
        });

        if (containChildWeight > notContainChildWeight) {
          notContainWeight += containChildWeight;
          containChildNodes.forEach((el) => {
            notContainNodes.push(el);
          });
        } else {
          notContainWeight += notContainChildWeight;
          notContainChildNodes.forEach((el) => {
            notContainNodes.push(el);
          });
        }
      });

    return [
      [notContainWeight, notContainNodes],
      [containWeight, containNodes]
    ];
  }
}

function getAdjacentList(edges) {
  const adjcentList = new Map();
  edges.forEach(([v1, v2]) => {
    if (!adjcentList.has(v1)) {
      adjcentList.set(v1, new Set());
    }

    if (!adjcentList.has(v2)) {
      adjcentList.set(v2, new Set());
    }

    adjcentList.get(v1).add(v2);
    adjcentList.get(v2).add(v1);
  });

  return adjcentList;
}

solution(N, weights, edges);
