const [[countIrons], irons, _, targetWeights] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(countIrons, irons, targetWeights) {
  const totalAccWeights = irons.reduce((a, b) => a + b, 0);
  const cache = Array.from({ length: 2 }, () => new Array(totalAccWeights + 1).fill(0));

  for (let i = 1; i <= countIrons; i++) {
    const currRelativeIndex = i % 2;
    const prevRelativeIndex = (i - 1) % 2;

    cache[currRelativeIndex][irons[i - 1]] += 1;

    for (let j = 1; j < irons[i - 1]; j++) {
      cache[currRelativeIndex][j] += cache[prevRelativeIndex][j] + cache[prevRelativeIndex][irons[i - 1] - j];
      j + irons[i - 1] <= totalAccWeights &&
        (cache[currRelativeIndex][j] += cache[prevRelativeIndex][j + irons[i - 1]]);
    }

    for (let j = irons[i - 1]; j <= totalAccWeights; j++) {
      cache[currRelativeIndex][j] += cache[prevRelativeIndex][j] + cache[prevRelativeIndex][j - irons[i - 1]];
      j + irons[i - 1] <= totalAccWeights &&
        (cache[currRelativeIndex][j] += cache[prevRelativeIndex][j + irons[i - 1]]);
    }
  }
  const result = targetWeights.map((targetWeight) => {
    if (targetWeight > totalAccWeights) return 'N';
    return cache[countIrons % 2][targetWeight] === 0 ? 'N' : 'Y';
  });

  console.log(result.join(' ').trim());
}

solution(countIrons, irons, targetWeights);
