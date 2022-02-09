const [maxLevel, ...exps] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

function solution(maxLevel, exps) {
  let countNerf = 0;

  for (let i = maxLevel - 2; i >= 0; i--) {
    if (exps[i] < exps[i + 1]) continue;
    const diff = exps[i] - exps[i + 1];
    exps[i] -= diff + 1;

    countNerf += diff + 1;
  }
  console.log(countNerf);
}

solution(maxLevel, exps);
