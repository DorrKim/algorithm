const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input.shift();
const TEST_CASES = [];
let rest = input.map((line) => line.split(' ').map(Number));

for (let i = 0; i < T; i++) {
  const testCase = rest.slice(0, 3);
  TEST_CASES.push(testCase);

  rest = rest.slice(3);
}

function solution(TEST_CASES) {
  const result = TEST_CASES.map(getPostOrder).join('\n');
  console.log(result);
}

function getPostOrder(testCase) {
  const [_, preOrder, inOrder] = testCase;

  let postOrderResult = '';

  getTreeRoot(preOrder, inOrder);
  return postOrderResult.trim();

  function getTreeRoot(preOrder, inOrder) {
    if (preOrder.length === 0 && inOrder.length === 0) return;
    const rootValue = preOrder[0];

    const inOrderRootIndex = inOrder.findIndex((el) => el === rootValue);
    const leftInOrder = inOrder.slice(0, inOrderRootIndex);
    const rightInOrder = inOrder.slice(inOrderRootIndex + 1);

    const leftPreOrder = preOrder.slice(1, leftInOrder.length + 1);
    const rightPreOrder = preOrder.slice(leftInOrder.length + 1);

    if (leftPreOrder.length && leftInOrder.length) {
      getTreeRoot(leftPreOrder, leftInOrder);
    }
    if (rightPreOrder.length && rightInOrder.length) {
      getTreeRoot(rightPreOrder, rightInOrder);
    }
    postOrderResult += `${rootValue} `;
  }
}

solution(TEST_CASES);
