const [strLength, ...words] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const length = +strLength;

const minsikAlbabetMap = new Map(
  `a b k d e g h i l m n * o p r s t u w y`.split(' ').map((char, index) => [char, index])
);

function solution(length, words) {
  words.sort((a, b) => minsikCompare(a, b));
  console.log(words.join('\n'));
}

function minsikCompare(wordA, wordB) {
  const wordAChars = removeNG(wordA).split('');
  const wordBChars = removeNG(wordB).split('');
  let i = 0;

  while (true) {
    const currCharA = wordAChars[i];
    const currCharB = wordBChars[i];

    if (!(currCharA && currCharB)) {
      return wordAChars.length - wordBChars.length;
    }
    if (currCharA !== currCharB) {
      console.log(currCharA, currCharB);
      return minsikAlbabetMap.get(currCharA) - minsikAlbabetMap.get(currCharB);
    }

    i++;
  }
}

function removeNG(word) {
  return word.replace(/ng/g, '*');
}

solution(length, words);
