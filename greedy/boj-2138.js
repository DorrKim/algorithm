const [countSwitches, strInitialState, strFinalState] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n');
const initialState = strInitialState.split('').map(Number);
const finalState = strFinalState.split('').map(Number);

function solution(countSwitches, initialState, finalState) {
  const firstFlipState = [...initialState];
  const firstNoneFlipState = [...initialState];
  firstFlipState[0] = 1 - firstFlipState[0];
  firstFlipState[1] = 1 - firstFlipState[1];

  const countFirstFlip = countMinFlip(firstFlipState);
  const countFirstNoneFlip = countMinFlip(firstNoneFlipState);

  if (countFirstFlip === -1 && countFirstNoneFlip === -1) {
    console.log(-1);
    return;
  }

  if (countFirstFlip !== -1 && countFirstNoneFlip !== -1) {
    console.log(Math.min(countFirstFlip + 1, countFirstNoneFlip));
    return;
  }

  console.log(Math.max(countFirstFlip + 1, countFirstNoneFlip));

  function countMinFlip(initialState) {
    let count = 0;

    for (let i = 0; i < countSwitches - 2; i++) {
      if (initialState[i] === finalState[i]) continue;
      initialState[i] = 1 - initialState[i];
      initialState[i + 1] = 1 - initialState[i + 1];
      initialState[i + 2] = 1 - initialState[i + 2];

      count++;
    }

    const equalFlag =
      Math.abs(initialState[countSwitches - 2] - finalState[countSwitches - 2]) +
      Math.abs(initialState[countSwitches - 1] - finalState[countSwitches - 1]);

    switch (equalFlag) {
      case 0:
        return count;
      case 2:
        return count + 1;
      default:
        return -1;
    }
  }
}
solution(+countSwitches, initialState, finalState);
