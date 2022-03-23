const KEYS = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(KEYS) {
  let postOrder = [];

  getRoot(KEYS);

  console.log(postOrder.join('\n'));

  function getRoot(preOrder) {
    if (preOrder.length === 0) return;
    const root = preOrder[0];

    const rightChildIndex = preOrder.findIndex((number) => number > root);

    const leftPreOrder = rightChildIndex === -1 ? preOrder.slice(1) : preOrder.slice(1, rightChildIndex);
    const rightPreOrder = rightChildIndex === -1 ? [] : preOrder.slice(rightChildIndex);

    getRoot(leftPreOrder);
    getRoot(rightPreOrder);
    postOrder.push(root);
  }
}

solution(KEYS);
