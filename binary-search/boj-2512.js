const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const budgetRequests = input[1].split(' ').map(Number);
const totalBudget = +input[2];

function solution(N, budgetRequests, totalBudget) {
  let lb = 0;
  let ub = Math.max(...budgetRequests) + 1;
  while (lb < ub - 1) {
    const mid = Math.floor((lb + ub) / 2);

    const calculatedTotalBudget = budgetRequests.reduce((accBudget, budget) => {
      return accBudget + (budget > mid ? mid : budget);
    }, 0);
    if (calculatedTotalBudget <= totalBudget) {
      lb = mid;
    } else {
      ub = mid;
    }
  }

  console.log(lb);
}
solution(N, budgetRequests, totalBudget);
