const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const homeWorks = input.slice(1).map((homeWork) => homeWork.split(' ').map(Number));

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

function solution(N, homeWorks) {
  const minHeap = new PriorityQueue((a, b) => a < b);
  const sortedHomeWorks = [...homeWorks].sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  while (sortedHomeWorks.length) {
    const [deadLine, score] = sortedHomeWorks.pop();

    if (sortedHomeWorks.length === 0) {
      minHeap.add(score);
      break;
    }

    let [newDeadLine] = sortedHomeWorks[sortedHomeWorks.length - 1];

    while (newDeadLine === deadLine) {
      const [_, newScore] = sortedHomeWorks.pop();

      if (minHeap.heap.length < deadLine - 1) {
        minHeap.add(newScore);
      } else if (minHeap.heap[0] < newScore) {
        minHeap.pop();
        minHeap.add(newScore);
      }
      if (sortedHomeWorks.length === 0) break;
      [newDeadLine] = sortedHomeWorks[sortedHomeWorks.length - 1];
    }

    minHeap.add(score);
  }
  console.log(minHeap.heap.reduce((a, b) => a + b));
}

solution(N, homeWorks);
