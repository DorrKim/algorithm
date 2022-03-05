function solution(n, times) {
  let minTime = Infinity;
  let maxTime = 0;

  times.forEach((time) => {
    minTime = Math.min(minTime, time);
    maxTime = Math.max(maxTime, time);
  });

  let lb = minTime;
  let ub = maxTime * n;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);
    let countPassed = 0;

    times.forEach((time) => {
      countPassed += Math.floor(mid / time);
    });

    if (countPassed < n) {
      lb = mid + 1;
    } else {
      ub = mid;
    }
  }
  return lb;
}
