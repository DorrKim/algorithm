// const [NK, ...rest] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
// const [countJewel, countBag] = NK.trim().split(' ').map(Number);
// const jewels = rest.slice(0, countJewel).map((jewelInfo) => jewelInfo.trim().split(' ').map(Number));
// const limitWeights = rest.slice(countJewel).map(Number);

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

class MaxHeap extends Heap {
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
  const comparer = (a, b) => {
    return a[1] > b[1] || (a[1] === b[1] && a[0] > b[0]);
  };
  const maxHeap = new MaxHeap(comparer);
  const ascendingSortedLimits = limitWeights.sort((a, b) => a - b);
  const descendingSortedJewels = jewels.sort((a, b) => b[0] - a[0]);
  const maxValuesByBag = new Array(limitWeights.length).fill(null);

  if (descendingSortedJewels[0] > ascendingSortedLimits[ascendingSortedLimits.length - 1]) {
    console.log(0);
    return;
  }

  jewels.forEach((jewel) => {
    maxHeap.add(jewel);
  });

  let useCount = 0;

  while (true) {
    const poppedJewel = maxHeap.pop();

    if (!poppedJewel) break;

    const [m, v] = poppedJewel;

    for (let i = 0; i < limitWeights.length; i++) {
      if (ascendingSortedLimits[i] < m || maxValuesByBag[i] !== null) continue;
      maxValuesByBag[i] = v;
      useCount++;
      break;
    }
  }

  // const maxValues = ascendingSortedLimits.map((limit) => {
  //   const poppedJewels = [];
  //   let maxLoadableJewelValue = 0;

  //   while (true) {
  //     const poppedJewel = maxHeap.pop();
  //     if (!poppedJewel) break;

  //     const [m, v] = poppedJewel;
  //     if (m <= limit) {
  //       maxLoadableJewelValue = v;
  //       break;
  //     }
  //     poppedJewels.push([m, v]);
  //   }
  //   poppedJewels.forEach((jewel) => maxHeap.add(jewel));
  //   return maxLoadableJewelValue;
  // });

  console.log(maxValuesByBag.reduce((a, b) => a + b));
}
const jewels = new Array(300000).fill([1000000, 1000000]);
const limitWeights = new Array(300000).fill(100000000);
solution(jewels, limitWeights);
