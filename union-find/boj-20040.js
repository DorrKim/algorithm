const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const LINKS = input.slice(1).map((line) => line.split(' ').map(Number));

function solution(N, M, LINKS) {
  const parents = new Array(N).fill(null).map((_, i) => i);
  let round = 0;

  LINKS.forEach(([v1, v2], i) => {
    if (hasSameParent(parents, v1, v2) && round === 0) {
      round = i + 1;
    }
    unionParent(parents, v1, v2);
  });
  console.log(round);
}

function getParent(array, number) {
  if (number === array[number]) return number;

  const parent = getParent(array, array[number]);
  return (array[number] = parent);
}

function unionParent(array, number1, number2) {
  number1 = getParent(array, number1);
  number2 = getParent(array, number2);

  if (number1 < number2) {
    array[number2] = number1;
    return number1;
  } else {
    array[number1] = number2;
    return number2;
  }
}

function hasSameParent(array, number1, number2) {
  number1 = getParent(array, number1);
  number2 = getParent(array, number2);

  return number1 === number2;
}

solution(N, M, LINKS);
