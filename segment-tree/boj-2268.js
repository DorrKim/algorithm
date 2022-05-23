const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const fns = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(N, M, fns) {
  const power = Math.ceil(Math.log2(N)) + 1;
  const size = 2 ** power;
  const tree = new Array(size).fill(0);
  const results = [];

  fns.forEach(([type, i, j]) => {
    if (type === 0) {
      const [left, right] = [Math.min(i, j), Math.max(i, j)];
      const result = sum(1, size / 2, 1, left, right);
      results.push(result);
    } else if (type === 1) {
      modify(i, j);
    }
  });

  console.log(results.join('\n'));

  function sum(start, end, node, left, right) {
    if (right < start || end < left) return 0;
    if (left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);

    return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
  }

  function modify(index, value) {
    let i = index + size / 2 - 1;
    tree[i] = value;

    while (i > 1) {
      i = Math.floor(i / 2);
      tree[i] = tree[i * 2] + tree[i * 2 + 1];
    }
  }
}

solution(N, M, fns);
