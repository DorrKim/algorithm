const { join } = require('path');

const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const infos = input.slice(1).map((line) => line.split(' '));

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(array) {
    let currNode = this.root;

    array.forEach((el, index, self) => {
      if (!currNode.children.has(el)) {
        currNode.children.set(el, new Node(self.slice(0, index + 1)));
      }
      currNode = currNode.children.get(el);
    });
  }

  print(node) {
    let currNode = node;
    if (currNode.children.size === 0) return [];

    const result = [...currNode.children.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .flatMap(([key, value]) => {
        return [
          key,
          ...this.print(value).flatMap((el) => {
            return el.length ? [`--${el}`] : [];
          })
        ];
      });
    return result;
  }
}

function solution(N, infos) {
  const trie = new Trie();

  infos.forEach((info) => {
    trie.insert(info.slice(1));
  });

  console.log(trie.print(trie.root).join('\n'));
}

solution(N, infos);
