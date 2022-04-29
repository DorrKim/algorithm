function solution(n, arr1, arr2) {
  const result = [];

  for (let i = 0; i < n; i++) {
    const rowValue = arr1[i] | arr2[i];
    const row = rowValue
      .toString(2)
      .padStart(n, '0')
      .split('')
      .map((el) => (el === '1' ? '#' : ' '))
      .join('');

    result.push(row);
  }

  return result;
}
