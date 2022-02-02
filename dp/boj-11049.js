// const [[countMatrix], ...matrixSizes] = require('fs')
//   .readFileSync('example.txt')
//   .toString()
//   .trim()
//   .split('\n')
//   .map((line) => line.trim().split(' ').map(Number));

function solution(countMatrix, matrixSizes) {
  //const cache = new Array(countMatrix).fill(null).map(() => new Array(countMatrix).fill(null));
  const cache = Array.from({ length: countMatrix }, () => new Array(countMatrix).fill(null));
  const a = countMincalculate(0, countMatrix - 1);
  console.log(a);

  function countMincalculate(start, end) {
    if (cache[start][end]) return cache[start][end];
    if (start === end) return (cache[start][end] = 0);

    if (start === end - 1) {
      const [startRowLength, startColLength] = matrixSizes[start];
      const [_, endColLength] = matrixSizes[end];
      const countCalculate = startRowLength * startColLength * endColLength;

      return (cache[start][end] = countCalculate);
    }

    let min = Infinity;

    for (let i = 0; i <= end - start - 1; i++) {
      const leftMinCount = countMincalculate(start, start + i);
      const rightMinCount = countMincalculate(start + i + 1, end);
      const left = matrixSizes[start][0];
      const mid = matrixSizes[start + i][1];
      const right = matrixSizes[end][1];
      const currCount = left * mid * right;

      min = leftMinCount + rightMinCount + currCount < min ? leftMinCount + rightMinCount + currCount : min;
    }
    return (cache[start][end] = min);
  }
}

const countMatrix = 500;
const matrixSizes = new Array(500).fill([1, 1]);
solution(countMatrix, matrixSizes);
