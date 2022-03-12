const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const expenses = input.slice(1).map(Number);

function solution(N, M, expenses) {
  let lb = Math.max(...expenses);
  let ub = lb * N + 1;

  while (lb < ub) {
    const mid = Math.floor((lb + ub) / 2);

    let count = 1;
    let balance = mid;

    expenses.forEach((expense) => {
      if (balance < expense) {
        count++;
        balance = mid - expense;
      } else {
        balance -= expense;
      }
    });
    console.log(lb, ub, count);
    if (count <= M) {
      ub = mid;
    } else {
      lb = mid + 1;
    }
  }

  console.log(lb);
}

solution(N, M, expenses);
