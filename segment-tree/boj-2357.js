const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const numbers = input.slice(1, 1 + N).map(Number);
const queries = input.slice(1 + N).map((line) => line.split(' ').map(Number));

function solution(N, numbers, queries) {
  const size = 2 ** (Math.ceil(Math.log2(N)) + 1);
  const maxTree = new Array(size).fill(0);
  const minTree = new Array(size).fill(Infinity);

  _init();

  const result = queries.map(([b, c]) => {
    const [left, right] = b < c ? [b, c] : [c, b];

    return _getMinMax(1, size / 2, 1, left, right).join(' ');
  });

  console.log(result.join('\n'));

  function _init() {
    for (let i = 0; i < N; i++) {
      maxTree[size / 2 + i] = numbers[i];
      minTree[size / 2 + i] = numbers[i];
    }

    for (let i = size / 2 - 1; i >= 1; i--) {
      maxTree[i] = Math.max(maxTree[i * 2], maxTree[i * 2 + 1]);
      minTree[i] = Math.min(minTree[i * 2], minTree[i * 2 + 1]);
    }
  }

  function _getMinMax(start, end, node, left, right) {
    if (right < start || end < left) return [Infinity, 0];
    if (left <= start && end <= right) return [minTree[node], maxTree[node]];
    const mid = Math.floor((start + end) / 2);

    const [leftMin, leftMax] = _getMinMax(start, mid, node * 2, left, right);
    const [rightMin, rightMax] = _getMinMax(mid + 1, end, node * 2 + 1, left, right);

    return [Math.min(leftMin, rightMin), Math.max(leftMax, rightMax)];
  }
}

solution(N, numbers, queries);
