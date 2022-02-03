const [countProducts, ...costs] = require('fs').readFileSync('example.txt').toString().trim().split('\n').map(Number);

// const readline = require('readline');
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// let input = [];

// rl.on('line', function (line) {
//   input.push(+line.trim());
// }).on('close', function () {
//   const [countProducts, ...costs] = input;
//   solution(countProducts, costs);
//   process.exit();
// });
const descendingSorter = (a, b) => b - a;

function solution(countProducts, costs) {
  const ascedingSortedCosts = [...costs].sort(descendingSorter);
  const totalCost = ascedingSortedCosts.reduce((acc, currCost, index) => ((index + 1) % 3 ? acc + currCost : acc), 0);

  console.log(totalCost);
}

solution(countProducts, costs);
