const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const weights = input[1].split(' ').map(Number);

function solution(N, weights) {
  const sortedWeights = [...weights].sort((a, b) => a - b);
  let upperBound = 0;

  for (let i = 0; i < N; i++) {
    if (sortedWeights[i] > upperBound + 1) break;
    upperBound += sortedWeights[i];
  }

  console.log(upperBound + 1);
}

solution(N, weights);
