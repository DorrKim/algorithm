const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

const costPerWeight = input.slice(1, 1 + N).map(Number);
const weights = input.slice(1 + N, 1 + N + M).map(Number);
const enterExits = input.slice(1 + N + M).map(Number);

class ParkingLot {
  constructor(costPerWeight) {
    this.parkingLot = new Array(costPerWeight.length).fill(null);
    this.costPerWeight = costPerWeight;
    this.queue = [];
    this.parkingPointer = 0;
    this.totalCost = 0;
  }

  checkEmptySpace() {
    return this.parkingPointer !== -1;
  }

  enter(carIndex, weight) {
    const hasEmptySpace = this.checkEmptySpace();
    if (hasEmptySpace) {
      this.parkingLot[this.parkingPointer] = carIndex;
      this.calculateCost(this.parkingPointer, weight);
      this.parkingPointer = this.parkingLot.findIndex((space) => space === null);
    } else {
      this.queue.push([carIndex, weight]);
    }
  }

  exit(carIndex) {
    const exitParkingLot = this.parkingLot.findIndex((car) => car === carIndex);
    this.parkingLot[exitParkingLot] = null;

    this.parkingPointer = this.parkingLot.findIndex((space) => space === null);
    if (this.queue.length) {
      const [queueingCarIndex, queueingCarWeight] = this.queue.shift();
      this.enter(queueingCarIndex, queueingCarWeight);
    }
  }

  calculateCost(parkingLotIndex, weight) {
    const unitCost = this.costPerWeight[parkingLotIndex];
    this.totalCost += unitCost * weight;
  }

  getTotalCost() {
    return this.totalCost;
  }
}

function solution(costPerWeight, weights, enterExits) {
  const parkingLot = new ParkingLot(costPerWeight);

  enterExits.forEach((car) => {
    if (car > 0) {
      const enterCarIndex = car - 1;
      const weight = weights[enterCarIndex];
      parkingLot.enter(enterCarIndex, weight);
    } else {
      const exitCarIndex = -(car + 1);
      parkingLot.exit(exitCarIndex);
    }
  });
  console.log(parkingLot.getTotalCost());
}

solution(costPerWeight, weights, enterExits);
