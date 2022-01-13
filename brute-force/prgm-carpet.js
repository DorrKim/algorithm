function solution(brown, yellow) {
  const area = brown + yellow;

  for (let i = 2; i <= Math.sqrt(area); i++) {
    if (area % i) continue;

    const totalWidth = area / i;
    const totalHeight = i;

    const yellowWidth = totalWidth - 2;
    const yellowHeight = totalHeight - 2;

    if (yellowWidth * yellowHeight === yellow) {
      return [area / i, i];
    }
  }
}
