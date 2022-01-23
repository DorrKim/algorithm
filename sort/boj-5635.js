const [stringCountPersonalInfo, ...personalInfos] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const countPersonalInfo = +stringCountPersonalInfo;

function solution(countPersonalInfo, personalInfos) {
  const sortedPersonalInfos = personalInfos
    .map((personalInfo) => personalInfo.split(' '))
    .sort(([_, ...birthdayInfoA], [__, ...birthdayInfoB]) => {
      const [dayA, monthA, yearA] = birthdayInfoA.map(convertNumber);
      const [dayB, monthB, yearB] = birthdayInfoB.map(convertNumber);

      return yearB - yearA || monthB - monthA || dayB - dayA;
    });

  console.log(sortedPersonalInfos[0][0]);
  console.log(sortedPersonalInfos[countPersonalInfo - 1][0]);
}

function convertNumber(el) {
  return isNaN(el) ? el : +el;
}

solution(countPersonalInfo, personalInfos);
