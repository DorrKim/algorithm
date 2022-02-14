const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [L, W, K] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split('').map(Number));

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      this.tail = null;
    }

    const pointer = this.head;

    this.head = this.head.next;
    this.length--;

    return pointer.value;
  }

  front() {
    return this.head.value;
  }
}

function solution(L, W, K, board) {
  const visit = new Array(L).fill(null).map(() => new Array(W).fill(null).map(() => new Array(K + 1).fill(false)));
  const queue = new Queue();
  queue.enqueue([0, 0, 1, K]);
  visit[0][0][K] = true;
  let totalDistance = 0;

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  while (queue.length) {
    const [row, col, distance, countCrash] = queue.dequeue();

    totalDistance = distance;
    if (row === L - 1 && col === W - 1) break;

    for (let i = 0; i < 4; i++) {
      const nx = row + dx[i];
      const ny = col + dy[i];
      if (nx < 0 || nx >= L || ny < 0 || ny >= W) continue;

      if (board[nx][ny] === 0 && !visit[nx][ny][countCrash]) {
        queue.enqueue([nx, ny, distance + 1, countCrash]);
        visit[nx][ny][countCrash] = true;
      }
      if (board[nx][ny] === 1 && countCrash >= 1 && !visit[nx][ny][countCrash - 1]) {
        queue.enqueue([nx, ny, distance + 1, countCrash - 1]);
        visit[nx][ny][countCrash - 1] = true;
      }
    }
  }

  let lastVisit = false;
  for (let i = 0; i < K + 1; i++) {
    lastVisit = visit[L - 1][W - 1][i];

    if (lastVisit) break;
  }
  console.log(lastVisit ? totalDistance : -1);
}

solution(L, W, K, board);
