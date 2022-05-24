const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, Q] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const query = input.slice(2, Q + 2).map((line) => line.split(' ').map(Number));

function solution(N, Q, arr, query) {
  const power = Math.ceil(Math.log2(N)) + 1;
  const size = 2 ** power;

  const tree = new Array(size).fill(0);

  init();

  const result = query.map(([x, y, a, b]) => {
    const result = sum(1, size / 2, 1, Math.min(x, y), Math.max(x, y));

    update(a, b);

    return result;
  });
  console.log(result.join('\n'));

  function init() {
    for (let i = 0; i < N; i++) {
      tree[size / 2 + i] = arr[i];
    }

    for (let i = size / 2 - 1; i > 0; i--) {
      tree[i] = tree[i * 2] + tree[i * 2 + 1];
    }
  }

  function sum(start, end, node, left, right) {
    if (end < left || right < start) return 0;
    if (left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);

    return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
  }

  function update(index, value) {
    let i = size / 2 + index - 1;
    tree[i] = value;

    while (i > 1) {
      i = Math.floor(i / 2);
      tree[i] = tree[i * 2] + tree[i * 2 + 1];
    }
  }
}

solution(N, Q, arr, query);
