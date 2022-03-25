const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
const TEST_CASES = [];
let rest = input.slice(1);

for (let i = 0; i < T; i++) {
  let length = +rest[0];

  const links = rest.slice(1, length + 1).map((link) => link.split(' '));
  TEST_CASES.push(links);
  rest = rest.slice(length + 1);
}

function solution(TEST_CASES) {
  const result = TEST_CASES.flatMap(getNetworkSize).join('\n');
  console.log(result);
}

function getNetworkSize(links) {
  const parentsMap = new Map();
  let result = links.map(([name1, name2]) => {
    if (!parentsMap.has(name1)) {
      parentsMap.set(name1, name1);
    }

    if (!parentsMap.has(name2)) {
      parentsMap.set(name2, name2);
    }

    const parent = union(parentsMap, name1, name2);

    return [...parentsMap.keys()].filter((key) => getParent(parentsMap, key) === parent).length;
  });

  return result;
}

function getParent(parentsMap, name) {
  if (parentsMap.get(name) === name) return name;

  const parent = getParent(parentsMap, parentsMap.get(name));
  parentsMap.set(name, parent);

  return parent;
}

function union(parentsMap, name1, name2) {
  const parent1 = getParent(parentsMap, name1);
  const parent2 = getParent(parentsMap, name2);

  if (parent1 === parent2) return parent1;

  if (parent1.localeCompare(parent2) < 0) {
    parentsMap.set(parent2, parent1);
    return parent1;
  } else {
    parentsMap.set(parent1, parent2);
    return parent2;
  }
}

function hasSameParent(parentsMap, name1, name2) {
  const parent1 = getParent(parentsMap, name1);
  const parent2 = getParent(parentsMap, name2);

  return parent1 === parent2;
}

solution(TEST_CASES);
