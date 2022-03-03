class PriorityQueue {
  constructor(comparer) {
    this.heap = [];
    this.comparer = comparer;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  add(data) {
    this.heap.push(data);

    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (parentIndex >= 0 && this.comparer(this.heap[index], this.heap[parentIndex])) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return null;

    this.swap(0, this.heap.length - 1);
    const result = this.heap.pop();

    let index = 0;
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;

    while (true) {
      let targetIndex;
      if (leftIndex > this.heap.length - 1) break;
      if (rightIndex > this.heap.length - 1) {
        targetIndex = leftIndex;
      } else {
        const isLeft = this.comparer(this.heap[leftIndex], this.heap[rightIndex]);

        targetIndex = isLeft ? leftIndex : rightIndex;
      }

      const needSwap = this.comparer(this.heap[targetIndex], this.heap[index]);
      if (needSwap) {
        this.swap(targetIndex, index);
        index = targetIndex;
        leftIndex = 2 * index + 1;
        rightIndex = 2 * index + 2;
      } else break;
    }
    return result;
  }
}

class DuflexPriorityQueue {
  constructor() {
    this.minHeap = new PriorityQueue((a, b) => a < b);
    this.maxHeap = new PriorityQueue((a, b) => a > b);
  }

  add(data) {
    this.minHeap.add(data);
    this.maxHeap.add(data);
  }

  popMax() {
    this.maxHeap.pop();
    if (this.maxHeap.heap.length === 0 || this.maxHeap.heap[0] < this.minHeap.heap[0]) {
      this.minHeap.heap = [];
      this.maxHeap.heap = [];
    }
  }

  popMin() {
    this.minHeap.pop();
    if (this.minHeap.heap.length === 0 || this.maxHeap.heap[0] < this.minHeap.heap[0]) {
      this.minHeap.heap = [];
      this.maxHeap.heap = [];
      return;
    }
  }

  getMinMax() {
    return (this.minHeap.heap.length === 0 && this.maxHeap.heap.length === 0) ||
      this.minHeap.heap[0] > this.maxHeap.heap[0]
      ? [0, 0]
      : [this.maxHeap.heap[0], this.minHeap.heap[0]];
  }
}

function solution(operations) {
  const dpq = new DuflexPriorityQueue();
  const commandMapper = {
    I: (number) => dpq.add(number),
    D: (flag) => {
      if (flag === 1) dpq.popMax();
      else if (flag === -1) dpq.popMin();
    }
  };

  const parsedOperations = operations.map((operation) => operation.split(' '));
  parsedOperations.forEach(([first, second]) => {
    commandMapper[first](+second);
  });

  return dpq.getMinMax();
}
