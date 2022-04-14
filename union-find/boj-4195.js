let input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
let rest = input.slice(1);
input = null;

for (let i = 0; i < T; i++) {
  let length = +rest[0];

  const links = rest.slice(1, length + 1).map((link) => link.split(' '));
  console.log(getNetworkSize(links).join('\n'));
  rest = rest.slice(length + 1);
}

function getNetworkSize(links) {
  const parentsMap = new Map();
  let countMap = new Map();

  let result = links.map(([name1, name2]) => {
    if (!parentsMap.has(name1)) {
      parentsMap.set(name1, name1);
      countMap.set(name1, 1);
    }

    if (!parentsMap.has(name2)) {
      parentsMap.set(name2, name2);

      countMap.set(name2, 1);
    }

    const parent1 = getParent(parentsMap, name1);
    const parent2 = getParent(parentsMap, name2);
    if (parent1 === parent2) {
      return countMap.get(parent1);
    }

    const parent = union(parentsMap, name1, name2);

    if (parent === parent1) {
      countMap.set(parent, countMap.get(parent) + countMap.get(parent2));
      countMap.set(parent2, 0);
    } else {
      countMap.set(parent, countMap.get(parent) + countMap.get(parent1));
      countMap.set(parent1, 0);
    }

    return countMap.get(parent);
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
