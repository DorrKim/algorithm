const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const villagers = input[1].split(' ');
const M = +input[2];
const LINKS = input.slice(3).map((link) => link.split(' '));

function solution(villagers, LINKS) {
  const adjacencyList = new Map();
  const indegreeMap = new Map();

  villagers.forEach((villager) => {
    adjacencyList.set(villager, new Set());
    indegreeMap.set(villager, 0);
  });

  LINKS.forEach(([child, ancestor]) => {
    if (!adjacencyList.has(ancestor)) {
      adjacencyList.set(ancestor, new Set());
    }

    adjacencyList.get(ancestor).add(child);

    if (!indegreeMap.has(child)) {
      indegreeMap.set(child, 0);
    }

    indegreeMap.set(child, indegreeMap.get(child) + 1);
  });

  const root = [];
  const stack = [];
  const result = [];

  indegreeMap.forEach((indegree, name) => {
    if (indegree === 0) {
      stack.push(name);
      root.push(name);
    }
  });

  root.forEach((name) => indegreeMap.delete(name));

  while (stack.length) {
    const ancestor = stack.pop();

    const info = [ancestor];

    const children = [];
    if (!adjacencyList.has(ancestor)) continue;

    adjacencyList.get(ancestor).forEach((child) => {
      const indegree = indegreeMap.get(child) - 1;
      indegreeMap.set(child, indegree);
      if (indegree === 0) {
        children.push(child);
        indegreeMap.delete(child);
        stack.push(child);
      }
    });
    info.push(`${children.length} ${children.sort().join(' ')}`);

    result.push(info);
  }

  console.log(root.length);
  console.log(root.sort().join(' '));
  console.log(
    result
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((el) => el.join(' '))
      .join('\n')
  );
}

solution(villagers, LINKS);
