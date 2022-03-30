const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = Number(input[0]);
const schedules = input.slice(1).map((schedule) => schedule.split(' ').map(Number));

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

function solution(N, schedules) {
  let sortedSchedules = schedules.sort((a, b) => b[0] - a[0]);
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  const leftSeats = new PriorityQueue((a, b) => a < b);
  let max = 0;
  const result = [];

  while (sortedSchedules.length) {
    const [start, end] = sortedSchedules.pop();

    while (pq.heap.length > 0 && pq.heap[0][1] <= start) {
      const [, , computer] = pq.pop();
      leftSeats.add(computer);
    }
    let computerNumber;

    if (leftSeats.heap.length !== 0) {
      computerNumber = leftSeats.pop();
    } else {
      computerNumber = pq.heap.length + 1;
    }
    pq.add([start, end, computerNumber]);
    result[computerNumber - 1] = result[computerNumber - 1] === undefined ? 1 : result[computerNumber - 1] + 1;

    max = Math.max(max, pq.heap.length);
  }

  console.log(max);
  console.log(result.join(' '));
}

solution(N, schedules);
