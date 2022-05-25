const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [V, E] = input[0].split(' ').map(Number);
const LINKS = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(V, E, LINKS) {
  const adjacencyList = new Map();
  LINKS.forEach(([start, end]) => {
    if (!adjacencyList.has(start - 1)) {
      adjacencyList.set(start - 1, new Set());
    }
    adjacencyList.get(start - 1).add(end - 1);
  });

  const dfsn = new Array(V).fill(0);
  const finished = new Array(V).fill(false);
  const stack = [];
  const SCC = [];
  const sccNumber = new Array(V).fill(0);
  let sn = 1;
  let count = 0;

  for (let i = 0; i < V; i++) {
    if (dfsn[i] === 0) dfs(i);
  }

  const result = SCC.sort((a, b) => a[0] - b[0])
    .map((unit) => {
      unit.push(-1);
      return unit.join(' ');
    })
    .join('\n');

  console.log(SCC.length);
  console.log(result);

  function dfs(current) {
    dfsn[current] = ++count;
    stack.push(current);

    let result = dfsn[current];

    if (adjacencyList.has(current)) {
      adjacencyList.get(current).forEach((nextNode) => {
        if (dfsn[nextNode] === 0) result = Math.min(result, dfs(nextNode));
        else if (!finished[nextNode]) result = Math.min(result, dfsn[nextNode]);
      });
    }

    if (result === dfsn[current]) {
      let currentSCC = [];

      while (true) {
        const top = stack.pop();

        currentSCC.push(top + 1);
        finished[top] = true;
        sccNumber[top] = sn;
        if (top === current) break;
      }
      currentSCC.sort((a, b) => a - b);
      SCC.push(currentSCC);
      sn++;
    }

    return result;
  }
}

solution(V, E, LINKS);
