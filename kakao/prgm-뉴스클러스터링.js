function solution(str1, str2) {
  const multiSet1 = makeMultiSet(str1);
  const multiSet2 = makeMultiSet(str2);
  if (multiSet1.size === 0 && multiSet2.size === 0) return 1 * 2 ** 16;

  const intersectMultiSet = getIntersectMultiSet(multiSet1, multiSet2);
  const unionMultiSet = getUnionMultiSet(multiSet1, multiSet2);

  const sizeIntersectMultiSet = [...intersectMultiSet.values()].reduce((a, b) => a + b, 0);
  const sizeUnionMultiSet = [...unionMultiSet.values()].reduce((a, b) => a + b, 0);

  let jacardSimilarity = 1;

  jacardSimilarity = sizeIntersectMultiSet / sizeUnionMultiSet;
  return Math.floor(jacardSimilarity * 2 ** 16);
}

function makeMultiSet(string) {
  const multiSet = new Map();

  for (let i = 0; i < string.length - 1; i++) {
    const fragment = string.slice(i, i + 2);

    if (fragment.match(/[^a-zA-Z]/)) continue;
    const capitalized = fragment.toUpperCase();

    if (!multiSet.has(capitalized)) {
      multiSet.set(capitalized, 0);
    }

    multiSet.set(capitalized, multiSet.get(capitalized) + 1);
  }
  return multiSet;
}

function getIntersectMultiSet(multiSet1, multiSet2) {
  const intersectMultiSet = new Map();

  multiSet1.forEach((count, fragment) => {
    if (!multiSet2.has(fragment)) return;
    const minCount = Math.min(count, multiSet2.get(fragment));

    intersectMultiSet.set(fragment, minCount);
  });
  return intersectMultiSet;
}

function getUnionMultiSet(multiSet1, multiSet2) {
  const unionMultiSet = new Map();

  multiSet1.forEach((count, fragment) => {
    const maxCount = multiSet2.has(fragment) ? Math.max(count, multiSet2.get(fragment)) : count;

    unionMultiSet.set(fragment, maxCount);
  });

  multiSet2.forEach((count, fragment) => {
    const maxCount = multiSet1.has(fragment) ? Math.max(count, multiSet1.get(fragment)) : count;

    unionMultiSet.set(fragment, maxCount);
  });

  return unionMultiSet;
}
