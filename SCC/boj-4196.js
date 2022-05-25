const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
let rest = input.slice(1);
const testCases = [];

for (let i = 0; i < T; i++) {
  const [N, M] = rest[0].split(' ').map(Number);
  const infos = rest.slice(1, 1 + M).map((line) => line.split(' ').map(Number));

  testCases.push([N, infos]);
  rest = rest.slice(M + 1);
}

function solution(testCases) {
  testCases.map(getMinDomino);
}

function getMinDomino(testCase) {
  const [N, infos] = testCase;
  const adjacencyList = getAdjacencyList(infos);
  const dfsn = new Array(N + 1).fill(0);
  const finish = new Array(N + 1).fill(false);
  const sccNumbers = new Array(N + 1).fill(0);
  const stack = [];

  let sccNumber = 1;
  let count = 1;

  for (let i = 1; i <= N; i++) {
    if (dfsn[i] === 0) DFS(i);
  }

  const inDegreeMap = new Array(sccNumber).fill(0);
  for (let i = 1; i <= N; i++) {
    if (!adjacencyList.has(i)) continue;
    adjacencyList.get(i).forEach((next) => {
      if (sccNumbers[i] !== sccNumbers[next]) {
        inDegreeMap[sccNumbers[next]] += 1;
      }
    });
  }
  console.log(inDegreeMap.filter((el) => el === 0).length - 1);

  function DFS(current) {
    dfsn[current] = count++;
    stack.push(current);

    let result = dfsn[current];

    if (adjacencyList.has(current)) {
      adjacencyList.get(current).forEach((next) => {
        if (dfsn[next] === 0) {
          result = Math.min(result, DFS(next));
        } else if (!finish[next]) result = Math.min(result, dfsn[next]);
      });
    }

    if (result === dfsn[current]) {
      const currentSCC = [];

      while (true) {
        const top = stack.pop();
        currentSCC.push(top);
        finish[top] = true;
        sccNumbers[top] = sccNumber;
        if (top === current) break;
      }

      sccNumber++;
    }

    return result;
  }
}

function getAdjacencyList(infos) {
  const adjacencyList = new Map();
  infos.forEach(([start, end]) => {
    if (!adjacencyList.has(start)) {
      adjacencyList.set(start, new Set());
    }

    adjacencyList.get(start).add(end);
  });

  return adjacencyList;
}

solution(testCases);
