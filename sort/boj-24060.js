const [[numbersLength, orderNum], numbers] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

function solution(numbersLength, orderNum, numbers) {
  let count = 0;
  const temp = new Array(numbersLength);

  mergeSort(numbers, 0, numbersLength - 1);

  count < orderNum && console.log(-1);

  // mergeSort 정의
  function mergeSort(array, l, r) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);
    mergeSort(array, l, m);
    mergeSort(array, m + 1, r);

    merge(array, l, m, r);
  }

  //merge 함수 정의
  function merge(array, l, m, r) {
    let i = l;
    let j = m + 1;
    let t = 0;

    while (i <= m && j <= r) {
      if (array[i] <= array[j]) {
        temp[t++] = array[i++];
      } else {
        temp[t++] = array[j++];
      }
    }

    while (i <= m) {
      temp[t++] = array[i++];
    }

    while (j <= r) {
      temp[t++] = array[j++];
    }

    i = l;
    t = 0;
    while (i <= r) {
      array[i++] = temp[t++];
      ++count === orderNum && console.log(temp[t - 1]);
    }
  }
}

solution(numbersLength, orderNum, numbers);
