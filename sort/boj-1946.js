const [strCountTestCase, ...strTestCases] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const countTestCase = +strCountTestCase;

let lengthIndicatorIndex = 0;
let startIndex = 1;
let endIndex = startIndex + +strTestCases[lengthIndicatorIndex];

for (let i = 0; i < countTestCase; i++) {
  const testCase = strTestCases.slice(startIndex, endIndex).map((el) => el.split(' ').map(Number));

  solution(testCase);

  lengthIndicatorIndex = endIndex;
  startIndex = lengthIndicatorIndex + 1;
  endIndex = startIndex + +strTestCases[lengthIndicatorIndex];
}

function solution(testCase) {
  const interviewGrades = new Array(testCase.length);
  testCase.forEach(([resumeGrade, interviewGrade]) => {
    interviewGrades[resumeGrade - 1] = interviewGrade;
  });

  let betterInterviewGrade = interviewGrades[0];
  let count = 1;
  interviewGrades.forEach((interviewGrade, index) => {
    if (index === 0) return;

    if (interviewGrade < betterInterviewGrade) {
      betterInterviewGrade = interviewGrade;
      count++;
    }
  });
  console.log(count);
}
