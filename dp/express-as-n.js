function solution(N, number) {
  const cache = new Array(9).fill(null);
  cache[1] = [N];

  for (let i = 2; i <= 8; i++) {
    let newCache = [];

    for (let j = 1; j < i; j++) {
      cache[i - j].forEach((number1) => {
        cache[j].forEach((number2) => {
          const allN =
            `${number1}`.split('').every((digit) => digit === `${N}`) &&
            `${number2}`.split('').every((digit) => digit === `${N}`);

          if (allN) {
            newCache.push(+`${number1}${number2}`);
          }
          number1 + number2 > 0 && newCache.push(number1 + number2);
          number1 * number2 > 0 && newCache.push(number1 * number2);
          number1 - number2 > 0 && newCache.push(number1 - number2);
          number2 - number1 > 0 && newCache.push(number2 - number1);
          Math.floor(number1 / number2) > 0 && newCache.push(Math.floor(number1 / number2));
          Math.floor(number2 / number1) > 0 && newCache.push(Math.floor(number2 / number1));
        });
      });
    }
    const set = new Set(newCache);
    cache[i] = [...set];
  }

  for (let i = 1; i <= 8; i++) {
    if (cache[i].find((num) => num === number)) return i;
  }
  return -1;
}

solution(8, 5800);

5800;
