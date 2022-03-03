const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [V, E] = input[0].split(' ').map(Number);
const startPoint = +input[1];
const links = input.slice(2, 2 + E).map((link) => link.split(' ').map(Number));

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

class MinHeap extends Heap {
  bubbleUp() {
    let index = this.heap.length - 1;

    while (index !== 0 && this.getParent(index) !== undefined && this.getParent(index)[0] > this.heap[index][0]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (
      (this.getLeftChild(index) !== undefined && this.getLeftChild(index)[0] < this.heap[index][0]) ||
      (this.getRightChild(index) !== undefined && this.getRightChild(index)[0] < this.heap[index][0])
    ) {
      let targetIndex = 0;
      if (this.getLeftChild(index) !== undefined && this.getRightChild(index) !== undefined) {
        targetIndex =
          this.getLeftChild(index)[0] <= this.getRightChild(index)[0]
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

function solution(V, E, startPoint, links) {
  const visit = new Array(V + 1).fill(false);
  const adjList = new Map();

  for (let i = 1; i <= V; i++) {
    adjList.set(i, new Map());
  }

  links.forEach(([v1, v2, w]) => {
    const adjNodes = adjList.get(v1);

    if (!adjNodes.has(v2)) {
      adjNodes.set(v2, w);
      return;
    }

    if (adjNodes.get(v2) > w) {
      adjNodes.set(v2, w);
    }
  });

  const dist = new Array(V + 1).fill(Infinity);
  dist[startPoint] = 0;

  const pq = new MinHeap();
  pq.add([dist[startPoint], startPoint]);

  while (pq.size()) {
    const [_, v] = pq.pop();
    if (visit[v]) continue;
    visit[v] = true;

    const adjNodes = adjList.get(v).entries();

    for (let [nextVertex, weight] of adjNodes) {
      if (visit[nextVertex]) continue;
      dist[nextVertex] = Math.min(dist[nextVertex], dist[v] + weight);
      pq.add([dist[nextVertex], nextVertex]);
    }
  }

  const result = dist
    .slice(1)
    .map((el) => (el === Infinity ? 'INF' : el))
    .join('\n');

  console.log(result);
}

solution(V, E, startPoint, links);
