const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, K, M] = input[0].split(' ').map(Number);
const firstVideos = input[1].split(' ').map(Number);
const recommendVideos = input[2].split(' ').map(Number);

function solution(N, K, M, firstVideos, recommendVideos) {
  const MAX_DEPTH = Math.ceil(Math.log2(M));

  const next = new Array(K + 1).fill(null).map(() => new Array(MAX_DEPTH).fill(0));
  recommendVideos.forEach((video, nextVideoIndex) => {
    next[nextVideoIndex + 1][0] = video;
  });

  for (let j = 1; j < MAX_DEPTH; j++) {
    for (let i = 1; i <= K; i++) {
      next[i][j] = next[next[i][j - 1]][j - 1];
    }
  }

  const result = firstVideos.map((video) => {
    let n = M - 1;
    let x = video;

    for (let i = MAX_DEPTH - 1; i >= 0; i--) {
      if (n >= 1 << i) {
        n -= 1 << i;
        x = next[x][i];
      }
    }
    return x;
  });

  console.log(result.join(' '));
}

solution(N, K, M, firstVideos, recommendVideos);
