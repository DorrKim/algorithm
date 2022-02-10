const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const countTestCase = +input[0];
const testCases = [];

let start = 1;

for (let i = 0; i < countTestCase; i++) {
  const [countNode, countLink] = input[start].split(' ');
  const testCase = [countNode];
  testCase.push(input.slice(start + 1, start + +countLink + 1));
  testCases.push(testCase);

  start += +countLink + 1;
}

function solution(testCases) {
  const result = testCases.map(getResultByCase).join('\n').trim();
  console.log(result);
}

function getResultByCase(testCase) {
  const countNode = +testCase[0];
  const links = testCase[1];
  let result = 'YES';

  const adjList = new Map();
  for (let i = 1; i <= countNode; i++) {
    adjList.set(`${i}`, new Set());
  }

  links.forEach((link) => {
    const [node1, node2] = link.split(' ');
    const adjNodes1 = adjList.get(node1);
    adjNodes1.add(node2);
    const adjNodes2 = adjList.get(node2);
    adjNodes2.add(node1);
  });

  for (let i = 1; i < countNode; i++) {
    const visit = new Array(countNode + 1).fill(null);
    const queue = [];
    let queuePointer = 0;
    let nodeResult = 'YES';

    queue.push([`${i}`, 1]);
    visit[i] = 1;

    while (queuePointer < queue.length) {
      const [currNode, color] = queue[queuePointer++];
      if (visit[currNode] !== color) {
        return (nodeResult = 'NO');
      }

      const nextColor = -color;

      const nextNodes = adjList.get(currNode);

      for (let nextNode of nextNodes) {
        if (visit[nextNode] && visit[nextNode] === nextColor) continue;

        queue.push([nextNode, nextColor]);
        if (visit[nextNode] === null) visit[nextNode] = nextColor;
      }
    }
    if (nodeResult === 'NO') return nodeResult;
  }

  return result;
}

solution(testCases);
