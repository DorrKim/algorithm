const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
let rest = input.slice(1);
const TEST_CASES = [];

for (let i = 0; i < T; i++) {
  const [N, K] = rest[0].split(' ').map(Number);
  const costs = rest[1].split(' ').map(Number);
  const orders = rest.slice(2, 2 + K).map((order) => order.split(' ').map(Number));
  const W = +rest[K + 2];

  TEST_CASES.push({
    costs,
    orders,
    last: W
  });
  rest = rest.slice(K + 3);
}

function solution(TEST_CASES) {
  const result = TEST_CASES.map(getMinTime);

  console.log(result.join('\n'));
}

function getMinTime({ costs, orders, last }) {
  const adjacencyList = new Map();
  const adjacencyList2 = new Map();
  const indegrees = new Array(costs.length + 1).fill(0);
  const cache = [0, ...costs];

  orders.forEach(([head, tail]) => {
    if (!adjacencyList.has(head)) {
      adjacencyList.set(head, new Set());
    }

    if (!adjacencyList2.has(tail)) {
      adjacencyList2.set(tail, new Set());
    }

    adjacencyList.get(head).add(tail);
    adjacencyList2.get(tail).add(head);
  });

  for (let set of adjacencyList.values()) {
    set.forEach((el) => {
      indegrees[el] += 1;
    });
  }

  const stack = [];

  indegrees.forEach((count, index) => {
    if (index === 0) return;
    if (count === 0) {
      stack.push(index);
      cache[index] = costs[index - 1];
    }
  });

  for (let i = 0; i < costs.length; i++) {
    if (stack.length === 0) break;
    const node = stack.shift();

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((el) => {
      indegrees[el] -= 1;
      if (indegrees[el] === 0) {
        stack.push(el);
        const maxCost = Math.max(...[...adjacencyList2.get(el)].map((el) => cache[el]));
        cache[el] = Math.max(maxCost + costs[el - 1], cache[el]);
      }
    });
    adjacencyList.delete(node);
  }
  return cache[last];
}

solution(TEST_CASES);
