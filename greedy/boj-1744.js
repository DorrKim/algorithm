const [length, ...array] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution(length, array) {
  const negatives = [];
  const zeros = [];
  const ones = [];
  const moreThanOnes = [];
  let result = 0;

  for (let i = 0; i < length; i++) {
    const currNumber = +array[i];
    currNumber < 0 && negatives.push(currNumber);
    currNumber === 0 && zeros.push(currNumber);
    currNumber === 1 && ones.push(currNumber);
    currNumber > 1 && moreThanOnes.push(currNumber);
  }

  negatives.sort((a, b) => a - b);
  moreThanOnes.sort((a, b) => b - a);

  for (let i = 0; i < Math.floor(negatives.length / 2); i++) {
    result += negatives[2 * i] * negatives[2 * i + 1];
  }

  if (negatives.length % 2) {
    result += zeros.length ? 0 : negatives[negatives.length - 1];
  }

  for (let i = 0; i < Math.floor(moreThanOnes.length / 2); i++) {
    result += moreThanOnes[2 * i] * moreThanOnes[2 * i + 1];
  }

  if (moreThanOnes.length % 2) {
    result += moreThanOnes[moreThanOnes.length - 1];
  }

  result += ones.length;
  console.log(result);
}

solution(length, array);
