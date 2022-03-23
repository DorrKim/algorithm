const [base, power, divideNumber] = require('fs').readFileSync('example.txt').toString().trim().split(' ').map(Number);

function solution(base, power, divideNumber) {
  const result = getPower(BigInt(base), BigInt(power), BigInt(divideNumber));

  console.log(result.toString());
}

function getPower(base, power, divideNumber) {
  if (power === 1n) return base % divideNumber;

  const powerIsOdd = power % 2n === 1n;

  const halfPower = powerIsOdd ? (power - 1n) / 2n : power / 2n;

  const halfResult = getPower(base, halfPower, divideNumber);

  return (halfResult * halfResult * (powerIsOdd ? base : 1n)) % divideNumber;
}

solution(base, power, divideNumber);
