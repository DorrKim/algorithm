function solution(str) {
  let minLength = Number.MAX_SAFE_INTEGER;

  for (let unit = 1; unit <= str.length; unit++) {
    const slicedString = sliceStringByUnit(str, unit);
    minLength = Math.min(compressedString(slicedString).length, minLength);
  }
  return minLength;
}

function sliceStringByUnit(string, unit) {
  const slicedByUnit = [];

  let sliceStart = 0;
  while (sliceStart < string.length) {
    const nextSliceStart = sliceStart + unit;
    const fragment = string.slice(sliceStart, nextSliceStart);
    sliceStart = nextSliceStart;
    slicedByUnit.push(fragment);
  }
  return slicedByUnit;
}

function compressedString(slicedString) {
  let count = 1;
  let prev = slicedString[0];
  let result = '';

  for (let i = 1; i < slicedString.length; i++) {
    const fragment = slicedString[i];
    if (prev === fragment) {
      count++;
      continue;
    }
    result += `${count > 1 ? count : ''}${prev}`;
    prev = fragment;
    count = 1;
  }
  result += `${count > 1 ? count : ''}${prev}`;

  return result;
}
