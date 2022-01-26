const [[numbersLength, orderNum], numbers] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(numbersLength, orderNum, numbers) {
  let count = 0;

  for (let i = 0; i < numbersLength - 1; i++) {
    for (let j = 0; j < numbersLength - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        const temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
        count++;
      }
      if (count === orderNum) {
        const result = `${numbers[j]} ${numbers[j + 1]}`;
        console.log(result);
        return;
      }
    }
  }

  console.log(-1);
}
solution(numbersLength, orderNum, numbers);
