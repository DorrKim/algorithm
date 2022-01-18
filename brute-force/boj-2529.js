const [stringTypeCountSignStr, stringTypeSigns] = require('fs')
  .readFileSync('/example.txt')
  .toString()
  .trim()
  .split('\n');
const countSign = +stringTypeCountSignStr;
const signs = stringTypeSigns.split(' ');

function solution(countSign, signs) {
  const isUsedArray = new Array(10).fill(false);
  const validNumbers = [];

  function recursion(signIndex, prevNumber, partialNumbers) {
    if (signIndex === countSign) {
      validNumbers.push(partialNumbers);
      return;
    }
    const currentSign = signs[signIndex];

    isUsedArray.forEach((isUsed, index, selfArr) => {
      if (isUsed) return;
      const currNumber = index;

      const isValidNumber = currentSign === '>' ? prevNumber > currNumber : prevNumber < currNumber;
      if (!isValidNumber) return;

      selfArr[index] = true;
      recursion(signIndex + 1, currNumber, partialNumbers + currNumber);
      selfArr[index] = false;
    });
  }
  isUsedArray.forEach((isUsed, index, selfArr) => {
    selfArr[index] = true;
    recursion(0, index, `${index}`);
    selfArr[index] = false;
  });

  console.log(validNumbers[validNumbers.length - 1], validNumbers[0]);
}

solution(countSign, signs);
