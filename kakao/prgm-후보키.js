function solution(relation) {
  const rowLength = relation[0].length;
  const uniquenessCandidateKeyArr = [];
  const candidateKeySet = new Set();

  for (let i = 0; i < rowLength; i++) {
    recursion([i]);
  }

  uniquenessCandidateKeyArr.sort((keyA, keyB) => keyA.length - keyB.length);

  uniquenessCandidateKeyArr.forEach((key) => {
    if (key.length === 1) {
      candidateKeySet.add(key.join(''));
      return;
    }

    let hasMoreMinKey = false;
    for (let i = 1; i < key.length; i++) {
      if (hasMoreMinKey) break;

      const combinations = combination(key, i);
      hasMoreMinKey = combinations.some((comb) => {
        const key = comb.join('');

        return candidateKeySet.has(key);
      });
    }
    if (!hasMoreMinKey) {
      candidateKeySet.add(key.join(''));
    }
  });

  return candidateKeySet.size;

  function recursion(keyArray) {
    const valueSet = new Set();

    relation.forEach((row) => {
      const value = keyArray
        .map((key) => row[key])
        .sort()
        .join();

      valueSet.add(value);
    });

    if (valueSet.size === relation.length) {
      const candidateKey = keyArray.sort((a, b) => a - b);
      uniquenessCandidateKeyArr.push(candidateKey);
      return;
    }

    const lastKey = keyArray[keyArray.length - 1];
    for (let key = lastKey + 1; key < rowLength; key++) {
      recursion([...keyArray, key]);
    }
  }
}

function combination(arr, n) {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const pick = arr[i];
    const rest = arr.slice(i + 1);

    combination(rest, n - 1).forEach((el) => {
      result.push([pick, ...el]);
    });
  }

  return result;
}
