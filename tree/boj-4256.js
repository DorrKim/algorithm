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
  const [[N], preOrder, inOrder] = testCase;

  let postOrderResult = '';

  getTreeRoot([preOrder, 0, N - 1], [inOrder, 0, N - 1]);
  return postOrderResult.trim();

  function getTreeRoot([preOrder, preOrderStart, preOrderEnd], [inOrder, inOrderStart, inOrderEnd]) {
    if (preOrderStart > preOrderEnd || inOrderStart > inOrderEnd) return;
    const rootValue = preOrder[preOrderStart];

    let inOrderRootIndex;
    for (let i = inOrderStart; i <= inOrderEnd; i++) {
      if (inOrder[i] !== rootValue) continue;
      inOrderRootIndex = i;
      break;
    }

    const leftInOrderStart = inOrderStart;
    const leftInOrderEnd = inOrderRootIndex - 1;
    const rightInOrderStart = inOrderRootIndex + 1;
    const rightInOrderEnd = inOrderEnd;

    const leftPreOrderStart = preOrderStart + 1;
    const leftPreOrderEnd = leftPreOrderStart + leftInOrderEnd - leftInOrderStart;
    const rightPreOrderStart = leftPreOrderEnd + 1;
    const rightPreOrderEnd = preOrderEnd;

    getTreeRoot([preOrder, leftPreOrderStart, leftPreOrderEnd], [inOrder, leftInOrderStart, leftInOrderEnd]);
    getTreeRoot([preOrder, rightPreOrderStart, rightPreOrderEnd], [inOrder, rightInOrderStart, rightInOrderEnd]);

    postOrderResult += `${rootValue} `;
  }
}

solution(TEST_CASES);
