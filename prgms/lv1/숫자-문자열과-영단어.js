function solution(s) {
  let result = s;
  const mapper = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  Object.entries(mapper).forEach(([key, value]) => {
    const regEx = new RegExp(key, 'g');
    result = result.replace(regEx, value);
  });

  return +result;
}
