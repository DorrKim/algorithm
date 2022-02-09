const [_, ...strSessions] = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const sessions = strSessions.map((strSession) => strSession.split(' '));

function solution(sessions) {
  sessions.sort((A, B) => A[1] - B[1] || A[0] - B[0]);

  let count = 1;
  let prevEndTime = +sessions[0][1];

  for (let i = 1; i < sessions.length; i++) {
    if (+sessions[i][0] < prevEndTime) continue;
    prevEndTime = +sessions[i][1];
    count++;
  }

  console.log(count);
}

solution(sessions);
