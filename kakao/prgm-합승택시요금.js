function solution(n, s, a, b, fares) {
  const minFareMatrix = floydWarshall(n, fares);
  let min = Infinity;

  for (let i = 1; i <= n; i++) {
    const totalFare = minFareMatrix[s][i] + minFareMatrix[i][a] + minFareMatrix[i][b];
    min = Math.min(min, totalFare);
  }

  return min;
}

function floydWarshall(n, fares) {
  const fareMatrix = Array.from({ length: n + 1 }, (v, i) =>
    new Array(n + 1).fill(null).map((_, j) => (i === j ? 0 : Infinity))
  );

  fares.forEach(([v1, v2, fare]) => {
    fareMatrix[v1][v2] = fare;
    fareMatrix[v2][v1] = fare;
  });

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        fareMatrix[i][j] = Math.min(fareMatrix[i][k] + fareMatrix[k][j], fareMatrix[i][j]);
      }
    }
  }

  return fareMatrix;
}
