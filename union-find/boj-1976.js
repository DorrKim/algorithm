const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const M = +input[1];
const plan = input.pop().split(' ').map(Number);
const ajacentMatrix = input.slice(2).map((line) => line.split(' ').map(Number));

function solution(N, M, plan, ajacentMatrix) {
  const parents = new Array(N).fill(null).map((_, i) => i);

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (ajacentMatrix[i][j] === 0) continue;
      union(parents, i, j);
    }
  }
  let isConnected = true;

  for (let i = 0; i < M - 1; i++) {
    if (find(parents, plan[i] - 1, plan[i + 1] - 1)) continue;
    isConnected = false;
    break;
  }

  console.log(isConnected ? 'YES' : 'NO');
}

function getParent(arr, number) {
  if (number === arr[number]) return number;

  arr[number] = getParent(arr, arr[number]);

  return arr[number];
}

function union(arr, number1, number2) {
  number1 = getParent(arr, number1);
  number2 = getParent(arr, number2);

  if (number1 < number2) {
    arr[number2] = number1;
  } else {
    arr[number1] = number2;
  }
}

function find(arr, number1, number2) {
  number1 = getParent(arr, number1);
  number2 = getParent(arr, number2);

  return number1 === number2;
}

solution(N, M, plan, ajacentMatrix);
