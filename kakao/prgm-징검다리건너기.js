function solution(stones, k) {
  let start = 1;
  let end = 2 * 10 ** 8;

  while (start < end - 1) {
    const mid = Math.floor((start + end) / 2);

    let max = 0;
    let count = 0;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] - mid > 0) {
        count = 0;
        continue;
      }
      count++;
      max = Math.max(count, max);
    }

    if (max < k) {
      start = mid;
    } else {
      end = mid;
    }
  }
  return end;
}
