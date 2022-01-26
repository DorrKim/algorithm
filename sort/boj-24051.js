const [[arrayLength, countStore], array] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(arrayLength, countStore, array) {
  let count = 0;

  for (let i = 1; i < arrayLength; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      count++;

      if (count === countStore) {
        console.log(array[j + 1]);
        return;
      }
    }
    array[j + 1] = key;
    j !== i - 1 && count++;

    if (count === countStore) {
      console.log(array);
      return;
    }
  }
  console.log(-1);
}

solution(arrayLength, countStore, array);
