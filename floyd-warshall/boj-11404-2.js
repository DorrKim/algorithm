const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const M = +input[1];
const BUS_INFOS = input.slice(2).map((line) => line.split(' ').map(Number));

function solution(N, M, BUS_INFOS) {
  const adjacencyMatrix = new Array(N)
    .fill(null)
    .map((_, i) => new Array(N).fill(null).map((__, j) => (i === j ? 0 : Infinity)));

  BUS_INFOS.forEach(([a, b, c]) => {
    adjacencyMatrix[a - 1][b - 1] = Math.min(adjacencyMatrix[a - 1][b - 1], c);
  });

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        adjacencyMatrix[i][j] = Math.min(adjacencyMatrix[i][j], adjacencyMatrix[i][k] + adjacencyMatrix[k][j]);
      }
    }
  }
  console.log(adjacencyMatrix.map((row) => row.map((el) => (el === Infinity ? 0 : el)).join(' ')).join('\n'));
}

solution(N, M, BUS_INFOS);
