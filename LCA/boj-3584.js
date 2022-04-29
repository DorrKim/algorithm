const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const testcases = [];
let rest = input.slice(1);

while (rest.length) {
  const countNode = +rest[0];
  const links = rest.slice(1, countNode).map((link) => link.split(' ').map(Number));
  const children = rest[countNode].split(' ').map(Number);

  rest = rest.slice(countNode + 1);

  testcases.push([countNode, links, children]);
}

function solution(testcases) {
  const result = testcases.map(([_, links, children]) => lca(links, children)).join('\n');
  console.log(result);
}

function lca(links, children) {
  const parents = new Map();
  links.forEach(([parent, child]) => {
    parents.set(child, parent);
  });

  const [ancestor1, ancestor2] = children.map((child) => {
    const myParents = [child];
    let currentChild = child;

    while (parents.has(currentChild)) {
      const parent = parents.get(currentChild);
      myParents.push(parent);
      currentChild = parent;
    }

    return myParents;
  });

  let lca = null;
  for (let i = 0; i < ancestor1.length; i++) {
    let find = false;
    for (let j = 0; j < ancestor2.length; j++) {
      if (ancestor1[i] === ancestor2[j]) {
        find = true;
        lca = ancestor1[i];
        break;
      }
    }

    if (find) break;
  }
  return lca;
}

solution(testcases);
