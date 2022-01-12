const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [stringTypeSideLength, ...stringTypeMatrix] = input;
const sideLength = Number(stringTypeSideLength);
const matrix = stringTypeMatrix.map((stringRow) => stringRow.split(' ').map((stringNumber) => +stringNumber));

function solution(matrix) {
  //종료 조건은 무엇인가
  let countBlue = 0;
  let countWhite = 0;

  function recrusion(matrix) {
    const paintFlag = matrix[0][0];
    const isCompletedMatrix = matrix.every((row) => row.every((painted) => painted === paintFlag));

    if (isCompletedMatrix) {
      paintFlag === 1 ? countBlue++ : countWhite++;
      return;
    }
    const dividediMatrices = divideMatrix(matrix);

    dividediMatrices.forEach((matrix) => {
      recrusion(matrix);
    });
  }
  recrusion(matrix);
  // 반복할 행동은 무엇인가
  // 1. 자르기 2. 검사하기
  console.log(countWhite);
  console.log(countBlue);
}

function divideMatrix(targetMatrix) {
  const colLength = targetMatrix.length;
  const rowLength = targetMatrix[0].length;

  if (colLength !== rowLength || colLength % 2 !== 0) return;

  const divideIndex = colLength / 2;
  const [leftMatrix, rightMatrix] = targetMatrix.reduce(
    ([prevLeftMatrix, prevRightMatrix], row) => {
      const leftRow = row.slice(0, divideIndex);
      const rightRow = row.slice(divideIndex);

      return [
        [...prevLeftMatrix, leftRow],
        [...prevRightMatrix, rightRow]
      ];
    },
    [[], []]
  );

  const leftTopMatrix = leftMatrix.slice(0, divideIndex);
  const leftBottomMatrix = leftMatrix.slice(divideIndex);
  const rightTopMatrix = rightMatrix.slice(0, divideIndex);
  const righttBottomMatrix = rightMatrix.slice(divideIndex);

  return [leftTopMatrix, leftBottomMatrix, rightTopMatrix, righttBottomMatrix];
}

solution(matrix);
