const [[size], ...elevationMatrix] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(Number));

function solution(elevationMatrix, size) {
  const flattenElevations = elevationMatrix.flat();
  const maxElevation = Math.max(...flattenElevations);
  const countSafeAreas = [];

  for (let i = 0; i <= maxElevation; i++) {
    const count = countSafeArea(elevationMatrix, size, i);
    countSafeAreas.push(count);
  }

  console.log(Math.max(...countSafeAreas));
}

solution(elevationMatrix, size);

function countSafeArea(elevationMatrix, size, rainLevel) {
  const isChecked = elevationMatrix.map((row) => row.map((elevation) => elevation <= rainLevel));
  let count = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (isChecked[i][j]) continue;

      const stack = [[i, j]];

      while (stack.length) {
        const [currRowIndex, currColIndex] = stack.pop();
        if (isChecked[currRowIndex][currColIndex]) continue;
        isChecked[currRowIndex][currColIndex] = true;

        if (currRowIndex > 0 && !isChecked[currRowIndex - 1][currColIndex]) {
          stack.push([currRowIndex - 1, currColIndex]);
        }

        if (currRowIndex < size - 1 && !isChecked[currRowIndex + 1][currColIndex]) {
          stack.push([currRowIndex + 1, currColIndex]);
        }

        if (currColIndex > 0 && !isChecked[currRowIndex][currColIndex - 1]) {
          stack.push([currRowIndex, currColIndex - 1]);
        }

        if (currColIndex < size - 1 && !isChecked[currRowIndex][currColIndex + 1]) {
          stack.push([currRowIndex, currColIndex + 1]);
        }
      }
      count++;
    }
  }
  return count;
}
