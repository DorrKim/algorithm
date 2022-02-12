function solution(n, wires) {
  let globalMinDiff = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < wires.length; i++) {
    const selectedWires = wires.filter((_, j) => i !== j);
    const adjMatrix = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(false));
    let count = -1;

    selectedWires.forEach(([top1, top2]) => {
      adjMatrix[top1][top2] = true;
      adjMatrix[top2][top1] = true;
    });

    const visit = new Array(n + 1).fill(false);
    const stack = [1];

    while (stack.length) {
      const top = stack.pop();
      if (visit[top]) continue;
      visit[top] = true;
      count++;

      adjMatrix[top].forEach((isAdjNode, i) => {
        if (isAdjNode && !visit[i]) stack.push(i);
      });
    }
    const powerGrid1 = count;
    const powerGrid2 = n - 2 - count;
    const localDiff = Math.abs(powerGrid1 - powerGrid2);
    globalMinDiff = Math.min(localDiff, globalMinDiff);
  }
  console.log(globalMinDiff);
}
