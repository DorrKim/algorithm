const [strCountComputers, strCountLinks, ...strLinks] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .trim()
  .split('\n');
const countComputers = +strCountComputers;
const countLinks = +strCountLinks;
const links = strLinks.map((strLink) => strLink.split(' ').map(Number));

function solution(countComputers, countLinks, links) {
  const board = Array.from({ length: countComputers + 1 }, (_, i) =>
    Array.from({ length: countComputers + 1 }, (__, j) => (i === j ? true : false))
  );
  const visit = new Array(countComputers + 1).fill(false);

  links.forEach(([computer1, computer2]) => {
    board[computer1][computer2] = true;
    board[computer2][computer1] = true;
  });

  const stack = [1];
  let count = 0;
  visit[1] = true;

  while (stack.length) {
    const computer = stack.pop();

    for (let i = 1; i <= countComputers; i++) {
      if (visit[i] || !board[computer][i] || i === computer) continue;
      visit[i] = true;

      stack.push(i);
      count++;
    }
  }

  console.log(count);
}

solution(countComputers, countLinks, links);
