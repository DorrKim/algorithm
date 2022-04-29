function solution(N, stages) {
  const countCurrentUserByStage = new Array(N + 2).fill(0);
  stages.forEach((currentStage) => {
    countCurrentUserByStage[currentStage] += 1;
  });

  const countReachUserByStage = new Array(N + 2).fill(0);
  countReachUserByStage[N + 1] = countCurrentUserByStage[N + 1];

  for (let i = N; i >= 1; i--) {
    countReachUserByStage[i] = countReachUserByStage[i + 1] + countCurrentUserByStage[i];
  }

  const failureRates = [];
  for (let i = 1; i <= N; i++) {
    const rate = countReachUserByStage[i]
      ? countCurrentUserByStage[i] / countReachUserByStage[i]
      : countReachUserByStage[i];
    failureRates.push({
      rate,
      stage: i
    });
  }

  const result = failureRates.sort((a, b) => b.rate - a.rate).map(({ stage }) => stage);
  return result;
}
