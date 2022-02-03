const [NM, ...matrices] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const beforeMatrix = matrices.slice(0, N).map((row) => row.split('').map(Number));
const afterMatrix = matrices.slice(N).map((row) => row.split('').map(Number));

function solution(N, M, beforeMatrix, afterMatrix) {
  if (N < 3 || M < 3) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (beforeMatrix[i][j] !== afterMatrix[i][j]) {
          console.log(-1);
          return;
        }
      }
    }

    console.log(0);
    return;
  }

  let count = 0;
  for (let i = 0; i < N - 2; i++) {
    for (let j = 0; j < M - 2; j++) {
      if (beforeMatrix[i][j] === afterMatrix[i][j]) continue;

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          beforeMatrix[i + k][j + l] = 1 - beforeMatrix[i + k][j + l];
        }
      }
      count++;
    }
    for (let j = M - 2; j < M; j++) {
      if (beforeMatrix[i][j] === afterMatrix[i][j]) continue;
      console.log(-1);
      return;
    }
  }
  for (let i = N - 2; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (beforeMatrix[i][j] === afterMatrix[i][j]) continue;
      console.log(-1);
      return;
    }
  }
  console.log(count);
}

solution(N, M, beforeMatrix, afterMatrix);
