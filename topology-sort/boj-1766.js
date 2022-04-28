const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const infos = input.slice(1).map((info) => info.split(' ').map(Number));

class PriorityQueue {
  constructor(comparer) {
    this.heap = [];
    this.comparer = comparer;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  getParentIndex(index) {
    return index > 0 ? Math.floor((index - 1) / 2) : null;
  }

  getLeftChildIndex(index) {
    const leftChildIndex = 2 * index + 1;
    return leftChildIndex <= this.heap.length - 1 ? leftChildIndex : null;
  }

  getRightChildIndex(index) {
    const rightChildIndex = 2 * index + 2;
    return rightChildIndex <= this.heap.length - 1 ? rightChildIndex : null;
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);

    while (parentIndex !== null && this.comparer(this.heap[currentIndex], this.heap[parentIndex])) {
      this.swap(currentIndex, parentIndex);

      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  bubbleDown() {
    let currentIndex = 0;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);

    while (true) {
      if (leftChildIndex === null) break;

      let targetIndex;
      if (rightChildIndex === null) {
        targetIndex = leftChildIndex;
      } else {
        targetIndex = this.comparer(this.heap[leftChildIndex], this.heap[rightChildIndex])
          ? leftChildIndex
          : rightChildIndex;
      }

      if (this.comparer(this.heap[targetIndex], this.heap[currentIndex])) {
        this.swap(targetIndex, currentIndex);
        currentIndex = targetIndex;
        leftChildIndex = this.getLeftChildIndex(currentIndex);
        rightChildIndex = this.getRightChildIndex(currentIndex);
      } else break;
    }
  }

  add(data) {
    this.heap.push(data);

    this.bubbleUp();
  }

  pop() {
    this.swap(0, this.heap.length - 1);
    const result = this.heap.pop();

    this.bubbleDown();
    return result;
  }
}

function solution(N, M, infos) {
  const adjacencyList = new Map();
  const indegrees = new Array(N + 1).fill(0);

  infos.forEach(([v1, v2]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Set());
    }

    adjacencyList.get(v1).add(v2);
  });

  for (let set of adjacencyList.values()) {
    set.forEach((el) => (indegrees[el] += 1));
  }
  const pq = new PriorityQueue((a, b) => a < b);

  indegrees.forEach((count, index) => {
    if (index === 0) return;
    if (count === 0) {
      pq.add(index);
    }
  });

  const result = [];

  for (let i = 0; i < N; i++) {
    if (pq.heap.length === 0) break;
    const poppedNode = pq.pop();
    result.push(poppedNode);

    if (!adjacencyList.has(poppedNode)) continue;
    adjacencyList.get(poppedNode).forEach((el) => {
      indegrees[el] -= 1;
      if (indegrees[el] === 0) {
        pq.add(el);
      }
    });
    adjacencyList.delete(poppedNode);
  }

  console.log(result.join(' '));
}

solution(N, M, infos);
