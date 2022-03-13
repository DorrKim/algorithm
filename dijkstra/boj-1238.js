const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M, X] = input.shift().split(' ').map(Number);
const ROUTES = input.map((route) => route.split(' ').map(Number));

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

function solution(N, M, partyCity, ROUTES) {
  const visit = new Array(N + 1);
  const mapConstructor1 = new Array(N).fill(null).map((_, i) => [i + 1, new Map()]);
  const mapConstructor2 = new Array(N).fill(null).map((_, i) => [i + 1, new Map()]);
  const adjacentList = new Map(mapConstructor1);
  const adjacentListReverse = new Map(mapConstructor2);

  ROUTES.forEach(([from, to, time]) => {
    const fromMap = adjacentList.get(from);

    if (fromMap.has(to)) {
      const minTime = Math.min(fromMap.get(to), time);
      fromMap.set(to, minTime);
    } else {
      fromMap.set(to, time);
    }

    const toMap = adjacentListReverse.get(to);

    if (toMap.has(from)) {
      const minTime = Math.min(toMap.get(from), time);
      toMap.set(from, minTime);
    } else {
      toMap.set(from, time);
    }
  });

  const distFromPartyCity = new Array(N + 1).fill(Infinity);
  distFromPartyCity[partyCity] = 0;

  const distToPartyCity = new Array(N + 1).fill(Infinity);
  distToPartyCity[partyCity] = 0;

  const minSorter = (a, b) => a[0] < b[0];
  const minHeap = new PriorityQueue(minSorter);

  const adjacentLists = [adjacentList, adjacentListReverse];
  const dists = [distFromPartyCity, distToPartyCity];

  for (let i = 0; i < 2; i++) {
    const targetList = adjacentLists[i];
    const targetDist = dists[i];

    visit.fill(false);

    minHeap.add([targetDist[partyCity], partyCity]);

    while (minHeap.heap.length) {
      const [currentMinDist, city] = minHeap.pop();
      if (visit[city]) continue;
      visit[city] = true;

      targetList.get(city).forEach((time, nextCity) => {
        const minTimeThroughCity = time + currentMinDist;
        if (visit[nextCity] || minTimeThroughCity >= targetDist[nextCity]) return;

        targetDist[nextCity] = minTimeThroughCity;
        minHeap.add([minTimeThroughCity, nextCity]);
      });
    }
  }
  let maxTime = 0;

  for (let i = 1; i <= N; i++) {
    maxTime = Math.max(maxTime, distFromPartyCity[i] + distToPartyCity[i]);
  }

  console.log(maxTime);
}

solution(N, M, X, ROUTES);
