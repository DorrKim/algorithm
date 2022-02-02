const [length, numbers, _, ...questions] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution(length, numbers, questions) {
  const cache = Array.from({ length }, () => new Array(length));
  const result = questions.map((question) => {
    const [start, end] = question.split(' ');
    return checkPalindrome(start - 1, end - 1);
  });
  console.log(result.join('\n').trim());

  function checkPalindrome(start, end) {
    if (cache[start][end]) return cache[start][end];
    if (start >= end) return 1;

    const headEqualTail = numbers[start] === numbers[end];

    return (cache[start][end] = (headEqualTail ? 1 : 0) * checkPalindrome(start + 1, end - 1));
  }
}

solution(+length, numbers.split(' ').map(Number), questions);
