const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M, K] = input[0].split(' ').map(Number);
const numbers = input.slice(1, 1 + N).map(BigInt);
const queries = input.slice(1 + N).map((line) => line.split(' ').map(Number));

function solution(N, M, K, numbers, queries) {
  const segmentTree = [0n];
  _init(0, N - 1, 1);
  const result = [];

  queries.forEach(([a, b, c]) => {
    if (a === 1) {
      _update(0, N - 1, 1, b - 1, -numbers[b - 1] + BigInt(c));
      numbers[b - 1] = BigInt(c);
    } else if (a === 2) {
      const sum = _sum(0, N - 1, 1, b - 1, c - 1);
      result.push(sum);
    }
  });

  console.log(result.join('\n'));

  function _init(start, end, node) {
    if (start === end) return (segmentTree[node] = BigInt(numbers[start]));
    const mid = Math.floor((start + end) / 2);

    return (segmentTree[node] = _init(start, mid, node * 2) + _init(mid + 1, end, node * 2 + 1));
  }

  function _sum(start, end, node, left, right) {
    if (right < start || end < left) return 0n;
    if (left <= start && end <= right) return segmentTree[node];
    const mid = Math.floor((start + end) / 2);

    return _sum(start, mid, node * 2, left, right) + _sum(mid + 1, end, node * 2 + 1, left, right);
  }

  function _update(start, end, node, index, diff) {
    if (index < start || index > end) return;
    segmentTree[node] += diff;
    if (start === end) return;

    const mid = Math.floor((start + end) / 2);
    _update(start, mid, node * 2, index, diff);
    _update(mid + 1, end, node * 2 + 1, index, diff);
  }
}

solution(N, M, K, numbers, queries);
