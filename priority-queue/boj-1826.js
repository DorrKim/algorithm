const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const N = +input[0];
const oilStations = input.slice(1, input.length - 1).map((el) => el.split(' ').map(Number));
const initialState = input[input.length - 1].split(' ').map(Number);

function solution(oilStations, initialState) {
  const [endPosition, initialOil] = initialState;
  oilStations.sort((a, b) => a[1] - b[1] || b[0] - a[0]);

  let currPostion = 0;
  let currOil = initialOil;
  let countStop = 0;

  const stack = [];

  while (currPostion + currOil < endPosition) {
    if (oilStations.length === 0) {
      countStop = -1;
      break;
    }

    const [distanceToStart, oilAmount] = oilStations.pop();
    const distanceTocurrPostion = distanceToStart - currPostion;

    if (distanceTocurrPostion > currOil) {
      stack.push([distanceToStart, oilAmount]);
      continue;
    }

    currOil = currOil - distanceTocurrPostion + oilAmount;
    currPostion = distanceToStart;
    countStop++;

    while (stack.length) {
      oilStations.push(stack.pop());
    }
  }

  console.log(countStop);
}

solution(oilStations, initialState);
