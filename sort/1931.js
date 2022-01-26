const [countSessions, ...sessions] = require('fs').readFileSync('example.txt').toString().trim().split('\n');

function solution(sessions) {
  sessions.sort((sessionA, sessionB) => {
    const [startA, endA] = sessionA.split(' ');
    const [startB, endB] = sessionB.split(' ');
    return endA - endB || startA - startB;
  });

  const maxSessions = [sessions[0]];
  let prevSession = sessions[0];

  for (let i = 1; i < sessions.length; i++) {
    const [currStartTime, _] = sessions[i].split(' ').map(Number);
    const [__, prevEndTime] = prevSession.split(' ').map(Number);
    if (currStartTime < prevEndTime) continue;

    maxSessions.push(sessions[i]);
    prevSession = sessions[i];
  }

  console.log(maxSessions.length);
}

solution(sessions);
