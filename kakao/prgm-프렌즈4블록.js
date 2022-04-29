function solution(m, n, board) {
  const matrix = board.map((row) => row.split(''));
  let count = 0;

  while (true) {
    const deletedBlocks = new Set();

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (matrix[i][j] === null) continue;
        let fourBlock = true;
        const type = matrix[i][j];
        const temp = [[i, j]];

        for (let k = 0; k < 3; k++) {
          const dx = '122'[k] - 1;
          const dy = '212'[k] - 1;

          if (matrix[i + dx][j + dy] !== type) {
            fourBlock = false;
            break;
          }
          temp.push([i + dx, j + dy]);
        }

        if (!fourBlock) continue;
        temp.forEach((el) => deletedBlocks.add(el.join()));
      }
    }
    if (deletedBlocks.size === 0) break;
    count += deletedBlocks.size;

    deletedBlocks.forEach((el) => {
      const [i, j] = el.split(',');
      matrix[i][j] = null;
    });

    for (let j = 0; j < n; j++) {
      const column = [];
      for (let i = 0; i < m; i++) {
        column.push(matrix[i][j]);
      }
      const filtered = column.filter((el) => el !== null);
      const newColumn = new Array(m - filtered.length).fill(null).concat(filtered);

      newColumn.forEach((el, i) => {
        matrix[i][j] = el;
      });
    }
  }

  return count;
}
