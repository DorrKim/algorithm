const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const testCases = [];
let rest = input.slice(1);

for (let i = 0; i < N; i++) {
  const [N, M, T] = rest[0].split(' ').map(Number);
  const testCase = [];
  const infos = rest.slice(0, 2).map((line) => line.split(' ').map(Number));
  const links = rest.slice(2, M + 2).map((line) => line.split(' ').map(Number));
  const candidates = rest.slice(M + 2, M + T + 2).map(Number);

  testCase.push(infos);
  testCase.push(links);
  testCase.push(candidates);

  testCases.push(testCase);
  rest = rest.slice(T + M + 2);
}

class PriorityQueue {
  constructor(comparer = (a, b) => a < b) {
    this.heap = [];
    this.comparer = comparer;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  getParentIndex(childIndex) {
    return childIndex !== 0 ? Math.floor((childIndex - 1) / 2) : null;
  }

  getLeftChildIndex(parentIndex) {
    const leftChildIndex = parentIndex * 2 + 1;
    return this.heap[leftChildIndex] !== undefined ? leftChildIndex : null;
  }

  getRightChildIndex(parentIndex) {
    const rightChildIndex = parentIndex * 2 + 2;

    return this.heap[rightChildIndex] !== undefined ? rightChildIndex : null;
  }

  add(data) {
    this.heap.push(data);

    if (this.heap.length === 1) return;

    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);

    let parent = this.heap[parentIndex];
    let child = this.heap[index];

    while (this.comparer(child, parent)) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
      if (parentIndex === null) break;
      parent = this.heap[parentIndex];
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    this.swap(0, this.heap.length - 1);
    const result = this.heap.pop();

    let index = 0;

    while (this.getLeftChildIndex(index) !== null || this.getRightChildIndex(index) !== null) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let targetIndex;

      if (leftChildIndex === null) {
        targetIndex = rightChildIndex;
      } else if (rightChildIndex === null) {
        targetIndex = leftChildIndex;
      } else {
        const leftChild = this.heap[leftChildIndex];
        const rightChild = this.heap[rightChildIndex];
        const preferLeft = this.comparer(leftChild, rightChild);

        targetIndex = preferLeft ? leftChildIndex : rightChildIndex;
      }

      const needSwap = this.comparer(this.heap[targetIndex], this.heap[index]);
      if (needSwap) {
        this.swap(targetIndex, index);
        index = targetIndex;
      } else {
        break;
      }
    }
    return result;
  }
  clear() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
}

function solution(testCases) {
  const result = testCases.map((testCase) => getDestination(testCase).join(' ')).join('\n');
  console.log(result);
}

function getDestination(testCase) {
  const pq = new PriorityQueue((a, b) => a[0] < b[0]);
  const [info, links, candidates] = testCase;
  const [N, M, T] = info[0];
  const [S, G, H] = info[1];
  const visit = new Array(N + 1);
  const dist = new Array(N + 1);
  let minDistance = null;
  let distanceThroughGH = new Array(N + 1).fill(Infinity);

  const adjList = new Map();
  for (let i = 1; i <= N; i++) {
    adjList.set(i, new Map());
  }

  links.forEach(([v1, v2, w]) => {
    adjList.get(v1).set(v2, w);
    adjList.get(v2).set(v1, w);
  });

  const startNodes = [S, G, H];

  for (let i = 0; i <= 2; i++) {
    const startNode = startNodes[i];
    dist.fill(Infinity);
    visit.fill(false);

    dist[startNode] = 0;
    pq.add([dist[startNode], startNode]);

    while (pq.size()) {
      const [_, v] = pq.pop();
      if (visit[v]) continue;
      visit[v] = true;

      [...adjList.get(v).entries()].forEach(([adjNode, weight]) => {
        dist[adjNode] = Math.min(dist[adjNode], dist[v] + weight);
        pq.add([dist[adjNode], adjNode]);
      });
    }

    if (i === 0) {
      minDistance = dist.slice();
      continue;
    }

    for (let j = 1; j <= N; j++) {
      distanceThroughGH[j] = Math.min(
        distanceThroughGH[j],
        dist[j] + adjList.get(G).get(H) + minDistance[G + H - startNodes[i]]
      );
    }
  }

  return candidates
    .sort((a, b) => a - b)
    .filter(
      (candidate) => minDistance[candidate] !== Infinity && minDistance[candidate] === distanceThroughGH[candidate]
    );
}

solution(testCases);
