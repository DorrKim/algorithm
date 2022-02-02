const [word1, word2] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

function solution(word1, word2) {
  const cache = Array.from({ length: word1.length + 1 }, () => new Array(word2.length + 1).fill(0));

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      cache[i][j] =
        word1[i - 1] !== word2[j - 1] ? Math.max(cache[i - 1][j], cache[i][j - 1]) : cache[i - 1][j - 1] + 1;
    }
  }

  console.log(cache[word1.length][word2.length]);
}

solution(word1, word2);
