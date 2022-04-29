function solution(user_id, banned_id) {
  const userIdListMatchToBannedId = banned_id.map((bannedId) => {
    const bannedIdRegExp = new RegExp(`^${bannedId.replace(/\*/g, '.')}$`);
    return user_id.filter((userId) => bannedIdRegExp.test(userId));
  });
  const results = new Set();
  recursion(userIdListMatchToBannedId, new Set());

  return results.size;

  function recursion(list, set) {
    if (list.length === 0) {
      const result = [...set].sort().join('/');
      results.add(result);
      return;
    }
    const restList = list.slice(1);

    list[0].forEach((id) => {
      const copy = new Set([...set]);
      if (copy.has(id)) return;
      copy.add(id);
      recursion(restList, copy);
    });
  }
}
