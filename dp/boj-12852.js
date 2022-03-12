const input = require('fs').readFileSync('example.txt').toString().trim('\n');
const N = +input;

function solution(N) {
  const visit = new Array(N + 1).fill(false);
  const queue = [[N]];
  visit[N] = true;
  let result = null;

  while (queue.length) {
    const visitedNumbers = queue.shift();
    const latestNumber = visitedNumbers[visitedNumbers.length - 1];
    if (latestNumber === 1) {
      result = visitedNumbers;
      break;
    }

    if (latestNumber % 3 === 0 && !visit[latestNumber / 3]) {
      const newVisitedNumbers = [...visitedNumbers, latestNumber / 3];
      visit[latestNumber / 3] = true;
      queue.push(newVisitedNumbers);
    }

    if (latestNumber % 2 === 0 && !visit[latestNumber / 2]) {
      const newVisitedNumbers = [...visitedNumbers, latestNumber / 2];
      visit[latestNumber / 2] = true;
      queue.push(newVisitedNumbers);
    }

    if (!visit[latestNumber - 1]) {
      const newVisitedNumbers = [...visitedNumbers, latestNumber - 1];
      visit[latestNumber - 1] = true;
      queue.push(newVisitedNumbers);
    }
  }

  console.log(result.length - 1);
  console.log(result.join(' '));
}

solution(N);
