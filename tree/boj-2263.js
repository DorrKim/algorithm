const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const [inOrder, postOrder] = input.slice(1).map((row) => row.split(' ').map(Number));

function getPostOrder(inOrder, postOrder) {
  let preOrderResult = '';

  getTreeRoot([inOrder, 0, inOrder.length - 1], [postOrder, 0, postOrder.length - 1]);
  console.log(preOrderResult.trim());

  function getTreeRoot([inOrder, inOrderStart, inOrderEnd], [postOrder, postOrderStart, postOrderEnd]) {
    if (inOrderStart > inOrderEnd || postOrderStart > postOrderEnd) return;
    const rootValue = postOrder[postOrderEnd];

    let inOrderRootIndex = null;
    for (let i = inOrderStart; i <= inOrderEnd; i++) {
      if (inOrder[i] !== rootValue) continue;
      inOrderRootIndex = i;
      break;
    }

    const leftInOrderStart = inOrderStart;
    const leftInOrderEnd = inOrderRootIndex - 1;
    const rightInOrderStart = inOrderRootIndex + 1;
    const rightInOrderEnd = inOrderEnd;

    const leftPostOrderStart = postOrderStart;
    const leftPostOrderEnd = postOrderStart + leftInOrderEnd - leftInOrderStart;
    const rightPostOrderStart = postOrderStart + leftInOrderEnd - leftInOrderStart + 1;
    const rightPostOrderEnd = postOrderEnd - 1;

    preOrderResult += `${rootValue} `;

    getTreeRoot([inOrder, leftInOrderStart, leftInOrderEnd], [postOrder, leftPostOrderStart, leftPostOrderEnd]);

    getTreeRoot([inOrder, rightInOrderStart, rightInOrderEnd], [postOrder, rightPostOrderStart, rightPostOrderEnd]);
  }
}

getPostOrder(inOrder, postOrder);
