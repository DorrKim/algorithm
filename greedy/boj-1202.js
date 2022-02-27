const [NK, ...rest] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [countJewel, countBag] = NK.trim().split(' ').map(Number);
const jewels = rest.slice(0, countJewel).map((jewelInfo) => jewelInfo.trim().split(' ').map(Number));
const limitWeights = rest.slice(countJewel).map(Number);

class Heap {
  constructor() {
    this.heap = [];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  getParentIndex(index) {
    if (index === 0) throw new Error('무엇인가 이상합니다.');
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    if (index < 0 || index > this.heap.length) throw new Error('무엇인가 이상합니다.');
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    if (index < 0 || index > this.heap.length) throw new Error('무엇인가 이상합니다.');
    return 2 * (index + 1);
  }

  getParent(index) {
    const parentIndex = this.getParentIndex(index);

    if (this.heap[parentIndex] === undefined) throw new Error('빈환할 노드가 업습니다.');

    return this.heap[parentIndex];
  }

  getRightChild(index) {
    const rightChildIndex = this.getRightChildIndex(index);
    if (!this.heap[rightChildIndex]) return;

    return this.heap[rightChildIndex];
  }

  getLeftChild(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    if (!this.heap[leftChildIndex]) return;

    return this.heap[leftChildIndex];
  }

  peekRoot() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  print() {
    return this.heap;
  }
}

class PriorityQueue extends Heap {
  constructor(comparer) {
    super();
    this.comparer = comparer;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (
      index !== 0 &&
      this.getParent(index) !== undefined &&
      this.comparer(this.heap[index], this.getParent(index))
    ) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (
      (this.getLeftChild(index) !== undefined && this.comparer(this.getLeftChild(index), this.heap[index])) ||
      (this.getRightChild(index) !== undefined && this.comparer(this.getRightChild(index), this.heap[index]))
    ) {
      let targetIndex = 0;
      if (this.getLeftChild(index) !== undefined && this.getRightChild(index) !== undefined) {
        targetIndex = this.comparer(this.getLeftChild(index), this.getRightChild(index))
          ? this.getLeftChildIndex(index)
          : this.getRightChildIndex(index);
      } else if (this.getLeftChild(index) !== undefined) {
        targetIndex = this.getLeftChildIndex(index);
      } else {
        targetIndex = this.getRightChildIndex(index);
      }
      this.swap(targetIndex, index);
      index = targetIndex;
    }
  }

  add(data) {
    this.heap.push(data);

    this.bubbleUp();
  }

  pop() {
    const root = this.peekRoot();
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.bubbleDown();
    return root;
  }
}

function solution(jewels, limitWeights) {
  const maxHeap = new PriorityQueue((a, b) => a > b);
  jewels.sort((a, b) => b[0] - a[0]);
  limitWeights.sort((a, b) => a - b);

  let result = 0n;
  limitWeights.forEach((limit) => {
    while (jewels.length > 0 && jewels[jewels.length - 1][0] <= limit) {
      const [m, v] = jewels.pop();
      maxHeap.add(BigInt(v));
    }
    if (maxHeap.size() === 0) return;

    result += maxHeap.pop();
  });

  console.log(result.toString());
}
solution(jewels, limitWeights);
