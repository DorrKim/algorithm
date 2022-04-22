function solution(board, moves) {
  const stack = [];

  const pickedList = pick(board, moves);
  let count = 0;
  pickedList.forEach((picked) => {
    if (picked === 0) return;
    if (stack.length !== 0 && stack[stack.length - 1] === picked) {
      stack.pop();
      count += 2;
    } else stack.push(picked);
  });

  return count;
}

function pick(board, moves) {
  const pickedList = moves.map((line) => {
    let picked = 0;

    for (let i = 0; i < board.length; i++) {
      if (board[i][line - 1] === 0) continue;
      picked = board[i][line - 1];
      board[i][line - 1] = 0;

      break;
    }
    return picked;
  });
  return pickedList;
}
