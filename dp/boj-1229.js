const N = +require('fs').readFileSync('example.txt').toString().trim();

function solution(N) {
  const cache = new Array(N + 1).fill(Infinity);
  const hexagonalNumbers = [];
  let gap = 5;
  let hexagonalNumber = 1;

  cache[0] = 0;

  while (hexagonalNumber <= N) {
    hexagonalNumbers.push(hexagonalNumber);

    hexagonalNumber += gap;
    gap += 4;
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < hexagonalNumbers.length; j++) {
      if (hexagonalNumbers[j] > i) break;
      cache[i] = Math.min(cache[i - hexagonalNumbers[j]] + 1, cache[i]);
    }
  }

  console.log(cache[N]);
}

solution(N);
