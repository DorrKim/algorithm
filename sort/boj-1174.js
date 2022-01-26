const number = +require('fs').readFileSync('/dev/stdin').toString().trim();

function solution(number) {
  const descendNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  function recursion(descendNumber) {
    const firstDigit = Number(descendNumber.slice(0, 1));

    if (firstDigit >= 9) return;

    for (let i = firstDigit + 1; i < 10; i++) {
      const newDescendNumber = `${i}${descendNumber}`;

      descendNumbers.push(+newDescendNumber);
      recursion(newDescendNumber);
    }
  }
  for (let i = 0; i < 10; i++) {
    recursion(`${i}`);
  }
  descendNumbers.sort((a, b) => a - b);
  console.log(descendNumbers[number - 1] ?? -1);
}

solution(number);
