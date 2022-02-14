const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const T = +input[0];
const testCases = [];

for (let i = 1; i <= T; i++) {
  const testCase = `0 ${input[2 * i]}`.split(' ').map(Number);
  testCases.push(testCase);
}

function solution(testCases) {
  const result = testCases.map((testCase) => countNotIncludeTeam(testCase));
  console.log(result.join('\n').trim());
}

function countNotIncludeTeam(testCase) {
  const countStudents = testCase.length;
  const visit = new Array(countStudents).fill(0);

  for (let i = 1; i < countStudents; i++) {
    if (visit[i]) continue;
    const stack = [i];
    visit[i] = i;

    while (stack.length) {
      const curr = stack.pop();
      const next = testCase[curr];
      if (visit[next] && visit[next] !== i) break;

      if (visit[next] === -1) {
        break;
      }

      if (visit[next] === i) {
        stack.push(next);
        visit[next] = -1;
        continue;
      }

      stack.push(next);
      visit[next] = i;
    }
  }
  return visit.filter((el) => el !== -1).length - 1;
}

solution(testCases);
