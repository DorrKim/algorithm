function solution(orders, course) {
  const setMenusBycourse = course.flatMap((courseLength) => {
    const setMenus = new Map();

    orders.forEach((order) => {
      combination(order.split(''), courseLength).forEach((el) => {
        const setMenu = el.sort().join('');
        if (!setMenus.has(setMenu)) {
          setMenus.set(setMenu, 0);
        }

        setMenus.set(setMenu, setMenus.get(setMenu) + 1);
      });
    });
    const descendingCountMenu = [...setMenus.entries()].sort((set1, set2) => set2[1] - set1[1]);

    if (descendingCountMenu.length === 0) return [];
    const maxCount = descendingCountMenu[0][1];

    if (maxCount === 1) return [];
    const endIndex = descendingCountMenu.findIndex((el) => el[1] !== maxCount);
    const favoriteSetMenus = endIndex !== -1 ? descendingCountMenu.slice(0, endIndex) : descendingCountMenu.slice(0);

    return favoriteSetMenus.map((el) => el[0]);
  });

  return setMenusBycourse.sort();
}

function combination(array, number) {
  if (number === 1) return array.map((el) => [el]);
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const picked = array[i];
    const rest = array.slice(i + 1);
    combination(rest, number - 1).forEach((el) => {
      result.push([picked, ...el]);
    });
  }

  return result;
}
