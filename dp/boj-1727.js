const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const MALES = input[1].split(' ').map(Number);
const FEMALES = input[2].split(' ').map(Number);

function solution(N, M, MALES, FEMALES) {
  const sortedMales = [...MALES].sort((a, b) => a - b);
  const sortedFemales = [...FEMALES].sort((a, b) => a - b);

  const short = Math.min(N, M);
  const long = Math.max(N, M);

  const matrix = new Array(long).fill(null).map(() => new Array(short).fill(0));

  const main = long === N ? sortedMales : sortedFemales;
  const sub = long === N ? sortedFemales : sortedMales;

  for (let i = 0; i < long; i++) {
    for (let j = 0; j < short; j++) {
      if (i < j) {
        matrix[i][j] = Infinity;
        continue;
      }
      if (i === 0 && j === 0) {
        matrix[i][j] = Math.abs(main[i] - sub[j]);
        continue;
      }

      if (i === 0) {
        matrix[i][j] = Math.min(Math.abs(main[i] - sub[j]), matrix[i][j - 1]);
        continue;
      }

      if (j === 0) {
        matrix[i][j] = Math.min(Math.abs(main[i] - sub[j]), matrix[i - 1][j]);
        continue;
      }

      matrix[i][j] = Math.min(matrix[i - 1][j - 1] + Math.abs(main[i] - sub[j]), matrix[i - 1][j]);
    }
  }

  console.log(matrix[long - 1][short - 1]);
  console.log(matrix);
}

solution(N, M, MALES, FEMALES);
