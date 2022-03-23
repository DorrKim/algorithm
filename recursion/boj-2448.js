const N = +require('fs').readFileSync('example.txt').toString().trim();

function solution(N) {
  let line = N / 3;
  let count = 1;

  while (line !== 1) {
    line /= 2;
    count++;
  }

  console.log(recursion(count).join('\n'));
}

function recursion(depth) {
  if (depth == 1) {
    return ['  *  ', ' * * ', '*****'];
  }

  const result = makeLargeTriangle(recursion(depth - 1));
  return result;
}

function makeLargeTriangle(triangle) {
  const space = ' '.repeat(triangle.length);
  const topPart = triangle.map((line) => `${space}${line}${space}`);
  const bottomPart = triangle.map((line) => `${line} ${line}`);

  return topPart.concat(bottomPart);
}

solution(N);
