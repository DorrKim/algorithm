const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const COUNT_TESTCASE = input[0];
const testCases = [];
let rest = input.slice(1);

while (rest.length) {
  const lastYearGrades = rest[1].split(' ').map(Number);
  const countChange = +rest[2];

  const changeInfo = rest.slice(3, 3 + countChange).map((info) => info.split(' ').map(Number));

  testCases.push({
    lastYearGrades,
    changeInfo
  });
  rest = rest.slice(3 + countChange);
}

function solution(testCases) {
  const results = testCases.map(getCurrentGrades).join('\n');

  console.log(results);
}

function getCurrentGrades(testCase) {
  const { lastYearGrades, changeInfo } = testCase;
  const adjacencyList = new Map();
  const indgrees = new Array(lastYearGrades.length + 1).fill(0);

  for (let i = 0; i < lastYearGrades.length; i++) {
    if (!adjacencyList.has(lastYearGrades[i])) {
      adjacencyList.set(lastYearGrades[i], new Set());
    }
    for (let j = i + 1; j < lastYearGrades.length; j++) {
      adjacencyList.get(lastYearGrades[i]).add(lastYearGrades[j]);
    }
  }

  changeInfo.forEach(([v1, v2]) => {
    let prior;
    if (adjacencyList.get(v1).has(v2)) {
      adjacencyList.get(v1).delete(v2);
      prior = v2;
    }

    if (adjacencyList.get(v2).has(v1)) {
      adjacencyList.get(v2).delete(v1);
      prior = v1;
    }

    if (prior === v1) {
      adjacencyList.get(v1).add(v2);
    } else if (prior === v2) {
      adjacencyList.get(v2).add(v1);
    }
  });

  for (let set of adjacencyList.values()) {
    set.forEach((value) => {
      indgrees[value] += 1;
    });
  }

  const queue = [];

  for (let i = 1; i < indgrees.length; i++) {
    if (indgrees[i] === 0) {
      queue.push(i);
    }
  }

  const grades = [];

  for (let i = 0; i < lastYearGrades.length; i++) {
    if (queue.length === 0) {
      return 'IMPOSSIBLE';
    }

    const node = queue.shift();
    grades.push(node);

    if (!adjacencyList.has(node)) continue;
    adjacencyList.get(node).forEach((el) => {
      indgrees[el] -= 1;
      if (indgrees[el] === 0) queue.push(el);
    });
  }

  return grades.join(' ');
}

solution(testCases);
