const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const points = input.slice(1).map((point) => point.split(' ').map(Number));

function solution(N, points) {
  let area = 0;
  points.push([...points[0]]);

  for (let i = 0; i < N; i++) {
    area += points[i][0] * points[i + 1][1];
    area -= points[i][1] * points[i + 1][0];
  }
  const result = Math.abs(area) / 2;
  console.log(result.toFixed(1));
}

solution(N, points);
