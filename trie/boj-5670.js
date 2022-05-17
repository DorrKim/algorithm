let input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const testCases = [];

while (input.length) {
  const N = +input[0];
  const words = input.slice(1, 1 + N);
  testCases.push(words);
  input = input.slice(1 + N);
}

class Node {
  constructor() {
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(array) {
    let currNode = this.root;

    array.forEach((el) => {
      if (!currNode.children.has(el)) {
        currNode.children.set(el, new Node());
      }
      currNode = currNode.children.get(el);
    });
  }

  find(str) {
    const letters = str.split('');
    let currNode = this.root;
    let count = 0;

    letters.forEach((letter) => {
      if (!currNode.children.has(letter)) return;

      currNode = currNode.children.get(letter);

      if (currNode.children.size <= 1) {
        if (currNode.children.size === 1 && currNode.children.values().next().value.children.size === 0) count++;
        return;
      }
      count++;
    });

    return count;
  }
}

function solution(testCases) {
  const result = testCases.map(countAveragePressButton);
  console.log(result.join('\n'));
}

function countAveragePressButton(words) {
  const trie = new Trie();

  words.forEach((word) => {
    trie.insert(`${word} `.split(''));
  });

  const sum = words.reduce((acc, word) => {
    return acc + trie.find(word);
  }, 0);

  return (sum / words.length).toFixed(2);
}

solution(testCases);
