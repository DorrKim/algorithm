function solution(gems) {
  const gemSet = new Set(gems);
  const gemMap = new Map();
  let start = 0;
  let end = 1;
  gemMap.set(gems[0], 1);

  let shortestSections = [];
  let minLength = Infinity;

  while (start < end) {
    if (end < gems.length && gemMap.size !== gemSet.size) {
      const count = (gemMap.has(gems[end]) ? gemMap.get(gems[end]) : 0) + 1;
      gemMap.set(gems[end], count);
      end++;
    } else {
      if (gemMap.size === gemSet.size) {
        if (end - start - 1 < minLength) {
          shortestSections = [[start + 1, end]];
          minLength = end - start - 1;
        } else if (end - start - 1 === minLength) {
          shortestSections.push([start + 1, end]);
        }
      }

      if (gemMap.has(gems[start])) {
        if (gemMap.get(gems[start]) === 1) {
          gemMap.delete(gems[start]);
        } else {
          gemMap.set(gems[start], gemMap.get(gems[start]) - 1);
        }
      }

      start++;
    }
  }

  return shortestSections.sort((a, b) => a[0] - b[0])[0];
}
