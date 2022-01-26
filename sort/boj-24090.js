const [[numbersLength, orderNum], numbers] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(numbersLength, orderNum, numbers) {
  const copy = [...numbers];
  let count = 0;

  quickSort(copy, 0, numbersLength - 1);

  count < orderNum && console.log(-1);

  function quickSort(array, left, right) {
    if (left < 0 || right < 0) return;
    if (left < right) {
      const p = partition(array, left, right);

      quickSort(array, left, p - 1);
      quickSort(array, p + 1, right);
    }
  }

  function partition(array, left, right) {
    const pivot = array[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (array[j] < pivot) {
        i++;
        const temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        ++count === orderNum && console.log(`${Math.min(array[j], array[i])} ${Math.max(array[j], array[i])}`);
      }
    }
    if (i + 1 !== right) {
      const temp = array[i + 1];
      array[i + 1] = array[right];
      array[right] = temp;
      ++count === orderNum &&
        console.log(`${Math.min(array[i + 1], array[right])} ${Math.max(array[i + 1], array[right])}`);
    }

    return i + 1;
  }
}

solution(numbersLength, orderNum, numbers);
