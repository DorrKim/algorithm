function solution(cacheSize, cities) {
  const cache = [];
  let currTime = 1;
  let totalTime = 0;

  if (cacheSize === 0) return 5 * cities.length;

  cities.forEach((city) => {
    const lowerCaseCityName = city.toLowerCase();
    const index = cache.findIndex((el) => el.name === lowerCaseCityName);

    if (index === -1) {
      if (cache.length >= cacheSize) {
        cache.shift();
      }

      cache.push({
        name: lowerCaseCityName,
        time: currTime
      });
      totalTime += 5;
    } else {
      cache[index].time = currTime;
      totalTime += 1;
    }
    currTime++;
    cache.sort((a, b) => a.time - b.time);
  });

  return totalTime;
}
