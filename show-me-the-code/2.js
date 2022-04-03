const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, Q] = input[0].split(' ').map(Number);
const NUMBERS = input[1].split(' ').map(Number);
const LINKS = input.slice(2, 1 + N).map((link) => link.split(' ').map(Number));
const PLAYINFOS = input.slice(1 + N).map((link) => link.split(' ').map(Number));

function solution(N, Q, NUMBERS, LINKS, PLAYINFOS) {
  const adjacentList = new Map();
  const visit = new Array(N + 1);

  LINKS.forEach(([v1, v2]) => {
    if (!adjacentList.has(v1)) {
      adjacentList.set(v1, new Set());
    }
    adjacentList.get(v1).add(v2);

    if (!adjacentList.has(v2)) {
      adjacentList.set(v2, new Set());
    }
    adjacentList.get(v2).add(v1);
  });

  const playResults = PLAYINFOS.map(([start, end]) => {
    visit.fill(false);
    visit[start] = true;
    const startNumber = NUMBERS[start - 1];
    return recursion(start, end, `${startNumber}`);
  });

  const dividedResults = playResults.map((result) => (BigInt(result) % 1000000007n).toString());

  console.log(dividedResults.join('\n'));

  function recursion(currentNode, endNode, playResult) {
    if (!adjacentList.has(currentNode)) return;
    if (currentNode === endNode) {
      return playResult;
    }
    let result;

    adjacentList.get(currentNode).forEach((node) => {
      if (visit[node]) return;
      visit[node] = true;

      const recursionResult = recursion(node, endNode, `${playResult}${NUMBERS[node - 1]}`);
      if (recursionResult === undefined) return;
      result = recursionResult;
    });
    return result;
  }
}

solution(N, Q, NUMBERS, LINKS, PLAYINFOS);
