const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function solution(N, L, numbers) {
  class PriorityQueue {
    constructor(comparer) {
      this.heap = [];
      this.comparer = comparer;
    }

    swap(index1, index2) {
      const temp = this.heap[index1];
      this.heap[index1] = this.heap[index2];
      this.heap[index2] = temp;
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
        let targetIndex;
        if (leftIndex > this.heap.length - 1) break;
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
        } else {
          break;
        }
      }
      return result;
    }
  }

  const comparer = (a, b) => numbers[a] < +numbers[b];
  const minHeap = new PriorityQueue(comparer);
  let result = `${numbers[0]} `;

  minHeap.add(0);
  for (let i = 1; i < N; i++) {
    if (numbers[minHeap.heap[0]] >= +numbers[i]) {
      minHeap.heap = [];
      minHeap.add(i);
      result += `${numbers[i]} `;

      continue;
    }

    while (minHeap.heap[0] < i - L + 1) {
      minHeap.pop();
    }
    minHeap.add(i);

    result += `${numbers[minHeap.heap[0]]} `;
  }
  console.log(result);
}

let N;
let L;
let numbers;

let start = true;
rl.on('line', (line) => {
  if (start) {
    [N, L] = line.split(' ');
    start = false;
  } else {
    numbers = line.split(' ');
    rl.close();
  }
}).on('close', () => {
  solution(N, L, numbers);
  process.exit();
});
