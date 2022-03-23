const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const WORDS = input.slice(1).map((word) => word.split(''));

function solution(WORDS) {
  const set = new Set(WORDS.flat());
  const size = set.size;

  const alphabetMapConstructor = [...set].map((el) => [el, null]);
  const alphabetWeightMapConstructor = [...set].map((el) => [el, 0]);

  const alphabetToDigit = new Map(alphabetMapConstructor);
  const alphabetToWeight = new Map(alphabetWeightMapConstructor);

  WORDS.forEach((word) => {
    const power = word.length - 1;

    word.forEach((char, index) => {
      const value = alphabetToWeight.get(char);
      alphabetToWeight.set(char, value + 10 ** (power - index));
    });
  });

  let number = 9;

  [...alphabetToWeight.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([char]) => {
      alphabetToDigit.set(char, number--);
    });

  const numbers = WORDS.map((word) => {
    const number = Number(word.map((char) => alphabetToDigit.get(char)).join(''));

    return number;
  });

  const sum = numbers.reduce((a, b) => a + b);
  console.log(sum);
}

solution(WORDS);
