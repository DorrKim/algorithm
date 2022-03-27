const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = Number(input[0]);
const LECTURES = input.slice(1).map((lecture) => lecture.split(' ').map(Number));

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
    this.swap(0, this.heap.length - 1);

    const result = this.heap.pop();

    let index = 0;
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;

    while (true) {
      if (leftIndex > this.heap.length - 1) break;

      let targetIndex;
      if (rightIndex > this.heap.length - 1) {
        targetIndex = leftIndex;
      } else {
        targetIndex = this.comparer(this.heap[leftIndex], this.heap[rightIndex]) ? leftIndex : rightIndex;
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

function solution(N, LECTURES) {
  const startAscendingLectures = [...LECTURES].sort((a, b) => b[0] - a[0]);
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  let max = 0;

  while (startAscendingLectures.length) {
    const [start, end] = startAscendingLectures.pop();

    while (pq.heap.length && pq.heap[0][1] <= start) {
      pq.pop();
    }
    pq.add([start, end]);
    max = Math.max(max, pq.heap.length);
  }

  console.log(max);
}

solution(N, LECTURES);
