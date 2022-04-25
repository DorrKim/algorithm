function solution(places) {
  const result = places.map(checkKeepTheRule);
  return result;
}

function checkKeepTheRule(place) {
  const candidatePositions = [];
  const visit = new Array(5).fill(null).map(() => new Array(5));

  for (let i = 0; i < 5; i++) {
    const row = place[i];
    for (let j = 0; j < 5; j++) {
      if (row[j] !== 'P') continue;
      candidatePositions.push([i, j]);
    }
  }
  let keepTheRule = true;

  for (let i = 0; i < candidatePositions.length; i++) {
    if (!keepTheRule) break;
    const [initRow, initCol] = candidatePositions[i];
    const queue = [[initRow, initCol, 0]];
    visit.forEach((row) => row.fill(false));
    visit[initRow][initCol] = true;

    while (queue.length) {
      const [row, col, dist] = queue.shift();

      if (dist >= 1 && place[row][col] === 'P') {
        keepTheRule = false;
        break;
      }

      if (dist === 2) {
        continue;
      }

      for (let j = 0; j < 4; j++) {
        const dx = '1102'[j] - 1;
        const dy = '0211'[j] - 1;

        const nx = row + dx;
        const ny = col + dy;

        if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || visit[nx][ny] || place[nx][ny] === 'X') continue;
        visit[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return keepTheRule ? 1 : 0;
}
