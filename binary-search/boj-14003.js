const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const numbers = input[1].split(' ').map(Number);

function solution(N, numbers) {
  const endNumbersByLength = [];
  endNumbersByLength.push([0]);
  endNumbersByLength.push([[numbers[0], 0]]);

  for (let i = 1; i < N; i++) {
    const currNumber = numbers[i];

    if (
      currNumber >
      endNumbersByLength[endNumbersByLength.length - 1][endNumbersByLength[endNumbersByLength.length - 1].length - 1][0]
    ) {
      endNumbersByLength.push([[currNumber, endNumbersByLength[endNumbersByLength.length - 1].length - 1]]);
      continue;
    }

    let lb = 0;
    let ub = endNumbersByLength.length - 1;

    while (lb < ub - 1) {
      const mid = Math.floor((lb + ub) / 2);

      if (endNumbersByLength[mid][endNumbersByLength[mid].length - 1][0] < currNumber) {
        lb = mid;
      } else {
        ub = mid;
      }
    }

    endNumbersByLength[ub].push([currNumber, endNumbersByLength[lb].length - 1]);
  }

  let result = '';
  let index = 0;

  for (let i = endNumbersByLength.length - 1; i >= 1; i--) {
    result = `${endNumbersByLength[i][index][0]} ${result}`;
    index = endNumbersByLength[i][index][1];
  }
  console.log(endNumbersByLength.length - 1);

  console.log(result.trim());
}

solution(N, numbers);
