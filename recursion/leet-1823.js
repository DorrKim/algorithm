const findTheWinner = function (n, k) {
  const friends = Array.from({ length: n }, (v, i) => i + 1);
  let start = 0;
  let winner = 1;

  function recrusion(friends) {
    if (friends.length === 1) {
      winner = friends[0];
      return;
    }

    const end = (start + k - 1) % friends.length;
    const alives = [...friends.slice(0, end), ...friends.slice(end + 1)];
    start = end % (friends.length - 1);
    recrusion(alives);
  }
  recrusion(friends);
  return winner;
};
