const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const infos = input.slice(1).map((el) => el.split(' ').map(Number));

function solution(N, M, infos) {
  const adjacencyList = new Map();
  const indegrees = new Array(N + 1).fill(0);
  infos.forEach((info) => {
    for (let i = 1; i < info.length; i++) {
      if (i < info.length - 1) {
        if (!adjacencyList.has(info[i])) {
          adjacencyList.set(info[i], new Set());
        }
        adjacencyList.get(info[i]).add(info[i + 1]);
      }
    }
  });

  [...adjacencyList.values()].forEach((set) => {
    set.forEach((el) => (indegrees[el] += 1));
  });

  const queue = [];
  indegrees.forEach((count, index) => {
    if (index === 0) return;
    if (count === 0) queue.push(index);
  });

  const result = [];
  let hasCycle = false;

  for (let i = 0; i < N; i++) {
    if (queue.length === 0) {
      hasCycle = true;
      break;
    }
    const node = queue.shift();
    result.push(node);

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((adjNode) => {
      indegrees[adjNode] -= 1;
      if (indegrees[adjNode] === 0) {
        queue.push(adjNode);
      }
    });
    adjacencyList.delete(node);
  }

  console.log(hasCycle ? 0 : result.join('\n'));
}

solution(N, M, infos);
