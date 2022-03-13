const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const M = +input[1];
const [START, END] = input.pop().split(' ').map(Number);
const BUS_ROUTES = input.slice(2).map((route) => route.split(' ').map(Number));

class PriorityQueue {
  constructor(sorter) {
    this.heap = [];
    this.sorter = sorter;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  getParentIndex(index) {
    return index !== 0 ? Math.floor((index - 1) / 2) : null;
  }

  getLeftChildIndex(index) {
    const leftChildIndex = 2 * index + 1;
    return leftChildIndex < this.heap.length ? leftChildIndex : null;
  }

  getRightChildIndex(index) {
    const rightChildIndex = 2 * index + 2;
    return rightChildIndex < this.heap.length ? rightChildIndex : null;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (parentIndex !== null && this.sorter(this.heap[index], this.heap[parentIndex])) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftChildIndex = this.getLeftChildIndex(index);
    let rightChildIndex = this.getRightChildIndex(index);

    while (true) {
      if (leftChildIndex === null) break;

      let targetIndex;
      if (rightChildIndex === null) {
        targetIndex = leftChildIndex;
      } else {
        targetIndex = this.sorter(this.heap[leftChildIndex], this.heap[rightChildIndex])
          ? leftChildIndex
          : rightChildIndex;
      }

      if (this.sorter(this.heap[targetIndex], this.heap[index])) {
        this.swap(targetIndex, index);
        index = targetIndex;
        leftChildIndex = this.getLeftChildIndex(index);
        rightChildIndex = this.getRightChildIndex(index);
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

const minHeap = new PriorityQueue((a, b) => a < b);

function solution(N, M, START, END, BUS_ROUTES) {
  const mapConstructArray = new Array(N).fill(null).map((_, index) => [index + 1, new Map()]);
  const adjacentList = new Map(mapConstructArray);
  const sorter = (a, b) => a[0] < b[0];
  const minHeap = new PriorityQueue(sorter);
  const dist = new Array(N + 1).fill(Infinity);
  dist[START] = 0;

  BUS_ROUTES.forEach(([v1, v2, cost]) => {
    const mapV1ToV2 = adjacentList.get(v1);

    if (mapV1ToV2.has(v2)) {
      const minCost = Math.min(mapV1ToV2.get(v2), cost);
      mapV1ToV2.set(v2, minCost);
    } else {
      mapV1ToV2.set(v2, cost);
    }
  });

  adjacentList.get(START).forEach((cost, v) => {
    dist[v] = cost;
    minHeap.add([dist[v], v]);
  });

  while (minHeap.heap.length) {
    const [minDist, v1] = minHeap.pop();

    adjacentList.get(v1).forEach((cost, v2) => {
      if (minDist + cost >= dist[v2]) return;
      const newMinCost = minDist + cost;
      dist[v2] = newMinCost;
      minHeap.add([newMinCost, v2]);
    });
  }

  console.log(dist[END]);
}

solution(N, M, START, END, BUS_ROUTES);
