const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const BUS_INFOS = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(N, M, BUS_INFOS) {
  const adjacencyList = new Map();
  const dist = new Array(N + 1).fill(Infinity);
  BUS_INFOS.forEach(([start, end, cost]) => {
    if (!adjacencyList.has(start)) {
      adjacencyList.set(start, new Map());
    }
    const targetNode = adjacencyList.get(start);
    if (!targetNode.has(end)) {
      targetNode.set(end, Infinity);
    }
    targetNode.set(end, Math.min(targetNode.get(end), cost));
  });

  dist[1] = 0;
  let minusCycle = false;
  for (let i = 0; i < N; i++) {
    for (let j = 1; j <= N; j++) {
      if (!adjacencyList.has(j)) continue;
      adjacencyList.get(j).forEach((cost, nextNode) => {
        if (dist[j] !== Infinity && dist[nextNode] > dist[j] + cost) {
          dist[nextNode] = dist[j] + cost;
          if (i === N - 1) minusCycle = true;
        }
      });
    }
  }

  if (minusCycle) {
    console.log(-1);
    return;
  }
  console.log(
    dist
      .slice(2)
      .map((el) => (el === Infinity ? -1 : el))
      .join('\n')
  );
}

solution(N, M, BUS_INFOS);
