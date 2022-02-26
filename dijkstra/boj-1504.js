const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, E] = input[0].split(' ').map(Number);
const LINKS = input.slice(1, 1 + E).map((link) => link.split(' ').map(Number));
const [V1, V2] = input.pop().split(' ').map(Number);

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

  clear() {
    this.heap = [];
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

function solution(N, E, LINKS, V1, V2) {
  const adjList = new Map();

  for (let i = 1; i <= N; i++) {
    adjList.set(i, new Map());
  }

  LINKS.forEach(([v1, v2, w]) => {
    const adjNodes1 = adjList.get(v1);
    const adjNodes2 = adjList.get(v2);

    if (!adjNodes1.has(v2)) {
      adjNodes1.set(v2, w);
    } else if (adjNodes1.get(v2) > w) {
      adjNodes1.set(v2, w);
    }

    if (!adjNodes2.has(v1)) {
      adjNodes2.set(v1, w);
    } else if (adjNodes2.get(v1) > w) {
      adjNodes2.set(v1, w);
    }
  });

  let distance1 = 0;
  let distance2 = 0;

  const visit = new Array(N + 1);
  const dist = new Array(N + 1);
  const pq = new MinHeap();

  const startVertexes = [1, V1, N];

  for (let i = 0; i <= 2; i++) {
    const start = startVertexes[i];

    visit.fill(false);
    dist.fill(Infinity);
    pq.clear();

    dist[start] = 0;
    pq.add([dist[start], start]);

    while (pq.size()) {
      const [_, v] = pq.pop();
      if (visit[v]) continue;
      visit[v] = true;

      [...adjList.get(v).entries()].forEach(([nextVertex, weight]) => {
        if (visit[nextVertex]) return;
        dist[nextVertex] = Math.min(dist[nextVertex], weight + dist[v]);
        pq.add([dist[nextVertex], nextVertex]);
      });
    }

    if (i === 0) {
      distance1 += dist[V1];
      distance2 += dist[V2];
    }

    if (i === 1) {
      distance1 += dist[V2];
      distance2 += dist[V2];
    }
    if (i === 2) {
      distance1 += dist[V2];
      distance2 += dist[V1];
    }
  }
  const result = Math.min(distance1, distance2);
  console.log(result === Infinity ? -1 : result);
}

solution(N, E, LINKS, V1, V2);
