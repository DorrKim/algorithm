const [length, numbers] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

function solution(length, numberStr) {
  const numbers = numberStr.split(' ').map(Number);
  const copy = [...numbers];

  const temp = new Array(length);
  mergeSort(numbers, 0, length - 1);

  const map = new Map();

  const set = new Set(numbers);

  let count = 0;
  for (let item of set) {
    if (map.has(item)) continue;
    map.set(item, count++);
  }
  const a = copy.map((number) => map.get(number)).join(' ');

  console.log(a);
  function mergeSort(array, l, r) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);

    mergeSort(array, l, m);
    mergeSort(array, m + 1, r);

    merge(array, l, m, r);
  }

  function merge(array, l, m, r) {
    let i = l;
    let j = m + 1;
    let t = 0;

    while (i <= m && j <= r) {
      if (array[i] < array[j]) {
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
    }
  }
}

solution(parseInt(length), numbers);
