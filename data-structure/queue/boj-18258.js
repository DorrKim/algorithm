const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const commands = input.slice(1);

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let lastNode = this.tail;

      lastNode.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return '';
  }

  pop() {
    if (this.head === null) {
      return -1;
    } else {
      const targetNode = this.head;

      this.head = targetNode.next;
      if (this.head === null) {
        this.tail = null;
      }

      this.length -= 1;

      return targetNode.data;
    }
  }

  size() {
    return this.length;
  }

  empty() {
    return 1 - Boolean(this.length);
  }

  front() {
    if (this.empty()) return -1;

    return this.head.data;
  }
  back() {
    if (this.empty()) return -1;

    let lastNode = this.tail;

    return lastNode.data;
  }
}

function solution(commands) {
  const queue = new Queue();

  const commandMapper = {
    pop: () => queue.pop(),
    size: () => queue.size(),
    empty: () => queue.empty(),
    front: () => queue.front(),
    back: () => queue.back()
  };

  const result = commands
    .map((command) => {
      if (command.startsWith('push')) {
        const [_, targetNumber] = command.split(' ');
        return queue.push(targetNumber);
      }

      return commandMapper[command]();
    })
    .filter((el) => el !== '')
    .join('\n');

  console.log(result);
}

solution(commands);
