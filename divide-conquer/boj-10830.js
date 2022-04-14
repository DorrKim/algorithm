const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, B] = input[0].split(' ').map(Number);
const MATRIX = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, B, MATRIX) {
  const result = multiple(MATRIX, B)
    .map((row) => row.join(' '))
    .join('\n');

  console.log(result);
}

function multiple(MATRIX, B) {
  if (B === 1) return MATRIX.map((row) => row.map((el) => el % 1000));
  const isOdd = Boolean(B % 2);
  const halfExp = Math.floor(B / 2);

  const halfCalculateMatrix = multiple(MATRIX, halfExp);
  const evenCalculate = matrixMulitple(halfCalculateMatrix, halfCalculateMatrix);

  return isOdd ? matrixMulitple(evenCalculate, MATRIX) : evenCalculate;
}

function matrixMulitple(matrixA, matrixB) {
  const newMatrix = new Array(matrixA.length).fill(null).map(() => new Array(matrixB[0].length).fill(0));

  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixB.length; k++) {
        newMatrix[i][j] = (newMatrix[i][j] + matrixA[i][k] * matrixB[k][j]) % 1000;
      }
    }
  }

  return newMatrix;
}

solution(N, B, MATRIX);
