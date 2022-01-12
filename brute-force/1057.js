const [countParticipant, numberJ, numberH] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

function solution(countParticipant, numberJ, numberH) {
  let round = 0;

  function recursion(numberJ, numberH) {
    if (numberJ === numberH) {
      console.log(round);
      return;
    }
    round++;
    const newNumberJ = Math.floor((numberJ + 1) / 2);
    const newNumberH = Math.floor((numberH + 1) / 2);
    recursion(newNumberJ, newNumberH);
  }
  recursion(numberJ, numberH);
}

solution(countParticipant, numberJ, numberH);
