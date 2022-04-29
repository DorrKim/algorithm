const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const orderInfo = input.slice(1).map((info) => info.split(' ').map(Number));

function solution(N, M, orderInfo) {
  const adjacencyList = new Map();
  const indegrees = new Array(N + 1).fill(0);
  orderInfo.forEach(([v1, v2]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Set());
    }
    adjacencyList.get(v1).add(v2);
  });

  for (let set of adjacencyList.values()) {
    set.forEach((el) => {
      indegrees[el] += 1;
    });
  }

  const queue = [];
  const result = [];

  indegrees.forEach((count, index) => {
    if (index === 0) return;
    if (count === 0) queue.push(index);
  });

  for (let i = 0; i < N; i++) {
    if (queue.length === 0) break;
    const node = queue.pop();
    result.push(node);

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((el) => {
      indegrees[el] -= 1;
      if (indegrees[el] === 0) {
        queue.push(el);
      }
    });
    adjacencyList.delete(node);
  }

  console.log(result.join(' '));
}

solution(N, M, orderInfo);
