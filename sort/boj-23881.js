const [[arrayLength, countSwap], array] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(arrayLength, countSwap, array) {
  let count = 0;

  for (let i = arrayLength - 1; i > 0; i--) {
    let maxIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (array[j] < array[maxIndex]) continue;
      maxIndex = j;
    }

    if (maxIndex !== i) {
      const temp = array[maxIndex];
      array[maxIndex] = array[i];
      array[i] = temp;
      count++;
    }

    if (count === countSwap) {
      console.log(`${array[maxIndex]} ${array[i]}`);
      return;
    }
  }
  console.log(-1);
}

solution(arrayLength, countSwap, array);
