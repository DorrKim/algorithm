function solution(msg) {
  const charArray = msg.split('');
  const alpabetTuple = new Array(26).fill(null).map((_, i) => [String.fromCharCode(65 + i), i + 1]);
  const dictionaryMap = new Map(alpabetTuple);

  let pointer = 0;
  let word = '';
  const result = [];

  while (pointer < charArray.length) {
    word += charArray[pointer];
    if (dictionaryMap.has(word)) {
      pointer++;
      continue;
    }
    result.push(dictionaryMap.get(word.slice(0, -1)));
    dictionaryMap.set(word, dictionaryMap.size + 1);
    word = '';
  }
  result.push(dictionaryMap.get(word));

  return result;
}
