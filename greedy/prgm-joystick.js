function solution(name) {
  const visited = name.split('').map((char, index) => {
    if (index === 0) return true;

    return char === 'A' ? true : false;
  });

  const minMove = recursion(0, visited, 0);

  return name.split('').reduce((acc, currChar) => {
    const codePoint = currChar.codePointAt();
    let minMovePerChar = Math.min(codePoint - 65, 91 - codePoint);
    return acc + minMovePerChar;
  }, minMove);
}

function recursion(currIndex, visited, moveCount) {
  if (visited.every((visit) => visit === true)) {
    return moveCount;
  }
  let minMove = Infinity;

  const length = visited.length;
  let leftMove = false;
  let rightMove = false;

  for (let i = 1; i < length; i++) {
    const leftMoveIndex = currIndex - i + (currIndex - i >= 0 ? 0 : length);
    const rightMoveIndex = (currIndex + i) % length;

    if (visited[leftMoveIndex] && visited[rightMoveIndex]) continue;

    if (!visited[leftMoveIndex] && !leftMove) {
      visited[leftMoveIndex] = true;
      minMove = Math.min(recursion(leftMoveIndex, visited, moveCount + i), minMove);

      visited[leftMoveIndex] = false;
      leftMove = true;
    }

    if (!visited[rightMoveIndex] && !rightMove) {
      visited[rightMoveIndex] = true;
      minMove = Math.min(recursion(rightMoveIndex, visited, moveCount + i), minMove);
      visited[rightMoveIndex] = false;
      rightMove = true;
    }

    if (leftMove && rightMove) break;
  }

  return minMove;
}

console.log(solution('BBBBAAAAAAABA'));
