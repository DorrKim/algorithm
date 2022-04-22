const digitNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function solution(s) {
  let result = s;
  for (let i = 0; i <= 9; i++) {
    const regExp = new RegExp(digitNames[i], 'g');
    result = result.replace(regExp, i);
  }

  return Number(result);
}
