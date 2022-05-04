function solution(n, t, m, p) {
  let nums = '';
  let i = 0;
  let result = '';

  while (i < t * m) {
    let nthBaseNum = i.toString(n);
    nums += nthBaseNum;
    i++;
  }

  for (let j = p; j <= t * m; j += m) {
    result += nums[j - 1];
  }
  return result.toUpperCase();
}
