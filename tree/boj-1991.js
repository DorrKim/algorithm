const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const LINKS = input.slice(1).map((link) => link.split(' '));

function solution(N, LINKS) {
  const adjacentList = new Map();

  LINKS.forEach(([parent, leftChild, rightChild]) => {
    if (!adjacentList.has(parent)) {
      adjacentList.set(parent, []);
    }
    const children = adjacentList.get(parent);
    children.push(leftChild, rightChild);
  });

  let preOrderResult = [];
  let inOrderResult = [];
  let postOrderResult = [];

  const preOrder = (root) => {
    preOrderResult.push(root);

    if (!adjacentList.has(root)) return;
    adjacentList.get(root).forEach((child) => {
      if (child === '.') return;
      preOrder(child);
    });
  };

  const inOrder = (root) => {
    if (!adjacentList.has(root)) return;

    adjacentList.get(root).forEach((child, index) => {
      if (index === 1) inOrderResult.push(root);
      if (child === '.') return;
      inOrder(child);
    });
  };

  const postOrder = (root) => {
    if (!adjacentList.has(root)) return;
    adjacentList.get(root).forEach((child) => {
      if (child === '.') return;
      postOrder(child);
    });
    postOrderResult.push(root);
  };

  preOrder('A');
  inOrder('A');
  postOrder('A');

  console.log(preOrderResult.join(''));
  console.log(inOrderResult.join(''));
  console.log(postOrderResult.join(''));
}

solution(N, LINKS);
