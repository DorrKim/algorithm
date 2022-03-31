const N = BigInt(require('fs').readFileSync('example.txt').toString().trim());

function solution(N) {
  if (N < 2) {
    console.log(N.toString());
    return;
  }
  const fiboMatrix = [
    [1n, 1n],
    [1n, 0n]
  ];
  const fiboNthPowerMatrix = matrixPower(fiboMatrix, N - 1n);

  console.log(fiboNthPowerMatrix[0][0].toString());
}

function matrixPower(matrix, n) {
  if (n === 1n) return matrix;

  const isOddExponent = n % 2n === 1n;
  const halfExponent = isOddExponent ? (n - 1n) / 2n : n / 2n;
  const halfCalculate = matrixPower(matrix, halfExponent);
  const evenCalculate = matrixProduct(halfCalculate, halfCalculate);

  return isOddExponent ? matrixProduct(evenCalculate, matrix) : evenCalculate;
}

function matrixProduct(matrixA, matrixB) {
  const productedMatrix = new Array(matrixA.length).fill(null).map(() => new Array(matrixB[0].length).fill(0n));
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixB.length; k++) {
        productedMatrix[i][j] =
          (productedMatrix[i][j] + ((((matrixA[i][k] % 1000000007n) * matrixB[k][j]) % 1000000007n) % 1000000007n)) %
          1000000007n;
      }
    }
  }

  return productedMatrix;
}

solution(N);

console.log(1 < 2n);
