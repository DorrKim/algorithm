const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
let rest = input.slice(1);
const testCases = [];

for (let i = 0; i < T; i++) {
  const [N, K] = rest[0].split(' ').map(Number);
  const accidents = rest.slice(1, 1 + K).map((line) => line.split(' ').map(Number));
  testCases.push([N, K, accidents]);
  rest = rest.slice(1 + K);
}

function solution(testCases) {
  const result = testCases.map(validateDVD).join('\n');
  console.log(result);
}

function validateDVD(testCase) {
  const [N, K, accidents] = testCase;
  const upperPower = Math.ceil(Math.log2(N)) + 1;
  const size = 2 ** upperPower;
  const tree = new Array(size).fill([Infinity, 0]);
  const results = [];
  _init();

  accidents.forEach(([command, left, right]) => {
    if (command === 1) {
      const [min, max] = getDVD(left, right, 1, 0, size / 2 - 1);
      results.push(min === left && max === right ? 'YES' : 'NO');
    } else if (command === 0) {
      change(left, right);
    }
  });

  return results.join('\n');

  function _init() {
    for (let i = 0; i < N; i++) {
      tree[i + size / 2] = [i, i];
    }

    for (let i = size / 2 - 1; i > 0; i--) {
      const [leftMin, leftMax] = tree[i * 2];
      const [rightMin, rightMax] = tree[i * 2 + 1];
      tree[i] = [Math.min(leftMin, rightMin), Math.max(leftMax, rightMax)];
    }
  }

  function getDVD(gLeft, gRight, nodeNumber, nodeLeft, nodeRight) {
    if (nodeRight < gLeft || gRight < nodeLeft) return [Infinity, 0];
    if (gLeft <= nodeLeft && nodeRight <= gRight) return tree[nodeNumber].slice();
    const mid = Math.floor((nodeLeft + nodeRight) / 2);

    const [min1, max1] = getDVD(gLeft, gRight, nodeNumber * 2, nodeLeft, mid);
    const [min2, max2] = getDVD(gLeft, gRight, nodeNumber * 2 + 1, mid + 1, nodeRight);

    return [Math.min(min1, min2), Math.max(max1, max2)];
  }

  function change(node1, node2) {
    const index1 = node1 + size / 2;
    const index2 = node2 + size / 2;

    const value1 = tree[index1].slice();
    const value2 = tree[index2].slice();

    update(index1, value2);
    update(index2, value1);
  }

  function update(index, value) {
    tree[index] = [...value];
    let i = index;
    while (i > 1) {
      i = Math.floor(i / 2);

      const [leftMin, leftMax] = tree[i * 2];
      const [rightMin, rightMax] = tree[i * 2 + 1];
      tree[i] = [Math.min(leftMin, rightMin), Math.max(leftMax, rightMax)];
    }
  }
}

solution(testCases);
