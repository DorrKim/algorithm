const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
const testCases = [];
let rest = input.slice(1);

for (let i = 0; i < T; i++) {
  const [N, M] = rest[0].split(' ').map(Number);
  const links = rest.slice(1, 1 + M).map((line) => line.split(' ').map(Number));
  testCases.push([N, links]);

  rest = rest.slice(M + 2);
}

function solution(testCases) {
  const result = testCases.map(getStartPoint).join('\n\n');
  console.log(result);
}

function getStartPoint(testCase) {
  const [n, links] = testCase;
  const adjacencyList = getAdjacencyList(links);
  const dfsn = new Array(n).fill(0);
  const finish = new Array(n).fill(false);
  const sccIndex = new Array(n).fill(0);
  const SCC = [];
  const stack = [];
  let sccNumber = 0;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (dfsn[i] === 0) DFS(i);
  }

  const indegree = new Array(sccNumber).fill(0);
  const indegreeMap = new Map();

  for (let i = 0; i < n; i++) {
    if (adjacencyList.has(i)) {
      adjacencyList.get(i).forEach((next) => {
        if (sccIndex[i] !== sccIndex[next]) {
          indegree[sccIndex[next]] += 1;

          if (!indegreeMap.has(sccIndex[next])) {
            indegreeMap.set(sccIndex[next], new Set());
          }
          indegreeMap.get(sccIndex[next]).add(sccIndex[i]);
        }
      });
    }
  }

  const result = SCC.filter((_, index) => indegree[index] === 0);

  return result.length === 1 ? result[0].sort((a, b) => a - b).join('\n') : 'Confused';

  function DFS(current) {
    dfsn[current] = ++count;
    stack.push(current);

    let result = dfsn[current];
    if (adjacencyList.has(current)) {
      adjacencyList.get(current).forEach((next) => {
        if (dfsn[next] === 0) result = Math.min(result, DFS(next));
        else if (!finish[next]) result = Math.min(result, dfsn[next]);
      });
    }

    if (result === dfsn[current]) {
      const currentSCC = [];

      while (true) {
        const pop = stack.pop();
        currentSCC.push(pop);
        finish[pop] = true;
        sccIndex[pop] = sccNumber;
        if (pop === current) break;
      }
      SCC.push(currentSCC);
      sccNumber++;
    }
    return result;
  }
}

function getAdjacencyList(links) {
  const adjacencyList = new Map();
  links.forEach(([start, end]) => {
    if (!adjacencyList.has(start)) {
      adjacencyList.set(start, new Set());
    }

    adjacencyList.get(start).add(end);
  });

  return adjacencyList;
}

solution(testCases);
