const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let count = 0;
let size;
let countLego;
let legos = [];
let result = [];

rl.on('line', (line) => {
  const currLine = +line.trim();
  console.log(currLine);
  if (count === 0) {
    size = currLine * 10000000;
    count++;
  } else if (count === 1) {
    countLego = currLine;
    if (currLine === 0) {
      result.push('danger');
      count = 0;
    } else count++;
  } else if (count === 1 + countLego) {
    legos.push(currLine);
    result.push(solution(size, countLego, legos));
    count = 0;
  } else {
    legos.push(currLine);
    count++;
  }
}).on('close', function () {
  console.log(result.join('\n'));
  process.exit();
});

const ascendingSorter = (a, b) => a - b;

function solution(size, countLego, legos) {
  legos.sort(ascendingSorter);
  let canBlock = false;
  let result = 'danger';

  for (let i = 0; i < countLego; i++) {
    const legoSize = legos[i];
    const targetLegoSize = size - legoSize;

    let left = 0;
    let right = countLego - 1;
    let mid;

    while (left < right) {
      mid = Math.floor((left + right) / 2);

      if (legos[mid] <= targetLegoSize) {
        left = mid + 1;
      } else if (legos[mid] > targetLegoSize) {
        right = mid;
      }
    }
    if (left === i) continue;
    if (targetLegoSize === legos[left]) {
      canBlock = true;
      result = `yes ${legoSize <= targetLegoSize ? `${legoSize} ${targetLegoSize}` : `${targetLegoSize} ${legoSize}`}`;
      break;
    }
  }

  return result;
}
