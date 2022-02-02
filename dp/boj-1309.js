const countCage = +require('fs').readFileSync('dev/stdin').toString().trim();

function solution(countCage) {
  const cache = new Array(2);
  cache[0] = [2, 1];

  for (let i = 1; i < countCage; i++) {
    const [usePrev, notusePrev] = cache[(i - 1) % 2];
    const useCurr = (usePrev + 2 * notusePrev) % 9901;
    const notUseCurr = (usePrev + notusePrev) % 9901;
    cache[i % 2] = [useCurr, notUseCurr];
  }

  const result = cache[(countCage - 1) % 2][0] + cache[(countCage - 1) % 2][1];
  console.log(result % 9901);
}

solution(countCage);
