const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

function solution(N, M, numbers) {
  const prefixSum = new Array(N).fill(0);
  const prefixRemain = new Array(N).fill(0);
  prefixSum[0] = numbers[0];
  prefixRemain[0] = numbers[0] % M;

  const map = new Map();
  if (!map.has(prefixRemain[0])) {
    map.set(prefixRemain[0], 1);
  }

  for (let i = 1; i < N; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
    prefixRemain[i] = prefixSum[i] % M;

    if (!map.has(prefixRemain[i])) {
      map.set(prefixRemain[i], 1);
    } else {
      map.set(prefixRemain[i], map.get(prefixRemain[i]) + 1);
    }
  }

  let result = 0;
  map.forEach((count, remain) => {
    if (remain === 0) {
      result += count;
    }

    result += (count * (count - 1)) / 2;
  });

  console.log(result);
}

solution(N, M, numbers);
