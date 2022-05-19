function solution(s) {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    max = Math.max(max, getMaxLengthPalindrome(s, i, i), getMaxLengthPalindrome(s, i, i + 1));
  }
  return max;
}

function getMaxLengthPalindrome(s, left, right) {
  let count = left === right ? -1 : 0;

  while (0 <= left && right < s.length && s[left--] === s[right++]) {
    count += 2;
  }

  return count;
}
