const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const V = +input[0];
const E = +input[1];
const LINKS = input.slice(2, 2 + E).map((line) => line.split(' ').map(Number));
const [START, END] = input[2 + E].split(' ').map(Number);

class PriorityQueue {
  constructor(comparer) {
    this.heap = [];
    this.comparer = comparer;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  getParentIndex(childIndex) {
    return childIndex === 0 ? null : Math.floor((childIndex - 1) / 2);
  }

  getLeftChildIndex(parentIndex) {
    const leftChildIndex = parentIndex * 2 + 1;
    return leftChildIndex < this.heap.length ? leftChildIndex : null;
  }

  getRightChildIndex(parentIndex) {
    const rightChildIndex = parentIndex * 2 + 2;
    return rightChildIndex < this.heap.length ? rightChildIndex : null;
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
      if (rightChildIndex === null) targetIndex = leftChildIndex;
      else {
        targetIndex = this.comparer(this.heap[leftChildIndex], this.heap[rightChildIndex])
          ? leftChildIndex
          : rightChildIndex;
      }

      const needSwap = this.comparer(this.heap[targetIndex], this.heap[currentIndex]);
      if (needSwap) {
        this.swap(currentIndex, targetIndex);
        currentIndex = targetIndex;
        leftChildIndex = this.getLeftChildIndex(currentIndex);
        rightChildIndex = this.getRightChildIndex(currentIndex);
      } else break;
    }
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    this.swap(0, this.heap.length - 1);
    const result = this.heap.pop();
    this.bubbleDown();

    return result;
  }
}

function solution(V, E, START, END, LINKS) {
  const pq = new PriorityQueue((a, b) => a[0] < b[0]);

  const adjacencyList = new Map();
  LINKS.forEach(([v1, v2, w]) => {
    if (!adjacencyList.has(v1)) {
      adjacencyList.set(v1, new Map());
    }
    const targetNode = adjacencyList.get(v1);
    if (!targetNode.has(v2)) {
      targetNode.set(v2, w);
    } else {
      targetNode.set(v2, Math.min(targetNode.get(v2), w));
    }
  });

  const dist = new Array(V + 1).fill(Infinity);
  dist[START] = 0;
  pq.add([0, START]);

  while (pq.heap.length) {
    const [currentDist, node] = pq.pop();
    if (currentDist > dist[node]) continue;

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((w, nextNode) => {
      if (dist[nextNode] > dist[node] + w) {
        dist[nextNode] = dist[node] + w;
        pq.add([dist[nextNode], nextNode]);
      }
    });
  }

  console.log(dist[END]);
}

solution(V, E, START, END, LINKS);
