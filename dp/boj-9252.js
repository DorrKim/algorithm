const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const word1 = input[0].split('');
const word2 = input[1].split('');

function solution(word1, word2) {
  const cache = new Array(word1.length + 1).fill(null).map(() => new Array(word2.length + 1).fill([0, '']));

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        cache[i][j] = [cache[i - 1][j - 1][0] + 1, cache[i - 1][j - 1][1] + word1[i - 1]];
      } else if (cache[i - 1][j][0] >= cache[i][j - 1][0]) {
        cache[i][j] = [...cache[i - 1][j]];
      } else {
        cache[i][j] = [...cache[i][j - 1]];
      }
    }
  }

  console.log(cache[word1.length][word2.length].join('\n'));
}

solution(word1, word2);
