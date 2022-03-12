function solution(id_list, report, k) {
  const reportMap = new Map();
  const countReportMap = new Map();
  id_list.forEach((id) => {
    countReportMap.set(id, 0);
    reportMap.set(id, new Set());
  });

  report.forEach((el) => {
    const [reporter, target] = el.split(' ');

    if (reportMap.get(reporter).has(target)) return;
    reportMap.get(reporter).add(target);

    countReportMap.set(target, countReportMap.get(target) + 1);
  });

  return id_list.map((id) => [...reportMap.get(id)].filter((reportedId) => countReportMap.get(reportedId) >= k).length);
}
