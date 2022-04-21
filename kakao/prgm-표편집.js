function solution(n, k, cmds) {
  const table = new Array(n).fill('name');
  const deletedIndex = [];
  const deletedIndexMap = new Map();
  let selectIndex = k;
  let lastIndex = n - 1;

  cmds.forEach((cmd) => {
    const [cmdType, param] = cmd.split(' ');

    if (param) {
      let count = param;
      let current = selectIndex;
      let countDeleted = deletedIndex.length;

      while (count && countDeleted) {
        current += cmdType === 'U' ? -1 : +1;
        if (!deletedIndexMap.has(current)) {
          count--;
        } else {
          countDeleted--;
        }
      }

      selectIndex = current + (cmdType === 'U' ? -count : +count);
      return;
    }

    if (cmdType === 'C') {
      table[selectIndex] = null;
      deletedIndex.push(selectIndex);
      deletedIndexMap.set(selectIndex, true);

      let count = 1;
      let current = selectIndex;
      let countDeleted = deletedIndex.length;

      while (count && countDeleted) {
        current += selectIndex === lastIndex ? -1 : +1;
        if (!deletedIndexMap.has(current)) {
          count--;
        } else {
          countDeleted--;
        }
      }

      current += selectIndex === lastIndex ? -count : count;
      if (selectIndex === lastIndex) lastIndex = current;
      selectIndex = current;
    }

    if (cmdType === 'Z') {
      const recetDeleteIndex = deletedIndex.pop();
      deletedIndexMap.delete(recetDeleteIndex);
      table[recetDeleteIndex] = 'name';
      lastIndex = Math.max(lastIndex, recetDeleteIndex);
    }
  });

  const result = table.map((el) => (el === null ? 'X' : 'O')).join('');
  return result;
}
