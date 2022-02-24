const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const targetChannel = input[0].trim();
const countDisableNumber = +input[1];
const disableNumbers = countDisableNumber === 0 ? [] : input[2].split(' ').map(Number);

function solution(targetChannel, disableNumbers) {
  if (targetChannel === '100') {
    console.log(0);
    return;
  }

  let result = Math.abs(targetChannel - 100);

  if (disableNumbers.length === 0) {
    result = Math.min(result, targetChannel.length);
    console.log(result);

    return;
  }

  const isDisables = new Array(10).fill(false);
  disableNumbers.forEach((number) => {
    isDisables[number] = true;
  });

  const pressableNumbers = isDisables
    .map((isDisable, index) => (isDisable ? null : index))
    .filter((number) => number !== null);

  if (targetChannel.length === 1) {
    for (let i = targetChannel.length; i <= targetChannel.length + 1; i++) {
      getMuitiPermutation(pressableNumbers, i).forEach((mutiPermutation) => {
        result = Math.min(Math.abs(mutiPermutation.join('') - +targetChannel) + i, result);
      });
    }
    console.log(result);
    return;
  }

  if (pressableNumbers.length === 0) {
    console.log(result);
    return;
  }

  const lowerDigitNumberCount =
    Math.abs(`${pressableNumbers[pressableNumbers.length - 1]}`.repeat(targetChannel.length - 1) - +targetChannel) +
    targetChannel.length -
    1;
  result = Math.min(result, lowerDigitNumberCount);

  if (pressableNumbers[0] === 0) {
    if (pressableNumbers.length > 1) {
      const greaterDigitNumberCount =
        Math.abs(`${pressableNumbers[1]}` + `${pressableNumbers[0]}`.repeat(targetChannel.length) - +targetChannel) +
        targetChannel.length +
        1;

      result = Math.min(result, greaterDigitNumberCount);
    }
  } else {
    const greaterDigitNumberCount =
      Math.abs(`${pressableNumbers[0]}`.repeat(targetChannel.length + 1) - +targetChannel) + targetChannel.length + 1;

    result = Math.min(result, greaterDigitNumberCount);
  }

  getMuitiPermutation(pressableNumbers, targetChannel.length).forEach((mutiPermutation) => {
    result = Math.min(Math.abs(mutiPermutation.join('') - +targetChannel) + targetChannel.length, result);
  });

  console.log(result);
}

function getMuitiPermutation(array, number) {
  if (number === 1) return array.map((el) => [el]);
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const fix = array[i];
    getMuitiPermutation(array, number - 1).forEach((mutiPermutation) => {
      result.push([fix, ...mutiPermutation]);
    });
  }
  return result;
}

solution(targetChannel, disableNumbers);
