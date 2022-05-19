function solution(nodeinfo) {
  const arr = nodeinfo.map((pos, i) => [...pos, i + 1]).sort((node1, node2) => node2[1] - node1[1]);
  const preOrder = [];
  const postOrder = [];

  traversal(arr);

  return [preOrder, postOrder];

  function traversal(arr) {
    if (arr.length === 0) return;
    const [rootX, rootY, num] = arr[0];
    const left = [];
    const right = [];

    preOrder.push(num);
    arr.forEach((node) => {
      if (node[0] < rootX) {
        left.push(node);
      } else if (node[0] > rootX) {
        right.push(node);
      }
    });

    traversal(left);
    traversal(right);
    postOrder.push(num);
  }
}
