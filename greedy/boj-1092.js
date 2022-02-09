const [N, lineN, M, lineM] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const weightLimits = lineN.split(' ').map(Number);
const boxWeights = lineM.split(' ').map(Number);

const descendingSorter = (a, b) => b - a;

function solution(weightLimits, boxWeights) {
  weightLimits.sort(descendingSorter);
  boxWeights.sort(descendingSorter);

  if (weightLimits[0] < boxWeights[0]) {
    console.log(-1);
    return;
  }
  let round = 0;
  let countMove = 0;

  while (countMove !== boxWeights.length) {
    let craneIndex = 0;
    for (let i = 0; i < boxWeights.length && craneIndex !== weightLimits.length; i++) {
      if (boxWeights[i] > weightLimits[craneIndex] || boxWeights[i] === 0) continue;
      boxWeights[i] = 0;
      craneIndex++;
      countMove++;
    }
    round++;
  }
  console.log(round);
}

solution(weightLimits, boxWeights);
