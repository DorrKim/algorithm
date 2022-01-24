const [[length, countChange], array] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution(length, countChange, array) {
  let count = 0;
  heapSort(array, length - 1);
  count < countChange && console.log(-1);

  function heapSort(array, limit) {
    buildMinHeap(array, limit);

    for (let i = limit; i > 0; i--) {
      const temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      ++count === countChange && console.log(`${array[i]} ${array[0]}`);

      heapify(array, 0, i - 1);
    }
  }

  function buildMinHeap(array, limit) {
    for (let i = Math.floor(limit / 2); i >= 0; i--) {
      heapify(array, i, limit);
    }
  }

  function heapify(array, index, limit) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smaller = null;

    if (right <= limit) smaller = array[left] < array[right] ? left : right;
    else if (left <= limit) smaller = left;
    else return;

    if (array[smaller] < array[index]) {
      const temp = array[smaller];
      array[smaller] = array[index];
      array[index] = temp;
      ++count === countChange && console.log(`${array[index]} ${array[smaller]}`);

      heapify(array, smaller, limit);
    }
  }
}

solution(length, countChange, array);
