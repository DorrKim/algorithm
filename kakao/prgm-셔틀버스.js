function solution(n, t, m, timetable) {
  const queue = timetable.sort().reverse();
  const stardardTime = new Date('2022-04-10T09:00:00').getTime();
  let lastDepartureTimeHasVoidSeat = null;
  let lastCrewArrivalTime = null;

  for (let i = 0; i < n; i++) {
    const departureTime = stardardTime + t * 1000 * 60 * i;
    let count = 0;

    while (true) {
      const timeStamp = queue[queue.length - 1];
      const queueArrivalTime = new Date(`2022-04-10T${timeStamp}:00`).getTime();
      console.log(queueArrivalTime, departureTime);
      if (queueArrivalTime > departureTime || count === m || queue.length === 0) break;

      queue.pop();
      const crewArraivalTime = queueArrivalTime;
      count++;
      if (i === n - 1) {
        lastCrewArrivalTime = crewArraivalTime;
      }
    }

    if (count < m) {
      lastDepartureTimeHasVoidSeat = departureTime;
    }
  }

  const lastTime = Math.max(lastCrewArrivalTime - 1000 * 60, lastDepartureTimeHasVoidSeat);
  const date = new Date(lastTime);

  console.log(date.toTimeString().split(' ')[0].slice(0, 5));
}
