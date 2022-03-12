const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const countTestCases = +input[0];
const testCases = [];
let rest = input.slice(1);

for (let i = 0; i < countTestCases; i++) {
  const [N, M, K] = rest[0].split(' ').map(Number);

  const testCase = [[N, M, K]];
  const tickets = rest.slice(1, K + 1).map((ticket) => ticket.split('').map(Number));
  testCase.push(tickets);
  testCases.push(testCase);

  rest = rest.slice(K + 1);
}

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
  }
}

function solution(testCases) {
  testCases.map((testCase) => getMinTravelTime(testCase));
}

function getMinTravelTime(testCase) {
  const [[N, M, K], tickets] = testCase;
  const adjList = new Map();
  const visti = new Array(N + 1).fill(false);
  const dist = new Array(N + 1).fill(Infinity);
  dist[1] = 0;

  tickets.forEach(([start, end, cost, time]) => {});
}

solution(testCases);
