function solution(s) {
  const arrayList = s
    .slice(1, -1)
    .split(/(?<=}),(?={)/)
    .map((el) => el.slice(1, -1).split(','))
    .sort((a, b) => a.length - b.length);

  const set = new Set();
  const result = [];
  arrayList.forEach((array) => {
    array.forEach((el) => {
      if (set.has(el)) return;
      set.add(el);
      result.push(+el);
    });
  });
  return result;
}
