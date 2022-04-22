function solution(id_list, report, k) {
  const reportRecordByReporter = new Map();
  const reportRecordBySuspect = new Map();

  id_list.forEach((id) => {
    if (reportRecordByReporter.has(id)) return;
    reportRecordByReporter.set(id, new Set());
  });

  report.forEach((log) => {
    const [reporter, target] = log.split(' ');
    reportRecordByReporter.get(reporter).add(target);
  });

  const targetSetIterator = reportRecordByReporter.values();

  for (let targetSet of targetSetIterator) {
    targetSet.forEach((target) => {
      if (!reportRecordBySuspect.has(target)) {
        reportRecordBySuspect.set(target, 0);
      }

      const count = reportRecordBySuspect.get(target) + 1;
      reportRecordBySuspect.set(target, count);
    });
  }

  const bannedUserArray = [...reportRecordBySuspect.entries()]
    .filter(([target, countReported]) => countReported >= k)
    .map(([target, _]) => target);

  const bannedUserSet = new Set(bannedUserArray);

  const countMail = [...reportRecordByReporter.entries()].map(([reporter, targetSet]) => {
    let countBanned = 0;
    targetSet.forEach((target) => {
      if (bannedUserSet.has(target)) countBanned += 1;
    });
    return countBanned;
  });

  return countMail;
}
